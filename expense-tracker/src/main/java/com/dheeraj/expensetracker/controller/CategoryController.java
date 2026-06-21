package com.dheeraj.expensetracker.controller;

import com.dheeraj.expensetracker.entity.Category;
import com.dheeraj.expensetracker.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService){
        this.categoryService = categoryService;
    }

    @PostMapping
    public Category createCategory(@RequestBody Category category){
        return categoryService.addCategory(category);
    }
    @GetMapping
    public List<Category> getCategory(){
        return categoryService.getAllCategory();
    }
    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable long id){
        return categoryService.getCategoryById(id);
    }
    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable long id){
        categoryService.deleteCategory(id);
    }
}
