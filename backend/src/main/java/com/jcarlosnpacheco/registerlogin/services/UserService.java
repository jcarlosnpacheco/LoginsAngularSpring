package com.jcarlosnpacheco.registerlogin.services;

import java.util.ArrayList;
import java.util.List;

import com.jcarlosnpacheco.registerlogin.domain.User;
import com.jcarlosnpacheco.registerlogin.model.UserModel;
import com.jcarlosnpacheco.registerlogin.repository.UserRepository;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserModel> listAll() {
        List<UserModel> list = new ArrayList<>();
        UserModel userModel;
        List<User> result = userRepository.findAll();

        for (User user : result) {
            userModel = new UserModel();
            userModel.setUsers(user);
            list.add(userModel);
        }

        return list;

    }

}
