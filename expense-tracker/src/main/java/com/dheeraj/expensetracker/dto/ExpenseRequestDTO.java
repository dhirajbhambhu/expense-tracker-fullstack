package com.dheeraj.expensetracker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class ExpenseRequestDTO {
         @NotBlank(message = "Title cannot be empty")
         private String title;
         @Positive(message = "Amount must be greater than 0")
         private double amount;
         @NotBlank(message = "Description cannot be empty")
         private String description;
         
}
