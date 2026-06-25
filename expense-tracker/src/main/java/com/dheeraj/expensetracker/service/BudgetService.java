package com.dheeraj.expensetracker.service;

import com.dheeraj.expensetracker.dto.BudgetRequestDTO;
import com.dheeraj.expensetracker.dto.BudgetResponseDTO;
import com.dheeraj.expensetracker.entity.Budget;
import com.dheeraj.expensetracker.entity.Expense;
import com.dheeraj.expensetracker.entity.User;
import com.dheeraj.expensetracker.repository.BudgetRepository;
import com.dheeraj.expensetracker.repository.ExpenseRepository;
import com.dheeraj.expensetracker.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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

        Budget budget = new Budget();

        budget.setMonthlyBudget(requestDTO.getMonthlyBudget());

        User user = userRepository.findAll().get(0);
        budget.setUser(user);

        Budget savedBudget = budgetRepository.save(budget);

        BudgetResponseDTO responseDTO = new BudgetResponseDTO();
        
        responseDTO.setMonthlyBudget(savedBudget.getMonthlyBudget());

        return responseDTO;
    }
    public BudgetResponseDTO getBudgetSummary() {

        Budget budget = budgetRepository.findAll().get(0);

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

        return response;
    }
}
