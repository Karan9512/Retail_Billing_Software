package in.karan.billingsoftware.io;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MonthlySales {
    private String monthName;
    private Double totalSales;
}
