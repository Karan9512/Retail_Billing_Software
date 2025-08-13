package com.cdac.billingsoftware.service.impl;

import com.cdac.billingsoftware.entity.OrderEntity;
import com.cdac.billingsoftware.entity.OrderItemEntity;
import com.cdac.billingsoftware.io.*;
import com.cdac.billingsoftware.repository.OrderEntityRepository;
import com.cdac.billingsoftware.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderEntityRepository orderEntityRepository;

    @Override
    public OrderResponse createOrder(OrderRequest request) {
        OrderEntity newOrder = convertToOrderEntity(request);

        PaymentDetails paymentDetails = new PaymentDetails();
        paymentDetails.setStatus(newOrder.getPaymentMethod() == PaymentMethod.CASH ?
                PaymentDetails.PaymentStatus.COMPLETED : PaymentDetails.PaymentStatus.PENDING);
        newOrder.setPaymentDetails(paymentDetails);

        List<OrderItemEntity> orderItems = request.getCartItems().stream()
                .map(this::convertToOrderItemEntity)
                .collect(Collectors.toList());
        newOrder.setItems(orderItems);

        newOrder = orderEntityRepository.save(newOrder);
        return convertToResponse(newOrder);
    }

    private OrderItemEntity convertToOrderItemEntity(OrderRequest.OrderItemRequest orderItemRequest) {
        return OrderItemEntity.builder()
                .itemId(orderItemRequest.getItemId())
                .name(orderItemRequest.getName())
                .price(orderItemRequest.getPrice())
                .quantity(orderItemRequest.getQuantity())
                .build();
    }

    private OrderResponse convertToResponse(OrderEntity newOrder) {
        return OrderResponse.builder()
                .orderId(newOrder.getOrderId())
                .customerName(newOrder.getCustomerName())
                .phoneNumber(newOrder.getPhoneNumber())
                .subtotal(newOrder.getSubtotal())
                .tax(newOrder.getTax())
                .grandTotal(newOrder.getGrandTotal())
                .paymentMethod(newOrder.getPaymentMethod())
                .items(newOrder.getItems().stream()
                        .map(this::convertToItemResponse)
                        .collect(Collectors.toList()))
                .paymentDetails(newOrder.getPaymentDetails())
                .createdAt(newOrder.getCreatedAt())
                .build();

    }

    private OrderResponse.OrderItemResponse convertToItemResponse(OrderItemEntity orderItemEntity) {
        return OrderResponse.OrderItemResponse.builder()
                .itemId(orderItemEntity.getItemId())
                .name(orderItemEntity.getName())
                .price(orderItemEntity.getPrice())
                .quantity(orderItemEntity.getQuantity())
                .build();

    }

    private OrderEntity convertToOrderEntity(OrderRequest request) {
        return OrderEntity.builder()
                .customerName(request.getCustomerName())
                .phoneNumber(request.getPhoneNumber())
                .subtotal(request.getSubtotal())
                .tax(request.getTax())
                .grandTotal(request.getGrandTotal())
                .paymentMethod(PaymentMethod.valueOf(request.getPaymentMethod()))
                .build();
    }

    @Override
    public void deleteOrder(String orderId) {
        OrderEntity existingOrder = orderEntityRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        orderEntityRepository.delete(existingOrder);
    }

    @Override
    public List<OrderResponse> getLatestOrders() {
        return orderEntityRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponse verifyPayment(PaymentVerificationRequest request) {
        OrderEntity existingOrder = orderEntityRepository.findByOrderId(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!verifyRazorpaySignature(request.getRazorpayOrderId(),
                request.getRazorpayPaymentId(),
                request.getRazorpaySignature())) {
            throw new RuntimeException("Payment verification failed");
        }

        PaymentDetails paymentDetails = existingOrder.getPaymentDetails();
        paymentDetails.setRazorpayOrderId(request.getRazorpayOrderId());
        paymentDetails.setRazorpayPaymentId(request.getRazorpayPaymentId());
        paymentDetails.setRazorpaySignature(request.getRazorpaySignature());
        paymentDetails.setStatus(PaymentDetails.PaymentStatus.COMPLETED);

        existingOrder = orderEntityRepository.save(existingOrder);
        return convertToResponse(existingOrder);

    }

    @Override
    public Double sumSalesByDate(LocalDate date) {
        return orderEntityRepository.sumSalesByDate(date);
    }

    @Override
    public Long countByOrderDate(LocalDate date) {
        return orderEntityRepository.countByOrderDate(date);
    }

    @Override
    public List<OrderResponse> findRecentOrders() {
        return orderEntityRepository.findRecentOrders(PageRequest.of(0, 5))
                .stream()
                .map(orderEntity -> convertToResponse(orderEntity))
                .collect(Collectors.toList());
    }

    @Override
    public Page<OrderResponse> getPaginatedOrders(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<OrderEntity> orderPage = orderEntityRepository.findAll(pageable);

        // Convert Page<OrderEntity> → Page<OrderResponse>
        return orderPage.map(this::convertToResponse);
    }

    private static final String[] MONTH_NAMES = {
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
    };

    @Override
    public List<MonthlySales> getMonthlySales(int year) {
        List<Object[]> rawData = orderEntityRepository.getMonthlySalesData(year);
        return rawData.stream()
                .map(row -> {
                    int monthIndex = ((Integer) row[0]) - 1;
                    String monthName = MONTH_NAMES[monthIndex];
                    Double total = ((Number) row[1]).doubleValue();
                    return new MonthlySales(monthName, total);
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<WeeklySales> getWeeklySales(int year) {
        List<Object[]> rawData = orderEntityRepository.getWeeklySalesData(year);
        return rawData.stream()
                .map(row -> {
                    int weekNumber = (Integer) row[0];
                    Double total = ((Number) row[1]).doubleValue();
                    return new WeeklySales("Week " + weekNumber, total);
                })
                .collect(Collectors.toList());
    }
    private boolean verifyRazorpaySignature(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature) {
        return true;
    }

    @Override
    public Page<OrderResponse> getPaginatedOrders(int page, int size, LocalDate startDate, LocalDate endDate) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

        Page<OrderEntity> orderPage;
        if (startDate != null && endDate != null) {
            orderPage = orderEntityRepository.findByCreatedAtBetween(
                    startDate.atStartOfDay(),
                    endDate.atTime(23, 59, 59),
                    pageable
            );
        } else {
            orderPage = orderEntityRepository.findAll(pageable);
        }

        return orderPage.map(this::convertToResponse);
    }

    @Override
    public byte[] exportOrdersToCSV(LocalDate startDate, LocalDate endDate) {
        List<OrderEntity> orders;
        if (startDate != null && endDate != null) {
            orders = orderEntityRepository.findByCreatedAtBetween(
                    startDate.atStartOfDay(),
                    endDate.atTime(23, 59, 59)
            );
        } else {
            orders = orderEntityRepository.findAll();
        }

        try (ByteArrayOutputStream out = new ByteArrayOutputStream();
             PrintWriter writer = new PrintWriter(out)) {

            // Write CSV header
            writer.println("Order ID,Customer Name,Phone Number,Items,Total,Payment Method,Status,Date");

            // Write data
            for (OrderEntity order : orders) {
                String items = order.getItems().stream()
                        .map(item -> item.getName() + " x " + item.getQuantity())
                        .collect(Collectors.joining("; "));

                writer.println(String.format("\"%s\",\"%s\",\"%s\",\"%s\",%.2f,\"%s\",\"%s\",\"%s\"",
                        order.getOrderId(),
                        order.getCustomerName(),
                        order.getPhoneNumber(),
                        items,
                        order.getGrandTotal(),
                        order.getPaymentMethod(),
                        order.getPaymentDetails() != null ? order.getPaymentDetails().getStatus() : "PENDING",
                        order.getCreatedAt()
                ));
            }

            writer.flush();
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Failed to export orders to CSV", e);
        }
    }
}
