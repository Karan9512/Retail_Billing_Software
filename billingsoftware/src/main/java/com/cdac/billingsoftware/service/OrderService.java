package com.cdac.billingsoftware.service;
import com.cdac.billingsoftware.io.*;
import org.springframework.data.domain.Page;
import java.time.LocalDate;
import java.util.List;

public interface OrderService {
    OrderResponse createOrder(OrderRequest request);
    void deleteOrder(String orderId);
    List<OrderResponse> getLatestOrders();
    OrderResponse verifyPayment(PaymentVerificationRequest request);
    Double sumSalesByDate(LocalDate date);
    Long countByOrderDate(LocalDate date);
    List<OrderResponse> findRecentOrders();
    Page<OrderResponse> getPaginatedOrders(int page, int size);
    List<MonthlySales> getMonthlySales(int year);
    List<WeeklySales> getWeeklySales(int year);
    Page<OrderResponse> getPaginatedOrders(int page, int size, LocalDate startDate, LocalDate endDate);
    byte[] exportOrdersToCSV(LocalDate startDate, LocalDate endDate);
}