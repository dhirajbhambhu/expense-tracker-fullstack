package com.dheeraj.expensetracker.service;

import com.dheeraj.expensetracker.entity.Category;
import com.dheeraj.expensetracker.exception.ResourceNotFoundException;
import com.dheeraj.expensetracker.repository.CategoryRepository;
import com.dheeraj.expensetracker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;
import io.swagger.v3.oas.annotations.Operation;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
       private final CategoryRepository categoryRepository;

       public CategoryService(CategoryRepository categoryRepository){
           this.categoryRepository = categoryRepository;
       }

       public Category addCategory(Category category){
           return categoryRepository.save(category);
       }

       public List<Category> getAllCategory(){
           return  categoryRepository.findAll();
       }
       public Category getCategoryById(long id){
           return categoryRepository.findById(id)
                   .orElseThrow(() ->  new ResourceNotFoundException("ID not found"));
       }
    public Category updateCategory(Long id, Category category) {

        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        existingCategory.setName(category.getName());

        return categoryRepository.save(existingCategory);
    }
       public void deleteCategory(Long id){
           Category category = categoryRepository.findById(id)
                   .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

            categoryRepository.delete(category);
       }
}
