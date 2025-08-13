package com.cdac.billingsoftware.io;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WeeklySales {
    private String weekName;
    private Double totalSales;
}