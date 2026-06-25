package com.dheeraj.expensetracker.entity;
import com.dheeraj.expensetracker.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double monthlyBudget;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
