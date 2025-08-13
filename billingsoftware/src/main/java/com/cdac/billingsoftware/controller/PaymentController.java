package com.cdac.billingsoftware.controller;
import com.razorpay.RazorpayException;
import com.cdac.billingsoftware.io.OrderResponse;
import com.cdac.billingsoftware.io.PaymentRequest;
import com.cdac.billingsoftware.io.PaymentVerificationRequest;
import com.cdac.billingsoftware.io.RazorpayOrderResponse;
import com.cdac.billingsoftware.service.OrderService;
import com.cdac.billingsoftware.service.RazorpayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final RazorpayService razorpayService;
    private final OrderService orderService;

    @PostMapping("/create-order")
    @ResponseStatus(HttpStatus.CREATED)
    public RazorpayOrderResponse createRazorpayOrder(@RequestBody PaymentRequest request) throws RazorpayException {
        return razorpayService.createOrder(request.getAmount(), request.getCurrency());
    }

    @PostMapping("/verify")
    public OrderResponse verifyPayment(@RequestBody PaymentVerificationRequest request) {
        return orderService.verifyPayment(request);
    }
}

