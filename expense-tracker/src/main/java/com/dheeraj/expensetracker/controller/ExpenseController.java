package com.dheeraj.expensetracker.controller;

import com.dheeraj.expensetracker.entity.Expense;
import com.dheeraj.expensetracker.service.ExpenseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expenses")
public class ExpenseController {
    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService){
        this.expenseService = expenseService;
    }
    @PostMapping
    public Expense createExpense(@RequestBody Expense expense){
        return expenseService.addExpense(expense);
    }
    @PostMapping("/add")
    public Expense addExpense(@RequestBody Expense expense){
        return expenseService.addExpense(expense);
    }
    @GetMapping("/get")
    public List<Expense> getExpense(){
        return expenseService.getAllexpenses();
    }
    @GetMapping("/{id}")
    public Expense getExpenseById(@PathVariable Long id){
        return expenseService.getExpenseById(id);
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
