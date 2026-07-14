package com.dheeraj.expensetracker.controller;
import com.dheeraj.expensetracker.dto.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import com.dheeraj.expensetracker.entity.Expense;
import com.dheeraj.expensetracker.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestParam;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.time.LocalDate;
import java.util.List;
@Tag(name = "Expense API", description = "APIs for managing expenses")
@RestController
@RequestMapping("/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @Operation(summary = "Create Expense", description = "Creates a new expense")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Expense created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @PostMapping
    public ExpenseResponseDTO createExpense(
            @Valid @RequestBody ExpenseRequestDTO requestDTO) {

        return expenseService.createExpense(requestDTO);
    }

    @Operation(summary = "Get All Expenses")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Expenses retrieved")
    })
    @GetMapping("/get")
    public List<Expense> getExpense() {
        return expenseService.getAllexpenses();
    }

    @Operation(summary = "Get Expense By ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Expense found"),
            @ApiResponse(responseCode = "404", description = "Expense not found")
    })
    @GetMapping("/{id}")
    public Expense getExpenseById(@PathVariable Long id) {

        return expenseService.getExpenseById(id);
    }

    @Operation(summary = "Update Expense")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Expense updated"),
            @ApiResponse(responseCode = "404", description = "Expense not found")
    })
    @PutMapping("/{id}")
    public Expense updateExpense(
            @PathVariable Long id,
            @RequestBody Expense expense) {

        return expenseService.updateExpense(id, expense);
    }

    @Operation(summary = "Delete Expense")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Expense deleted"),
            @ApiResponse(responseCode = "404", description = "Expense not found")
    })
    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {

        expenseService.deleteExpense(id);
    }

    @Operation(summary = "Expense Analytics")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Analytics retrieved")
    })
    @GetMapping("/analytics")
    public AnalyticsResponseDTO getAnalytics() {

        return expenseService.getAnalytics();
    }

    @Operation(summary = "Pagination & Sorting")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Expenses retrieved")
    })
    @GetMapping("/page")
    public Page<ExpenseResponseDTO> getAllExpenses(

            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        return expenseService.getAllExpenses(
                page,
                size,
                sortBy,
                direction
        );
    }

    @Operation(
            summary = "Search Expenses",
            description = "Search expenses by title"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Expenses found"),
            @ApiResponse(responseCode = "404", description = "No expenses found")
    })
    @GetMapping("/search")
    public List<ExpenseResponseDTO> searchExpenses(
            @RequestParam String keyword) {

        return expenseService.searchExpenses(keyword);
    }

    @Operation(
            summary = "Filter Expenses",
            description = "Filter expenses using category and date range"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Expenses filtered successfully")
    })
    @GetMapping("/filter")
    public List<ExpenseResponseDTO> filterExpenses(

            @RequestParam(required = false) Long categoryId,

            @RequestParam(required = false) LocalDate startDate,

            @RequestParam(required = false) LocalDate endDate) {

        return expenseService.filterExpenses(
                categoryId,
                startDate,
                endDate
        );
    }
    @Operation(
            summary = "Expense Category Chart",
            description = "Returns total expense grouped by category."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Category chart generated successfully")
    })
    @GetMapping("/chart/category")
    public List<ChartCategoryDTO> getCategoryChart() {

        return expenseService.getCategoryChart();

    }
    @Operation(
            summary = "Monthly Expense Chart",
            description = "Returns total expense grouped by month."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Monthly chart generated successfully")
    })
    @GetMapping("/chart/month")
    public List<ChartMonthDTO> getMonthlyChart() {

        return expenseService.getMonthlyChart();

    }
}