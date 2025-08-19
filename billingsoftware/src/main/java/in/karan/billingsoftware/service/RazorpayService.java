package in.karan.billingsoftware.service;

import com.razorpay.RazorpayException;
import in.karan.billingsoftware.io.RazorpayOrderResponse;


public interface RazorpayService {

    RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException;
}

