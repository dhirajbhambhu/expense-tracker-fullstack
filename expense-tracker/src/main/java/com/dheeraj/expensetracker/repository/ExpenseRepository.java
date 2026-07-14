package com.dheeraj.expensetracker.repository;

import com.dheeraj.expensetracker.dto.ChartCategoryDTO;
import com.dheeraj.expensetracker.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByTitle(String title);

    List<Expense> findByTitleContainingIgnoreCase(String keyword);

    @Query("SELECT SUM(e.amount) FROM Expense e")
    Double getTotalExpense();

    @Query("SELECT MAX(e.amount) FROM Expense e")
    Double getHighestExpense();

    @Query("SELECT AVG(e.amount) FROM Expense e")
    Double getAverageExpense();

    @Query("SELECT COUNT(e) FROM Expense e")
    Long getTotalTransactions();

    @Query("SELECT e FROM Expense e WHERE e.amount > :amount")
    List<Expense> getExpensesAboveAmount(@Param("amount") Double amount);

    @Query(value = """
SELECT
c.name,
SUM(e.amount)
FROM expense e
JOIN category c
ON e.category_id = c.id
GROUP BY c.name
""", nativeQuery = true)
    List<Object[]> getCategoryChart();

    @Query(value = """
        SELECT
            DATE_FORMAT(date,'%M') AS month,
            SUM(amount) AS amount
        FROM expense
        GROUP BY MONTH(date), DATE_FORMAT(date,'%M')
        ORDER BY MONTH(date)
        """, nativeQuery = true)
    List<Object[]> getMonthlyChart();

    List<Expense> findByCategoryId(Long categoryId);

    List<Expense> findByDateBetween(LocalDate startDate, LocalDate endDate);

    List<Expense> findByCategoryIdAndDateBetween(
            Long categoryId,
            LocalDate startDate,
            LocalDate endDate
    );
}