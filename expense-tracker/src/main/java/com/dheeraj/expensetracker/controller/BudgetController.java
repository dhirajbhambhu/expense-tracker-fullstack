package com.dheeraj.expensetracker.controller;

import com.dheeraj.expensetracker.dto.BudgetRequestDTO;
import com.dheeraj.expensetracker.dto.BudgetResponseDTO;
import com.dheeraj.expensetracker.service.BudgetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Budget API", description = "APIs for managing monthly budget")
@RestController
@RequestMapping("/budget")
public class BudgetController {

    private final BudgetService budgetService;

    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @Operation(
            summary = "Create Budget",
            description = "Creates a monthly budget."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Budget created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid budget data")
    })
    @PostMapping
    public BudgetResponseDTO setBudget(
            @Valid @RequestBody BudgetRequestDTO requestDTO) {

        return budgetService.setBudget(requestDTO);
    }

    @Operation(
            summary = "Get Budget",
            description = "Returns the current budget summary."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Budget retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Budget not found")
    })
    @GetMapping
    public BudgetResponseDTO getBudgetSummary() {

        return budgetService.getBudgetSummary();
    }

    @Operation(
            summary = "Update Budget",
            description = "Updates the monthly budget."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Budget updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid budget data"),
            @ApiResponse(responseCode = "404", description = "Budget not found")
    })
    @PutMapping("/{id}")
    public BudgetResponseDTO updateBudget(
            @PathVariable Long id,
            @Valid @RequestBody BudgetRequestDTO requestDTO) {

        return budgetService.updateBudget(id, requestDTO);
    }

    @Operation(
            summary = "Delete Budget",
            description = "Deletes the monthly budget."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Budget deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Budget not found")
    })
    @DeleteMapping("/{id}")
    public void deleteBudget(@PathVariable Long id) {

        budgetService.deleteBudget(id);
    }
}