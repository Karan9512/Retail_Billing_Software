package in.karan.billingsoftware.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.*;

@Service
public class SmsService {

    @Value("${fast2sms.api.key}")
    private String apiKey;

    public void sendReceiptSms(String to, String messageBody) {
        String url = "https://www.fast2sms.com/dev/bulkV2";

        HttpHeaders headers = new HttpHeaders();
        headers.set("authorization", apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = new HashMap<>();
        body.put("route", "q"); // "q" is for quick SMS
        body.put("message", messageBody);
        body.put("language", "english");
        body.put("flash", 0);
        body.put("numbers", to);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

        System.out.println("SMS API Response: " + response.getBody());
    }
}
