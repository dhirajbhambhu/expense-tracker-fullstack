package com.dheeraj.expensetracker.service;

import com.dheeraj.expensetracker.dto.BudgetRequestDTO;
import com.dheeraj.expensetracker.dto.BudgetResponseDTO;
import com.dheeraj.expensetracker.entity.Budget;
import com.dheeraj.expensetracker.entity.Expense;
import com.dheeraj.expensetracker.entity.User;
import com.dheeraj.expensetracker.exception.ResourceNotFoundException;
import com.dheeraj.expensetracker.repository.BudgetRepository;
import com.dheeraj.expensetracker.repository.ExpenseRepository;
import com.dheeraj.expensetracker.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import io.swagger.v3.oas.annotations.Operation;
@Service
public class BudgetService {
    private final BudgetRepository budgetRepository;

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    public BudgetService(BudgetRepository budgetRepository,
                         ExpenseRepository expenseRepository,UserRepository userRepository) {
        this.budgetRepository = budgetRepository;
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
    }
    public BudgetResponseDTO setBudget(BudgetRequestDTO requestDTO) {

        Budget budget = budgetRepository
                .findTopByOrderByIdDesc()
                .orElse(new Budget());

        budget.setMonthlyBudget(requestDTO.getMonthlyBudget());

        User user = userRepository.findAll().get(0);
        budget.setUser(user);

        Budget savedBudget = budgetRepository.save(budget);

        BudgetResponseDTO responseDTO = new BudgetResponseDTO();
        
        responseDTO.setMonthlyBudget(savedBudget.getMonthlyBudget());

        responseDTO.setId(savedBudget.getId());

        return responseDTO;
    }
    public BudgetResponseDTO getBudgetSummary() {

        Budget budget = budgetRepository
                .findTopByOrderByIdDesc()
                .orElseThrow(() ->
                        new ResourceNotFoundException("Budget not found"));

        List<Expense> expenses = expenseRepository.findAll();

        double spentAmount = 0;

        for (Expense expense : expenses) {
            spentAmount += expense.getAmount();
        }

        double remainingAmount =
                budget.getMonthlyBudget() - spentAmount;

        BudgetResponseDTO response = new BudgetResponseDTO();

        response.setMonthlyBudget(budget.getMonthlyBudget());
        response.setSpentAmount(spentAmount);
        response.setRemainingAmount(remainingAmount);
        response.setId(budget.getId());

        return response;
    }
    public BudgetResponseDTO updateBudget(Long id, BudgetRequestDTO requestDTO) {

        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Budget not found"));

        budget.setMonthlyBudget(requestDTO.getMonthlyBudget());

        Budget updatedBudget = budgetRepository.save(budget);

        BudgetResponseDTO responseDTO = new BudgetResponseDTO();
        responseDTO.setMonthlyBudget(updatedBudget.getMonthlyBudget());

        return responseDTO;
    }

    public void deleteBudget(Long id) {

        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Budget not found"));

        User user = budget.getUser();

        if (user != null) {
            user.setBudget(null);
            userRepository.save(user);
        }

        budgetRepository.delete(budget);
    }
    
}
