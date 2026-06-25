package com.dheeraj.expensetracker.controller;

import com.dheeraj.expensetracker.dto.AnalyticsResponseDTO;
import com.dheeraj.expensetracker.dto.ExpenseRequestDTO;
import com.dheeraj.expensetracker.dto.ExpenseResponseDTO;
import com.dheeraj.expensetracker.entity.Expense;
import com.dheeraj.expensetracker.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RestController
@RequestMapping("/expenses")
public class ExpenseController {
    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService){
        this.expenseService = expenseService;
    }
    @PostMapping
    public ExpenseResponseDTO createExpense(@Valid @RequestBody ExpenseRequestDTO requestDTO){
        return expenseService.createExpense(requestDTO);
    }
   
    @GetMapping("/get")
    public List<Expense> getExpense(){
        return expenseService.getAllexpenses();
    }
    @GetMapping("/{id}")
    public Expense getExpenseById(@PathVariable Long id){
        return expenseService.getExpenseById(id);
    }
    @GetMapping("/analytics")
    public AnalyticsResponseDTO getAnalytics() {

        return expenseService.getAnalytics();

    }
  
    @GetMapping("/page")
    public Page<ExpenseResponseDTO> getAllExpenses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        return expenseService.getAllExpenses(page, size, sortBy,direction);
    }
    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id,@RequestBody Expense expense){
        return expenseService.updateExpense(id,expense);
    }
    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id){
        expenseService.deleteExpense(id);
    }


}
