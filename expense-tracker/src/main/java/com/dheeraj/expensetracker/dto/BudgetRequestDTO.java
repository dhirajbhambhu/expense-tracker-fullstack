package com.dheeraj.expensetracker.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BudgetRequestDTO {
    @NotNull(message = "Budget cannot be null")
    @Positive(message = "Budget must be greater than 0")
    private Double monthlyBudget;
}
