package com.dheeraj.expensetracker.controller;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import com.dheeraj.expensetracker.entity.Category;
import com.dheeraj.expensetracker.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Tag(name = "Expense API", description = "APIs for managing expenses")
@RestController
@RequestMapping("/category")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService){
        this.categoryService = categoryService;
    }
    @Operation(
            summary = "Create Category",
            description = "Creates a new expense category."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Category created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid category data"),
            @ApiResponse(responseCode = "409", description = "Category already exists")
    })
    @PostMapping
    public Category createCategory(@RequestBody Category category){
        return categoryService.addCategory(category);
    }
    @Operation(
            summary = "Get All Categories",
            description = "Returns all expense categories."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Categories retrieved successfully")
    })
    @GetMapping
    public List<Category> getCategory(){
        return categoryService.getAllCategory();
    }
    @Operation(
            summary = "Get Category By ID",
            description = "Returns a category by ID."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Category found"),
            @ApiResponse(responseCode = "404", description = "Category not found")
    })
    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable long id){
        return categoryService.getCategoryById(id);
    }
    @Operation(
            summary = "Update Category",
            description = "Updates an existing category."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Category updated successfully"),
            @ApiResponse(responseCode = "404", description = "Category not found")
    })
    @PutMapping("/{id}")
    public Category updateCategory(
            @PathVariable Long id,
            @RequestBody Category category) {

        return categoryService.updateCategory(id, category);
    }
    @Operation(
            summary = "Delete Category",
            description = "Deletes a category by ID."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Category deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Category not found")
    })
    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable long id){
        categoryService.deleteCategory(id);
    }
}
