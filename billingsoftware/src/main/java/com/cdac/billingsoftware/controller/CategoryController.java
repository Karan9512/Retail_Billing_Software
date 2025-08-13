package com.cdac.billingsoftware.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.cdac.billingsoftware.io.CategoryRequest;
import com.cdac.billingsoftware.io.CategoryResponse;
import com.cdac.billingsoftware.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor

public class CategoryController {

    private final CategoryService categoryService;

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/admin/categories")
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse addCategory(@RequestPart("category") String categoryString,
                                        @RequestPart("file")MultipartFile file){
        ObjectMapper objectMapper = new ObjectMapper();
        CategoryRequest request = null;
        try{
            request = objectMapper.readValue(categoryString, CategoryRequest.class);
            return categoryService.add(request, file);
        } catch (JsonProcessingException e){
             throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Exception occured while parsing the json: "+e.getMessage());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/categories")
    public List<CategoryResponse> fetchCategories(){
        return categoryService.read();
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("admin/categories/{categoryId}")
    public void remove(@PathVariable String categoryId){
        try{
            categoryService.delete(categoryId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
