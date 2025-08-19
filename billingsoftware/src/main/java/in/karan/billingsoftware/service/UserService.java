package in.karan.billingsoftware.service;

import in.karan.billingsoftware.io.UserRequest;
import in.karan.billingsoftware.io.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest request);

    String getUserRole(String email);

    List<UserResponse> readUsers();

    void deleteUser(String id);
}
