package com.dheeraj.expensetracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseResponseDTO {

    private Long id;
    private String title;
    private double amount;
    private String description;
    private LocalDate date;
    private String categoryName;

}
