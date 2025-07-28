package com.cdac.billingsoftware.service;

import com.cdac.billingsoftware.io.CategoryRequest;
import com.cdac.billingsoftware.io.CategoryResponse;

public interface CategoryService {

    CategoryResponse add(CategoryRequest request);
}
