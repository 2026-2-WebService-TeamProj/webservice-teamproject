package com.webservice.travel.user;

import com.webservice.travel.user.dto.UserCreateRequest;
import com.webservice.travel.user.dto.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public UserResponse create(UserCreateRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("이미 등록된 이메일입니다.");
        }

        User user = new User(request.email(), request.nickname());
        User savedUser = userRepository.save(user);

        return UserResponse.from(savedUser);
    }
}