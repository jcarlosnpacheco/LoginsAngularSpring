package com.jcarlosnpacheco.registerlogin.controller;

import java.util.List;

import com.jcarlosnpacheco.registerlogin.model.UserModel;
import com.jcarlosnpacheco.registerlogin.services.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserModel>> listAll() {
        return ResponseEntity.ok(userService.listAll());
    }
}
