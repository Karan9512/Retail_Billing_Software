package in.karan.billingsoftware.service;

import in.karan.billingsoftware.io.CategoryRequest;
import in.karan.billingsoftware.io.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService {
    CategoryResponse add(CategoryRequest request, MultipartFile file);
    List<CategoryResponse> read();

    void delete(String categoryId);
}
