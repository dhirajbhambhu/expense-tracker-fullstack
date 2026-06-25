package com.dheeraj.expensetracker.repository;

import com.dheeraj.expensetracker.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BudgetRepository
        extends JpaRepository<Budget, Long> {

}