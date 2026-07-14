package com.dheeraj.expensetracker.service;
import com.dheeraj.expensetracker.dto.*;
import io.swagger.v3.oas.annotations.Operation;
import com.dheeraj.expensetracker.entity.Expense;
import com.dheeraj.expensetracker.exception.ResourceNotFoundException;
import com.dheeraj.expensetracker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.PostMapping;
import java.math.BigDecimal;
import java.util.ArrayList;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;


    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public ExpenseResponseDTO createExpense(ExpenseRequestDTO requestDTO) {

        Expense expense = new Expense();

        expense.setTitle(requestDTO.getTitle());
        expense.setAmount(requestDTO.getAmount());
        expense.setDescription(requestDTO.getDescription());

        Expense savedExpense = expenseRepository.save(expense);

        ExpenseResponseDTO responseDTO = new ExpenseResponseDTO();

        responseDTO.setId(savedExpense.getId());
        responseDTO.setTitle(savedExpense.getTitle());
        responseDTO.setAmount(savedExpense.getAmount());
        responseDTO.setDescription(savedExpense.getDescription());

        return responseDTO;
    }


    public List<Expense> getAllexpenses() {
        return expenseRepository.findAll();
    }

    public Expense getExpenseById(Long id) {
        return expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found"));
    }

    public List<ExpenseResponseDTO> searchExpenses(String keyword) {

        List<Expense> expenses =
                expenseRepository.findByTitleContainingIgnoreCase(keyword);

        List<ExpenseResponseDTO> response = new ArrayList<>();

        for (Expense expense : expenses) {

            ExpenseResponseDTO dto = new ExpenseResponseDTO();

            dto.setId(expense.getId());
            dto.setTitle(expense.getTitle());
            dto.setAmount(expense.getAmount());
            dto.setDescription(expense.getDescription());
            dto.setDate(expense.getDate());

            if (expense.getCategory() != null) {
                dto.setCategoryName(expense.getCategory().getName());
            }

            response.add(dto);
        }

        return response;
    }

    public Expense updateExpense(Long id, Expense expense) {
        Expense existingExpense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found"));
        existingExpense.setTitle(expense.getTitle());
        existingExpense.setAmount(expense.getAmount());
        existingExpense.setDescription(expense.getDescription());

        return expenseRepository.save(existingExpense);
    }

    public void deleteExpense(Long id) {
        Expense Existingexpense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Expense not found"));
        expenseRepository.delete(Existingexpense);
    }

    public AnalyticsResponseDTO getAnalytics() {


        Long totalTransactions = expenseRepository.getTotalTransactions();
        Double totalExpense = expenseRepository.getTotalExpense();
        Double highestExpense = expenseRepository.getHighestExpense();
        Double averageExpense = expenseRepository.getAverageExpense();

        AnalyticsResponseDTO response = new AnalyticsResponseDTO();

        response.setTotalExpense(totalExpense != null ? totalExpense : 0.0);
        response.setHighestExpense(highestExpense != null ? highestExpense : 0.0);
        response.setAverageExpense(averageExpense != null ? averageExpense : 0.0);
        response.setTotalTransactions(totalTransactions);

        return response;


    }

    public Page<ExpenseResponseDTO> getAllExpenses(
            int page,
            int size,
            String sortBy,
            String direction) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortBy)
        );
        Page<Expense> expensePage = expenseRepository.findAll(pageable);
        return expensePage.map(expense -> {

            ExpenseResponseDTO dto = new ExpenseResponseDTO();

            dto.setId(expense.getId());
            dto.setTitle(expense.getTitle());
            dto.setDescription(expense.getDescription());
            dto.setAmount(expense.getAmount());
            dto.setDate(expense.getDate());

            if (expense.getCategory() != null) {
                dto.setCategoryName(expense.getCategory().getName());
            }

            return dto;
        });
    }

    public List<ExpenseResponseDTO> filterExpenses(
            Long categoryId,
            LocalDate startDate,
            LocalDate endDate) {

        List<Expense> expenses;

        if (categoryId != null && startDate != null && endDate != null) {

            expenses = expenseRepository.findByCategoryIdAndDateBetween(
                    categoryId,
                    startDate,
                    endDate
            );

        } else if (categoryId != null) {

            expenses = expenseRepository.findByCategoryId(categoryId);

        } else if (startDate != null && endDate != null) {

            expenses = expenseRepository.findByDateBetween(
                    startDate,
                    endDate
            );

        } else {

            expenses = expenseRepository.findAll();

        }

        return expenses.stream().map(expense -> {

            ExpenseResponseDTO dto = new ExpenseResponseDTO();

            dto.setId(expense.getId());
            dto.setTitle(expense.getTitle());
            dto.setAmount(expense.getAmount());
            dto.setDescription(expense.getDescription());
            dto.setDate(expense.getDate());

            if (expense.getCategory() != null) {
                dto.setCategoryName(expense.getCategory().getName());
            }

            return dto;

        }).toList();
    }
    public List<ChartCategoryDTO> getCategoryChart() {

        List<Object[]> result = expenseRepository.getCategoryChart();

        List<ChartCategoryDTO> response = new ArrayList<>();

        for (Object[] row : result) {

            response.add(
                    new ChartCategoryDTO(
                            row[0].toString(),
                            (BigDecimal) row[1]
                    )
            );

        }

        return response;
    }

    public List<ChartMonthDTO> getMonthlyChart() {

        List<Object[]> result = expenseRepository.getMonthlyChart();

        List<ChartMonthDTO> response = new ArrayList<>();

        for (Object[] row : result) {

            response.add(
                    new ChartMonthDTO(
                            row[0].toString(),
                            (BigDecimal) row[1]
                    )
            );

        }

        return response;
    }
}




