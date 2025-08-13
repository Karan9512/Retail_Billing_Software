package com.cdac.billingsoftware.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileUploadService {

    //Added chaheges
    String uploadFile(MultipartFile file);

    Boolean deleteFile(String imgUrl);
}
