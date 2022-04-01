package com.jcarlosnpacheco.registerlogin.controller;

import com.jcarlosnpacheco.registerlogin.model.JwtResponseModel;
import com.jcarlosnpacheco.registerlogin.model.LoginRequestModel;
import com.jcarlosnpacheco.registerlogin.model.ResponseModel;
import com.jcarlosnpacheco.registerlogin.model.SignupRequestModel;
import com.jcarlosnpacheco.registerlogin.services.AuthenticateService;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
// @CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("api/auth")
public class AuthenticationController {

    @Autowired
    AuthenticateService authenticateService;

    @PostMapping("/signin")
    public ResponseEntity<JwtResponseModel> authenticateUser(@Valid @RequestBody LoginRequestModel loginRequest) {
        JwtResponseModel response = authenticateService.signin(loginRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<ResponseModel> registerUser(@Valid @RequestBody SignupRequestModel signUpRequest) {
        return ResponseEntity.ok(authenticateService.registerUser(signUpRequest));
    }

    @PutMapping(value = "/resetPass")
    public ResponseEntity<ResponseModel> resetPass(@Valid @RequestBody LoginRequestModel loginRequest) {
        return ResponseEntity.ok(authenticateService.resetPass(loginRequest));
    }
}
