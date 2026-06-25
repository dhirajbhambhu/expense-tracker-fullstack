package com.dheeraj.expensetracker.controller;

import com.dheeraj.expensetracker.dto.BudgetRequestDTO;
import com.dheeraj.expensetracker.dto.BudgetResponseDTO;
import com.dheeraj.expensetracker.service.BudgetService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/budget")
public class BudgetController {

    private final BudgetService budgetService;

    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }
    @PostMapping
    public BudgetResponseDTO setBudget(
            @Valid @RequestBody BudgetRequestDTO requestDTO){

        return budgetService.setBudget(requestDTO);

    }
    @GetMapping
    public BudgetResponseDTO getBudgetSummary(){

        return budgetService.getBudgetSummary();

    }
}