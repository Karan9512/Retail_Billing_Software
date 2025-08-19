package in.karan.billingsoftware.controller;

import in.karan.billingsoftware.io.DashboardResponse;
import in.karan.billingsoftware.io.MonthlySales;
import in.karan.billingsoftware.io.OrderResponse;
import in.karan.billingsoftware.io.WeeklySales;
import in.karan.billingsoftware.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final OrderService orderService;

    @GetMapping
    public DashboardResponse getDashboardData() {
        LocalDate today = LocalDate.now();
        Double todaySale = orderService.sumSalesByDate(today);
        Long todayOrderCount = orderService.countByOrderDate(today);
        List<OrderResponse> recentOrders = orderService.findRecentOrders();
        return new DashboardResponse(
                todaySale != null ? todaySale : 0.0,
                todayOrderCount != null ? todayOrderCount : 0,
                recentOrders
        );
    }

    @GetMapping("/monthly-sales")
    public List<MonthlySales> getMonthlySales(@RequestParam int year) {
        return orderService.getMonthlySales(year);
    }

    @GetMapping("/weekly-sales")
    public List<WeeklySales> getWeeklySales(@RequestParam int year) {
        return orderService.getWeeklySales(year);
    }
}

