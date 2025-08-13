package com.cdac.billingsoftware.service;

import com.cdac.billingsoftware.io.UserRequest;
import com.cdac.billingsoftware.io.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest request);

    String getUserRole(String email);

    List<UserResponse> readUsers();

    void deleteUser(String id);
}
