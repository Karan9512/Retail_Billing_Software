package in.karan.billingsoftware.controller;

import in.karan.billingsoftware.io.ReceiptSmsRequest;
import in.karan.billingsoftware.service.SmsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sms")
public class SmsController {

    @Autowired
    private SmsService smsService;

    @PostMapping("/send-receipt")
    public String sendReceiptSms(@RequestBody ReceiptSmsRequest request) {
        String message = String.format(
                "Dear %s, your payment of ₹%.2f has been successfully received. Thank you for your purchase!",
                request.getCustomerName(),
                request.getAmount()
        );

        smsService.sendReceiptSms(request.getPhoneNumber(), message);
        return "SMS sent successfully to " + request.getPhoneNumber();
    }
}
