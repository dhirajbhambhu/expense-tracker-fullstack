package com.dheeraj.expensetracker.repository;

import com.dheeraj.expensetracker.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BudgetRepository
        extends JpaRepository<Budget, Long> {

    Optional<Budget> findTopByOrderByIdDesc();

}