package com.cdac.billingsoftware.service;

import com.razorpay.RazorpayException;
import com.cdac.billingsoftware.io.RazorpayOrderResponse;

public interface RazorpayService {

    RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException;
}
