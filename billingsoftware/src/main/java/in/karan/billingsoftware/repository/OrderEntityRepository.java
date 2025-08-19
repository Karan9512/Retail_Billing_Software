package in.karan.billingsoftware.repository;

import in.karan.billingsoftware.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.domain.Pageable;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface OrderEntityRepository extends JpaRepository<OrderEntity, Long> {
    Optional<OrderEntity> findByOrderId(String orderId);

    List<OrderEntity> findAllByOrderByCreatedAtDesc();

    @Query("SELECT SUM(o.grandTotal) FROM OrderEntity o WHERE DATE(o.createdAt) = :date")
    Double sumSalesByDate(@Param("date") LocalDate date);

    @Query("SELECT COUNT(o) FROM OrderEntity o WHERE DATE(o.createdAt) = :date")
    Long countByOrderDate(@Param("date") LocalDate date);

    @Query("SELECT o FROM OrderEntity o ORDER BY o.createdAt DESC")
    List<OrderEntity> findRecentOrders(Pageable pageable);

    @Query("SELECT FUNCTION('MONTH', o.createdAt) as month, SUM(o.grandTotal) as totalSales " +
            "FROM OrderEntity o " +
            "WHERE FUNCTION('YEAR', o.createdAt) = :year " +
            "GROUP BY FUNCTION('MONTH', o.createdAt) " +
            "ORDER BY FUNCTION('MONTH', o.createdAt)")
    List<Object[]> getMonthlySalesData(@Param("year") int year);

    @Query("SELECT FUNCTION('WEEK', o.createdAt) as week, SUM(o.grandTotal) as totalSales " +
            "FROM OrderEntity o " +
            "WHERE FUNCTION('YEAR', o.createdAt) = :year " +
            "GROUP BY FUNCTION('WEEK', o.createdAt) " +
            "ORDER BY FUNCTION('WEEK', o.createdAt)")
    List<Object[]> getWeeklySalesData(@Param("year") int year);
}
