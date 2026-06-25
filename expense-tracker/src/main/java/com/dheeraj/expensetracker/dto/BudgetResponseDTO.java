package com.dheeraj.expensetracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BudgetResponseDTO {

    private Double monthlyBudget;

    private Double spentAmount;

    private Double remainingAmount;
}
