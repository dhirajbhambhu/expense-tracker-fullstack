package com.dheeraj.expensetracker.service;

import com.dheeraj.expensetracker.entity.Expense;
import com.dheeraj.expensetracker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository){
        this.expenseRepository = expenseRepository;
    }

    public Expense addExpense(Expense expense){
        return expenseRepository.save(expense);
    }
   
    public List<Expense> getAllexpenses(){
        return expenseRepository.findAll();
    }
    public Expense getExpenseById(Long id){
        return expenseRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Expense not found"));
    }
    public Expense updateExpense(Long id , Expense expense){
        Expense existingExpense = expenseRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Expense not found"));
                  existingExpense.setTitle(expense.getTitle());
                  existingExpense.setAmount(expense.getAmount());

                  return expenseRepository.save(existingExpense);
    }
    public void deleteExpense(Long id){
        Expense Existingexpense = expenseRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Expense not found"));
        expenseRepository.delete(Existingexpense);
    }
}
