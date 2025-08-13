package com.cdac.billingsoftware.service.impl;

import com.cdac.billingsoftware.entity.CategoryEntity;
import com.cdac.billingsoftware.io.CategoryRequest;
import com.cdac.billingsoftware.io.CategoryResponse;
import com.cdac.billingsoftware.repository.CategoryRepository;
import com.cdac.billingsoftware.repository.ItemRepository;
import com.cdac.billingsoftware.service.CategoryService;
import com.cdac.billingsoftware.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final FileUploadService fileUploadService;
    private final ItemRepository itemRepository;

    public CategoryResponse add(CategoryRequest request, MultipartFile file) throws IOException {
        String imgUrl = fileUploadService.uploadFile(file);
//        String fileName = UUID.randomUUID().toString()+"."+StringUtils.getFilenameExtension(file.getOriginalFilename());
//        Path uploadPath = Paths.get("uploads").toAbsolutePath().normalize();
//        Files.createDirectories(uploadPath);
//        Path targetLocation = uploadPath.resolve(fileName);
//        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
//        String imgUrl = "http://localhost:8080/api/v1.0/uploads/"+fileName;
        CategoryEntity newCategory = convertToEntity(request);
        newCategory.setImgUrl(imgUrl);
        newCategory = categoryRepository.save(newCategory);
        return convertToResponse(newCategory);
    }

    @Override
    public List<CategoryResponse> read() {
        return categoryRepository.findAll()
                .stream()
                .map(categoryEntity -> convertToResponse(categoryEntity))
                .collect(Collectors.toList());
    }

    @Override
    public void delete(String categoryId) {
        CategoryEntity existingCategory = categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found: "+categoryId));
        fileUploadService.deleteFile(existingCategory.getImgUrl());
//        String imgUrl = existingCategory.getImgUrl();
//        String fileName = imgUrl.substring(imgUrl.lastIndexOf("/")+1);
//        Path uploadPath = Paths.get("uploads").toAbsolutePath().normalize();
//        Path filePath = uploadPath.resolve(fileName);
//        try {
//            Files.deleteIfExists(filePath);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
        categoryRepository.delete(existingCategory);
    }

    private CategoryResponse convertToResponse(CategoryEntity newCategory) {
        Integer itemsCount = itemRepository.countByCategoryId(newCategory.getId());
        return CategoryResponse.builder()
                .categoryId(newCategory.getCategoryId())
                .name(newCategory.getName())
                .description(newCategory.getDescription())
                .bgColor(newCategory.getBgColor())
                .imgUrl(newCategory.getImgUrl())
                .createdAt(newCategory.getCreatedAt())
                .updatedAt(newCategory.getUpdatedAt())
                .items(itemsCount)
                .build();
    }

    private CategoryEntity convertToEntity(CategoryRequest request) {
        return CategoryEntity.builder()
                .categoryId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .bgColor(request.getBgColor())
                .build();
    }
}
