package com.jcarlosnpacheco.registerlogin.controller;

import java.util.List;

import javax.validation.Valid;

import com.jcarlosnpacheco.registerlogin.domain.RegisterLogin;
import com.jcarlosnpacheco.registerlogin.model.RegisterLoginPostBodyModel;
import com.jcarlosnpacheco.registerlogin.model.RegisterLoginPutBodyModel;
import com.jcarlosnpacheco.registerlogin.model.ResponseModel;
import com.jcarlosnpacheco.registerlogin.services.RegisterLoginService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/RegisterLogin")
public class RegisterLoginController {
    private final RegisterLoginService registerLoginService;

    public RegisterLoginController(RegisterLoginService registerLoginService) {
        this.registerLoginService = registerLoginService;
    }

    @GetMapping
    @PreAuthorize("#userId == principal.id")
    public ResponseEntity<List<RegisterLogin>> list(@RequestParam(value = "userId") long userId) {
        return ResponseEntity.ok(registerLoginService.listAll(userId));
    }

    @GetMapping(path = "GetById")
    @PreAuthorize("#userId == principal.id")
    public ResponseEntity<RegisterLogin> findById(@RequestParam(value = "userId") long userId,
            @RequestParam(value = "id") Integer id) {

        return ResponseEntity.ok(registerLoginService.findById(id));
    }

    @GetMapping(path = "GetByName")
    @PreAuthorize("#userId == principal.id")
    public ResponseEntity<List<RegisterLogin>> findByLoginName(@RequestParam(value = "userId") long userId,
            @RequestParam(value = "name") String name, @RequestParam(value = "obs") String observation) {

        return ResponseEntity.ok(registerLoginService.findByLoginName(userId, name, observation));
    }

    @PostMapping
    @PreAuthorize("#registerLoginPostBody.userId == principal.id")
    public ResponseEntity<ResponseModel> create(@Valid @RequestBody RegisterLoginPostBodyModel registerLoginPostBody) {
        return new ResponseEntity<>(registerLoginService.create(registerLoginPostBody), HttpStatus.CREATED);
    }

    @PutMapping
    @PreAuthorize("#registerLoginPutBody.userId == principal.id")
    public ResponseEntity<ResponseModel> put(@RequestBody RegisterLoginPutBodyModel registerLoginPutBody) {
        return new ResponseEntity<>(registerLoginService.update(registerLoginPutBody), HttpStatus.OK);
    }

    @DeleteMapping(path = "")
    @PreAuthorize("#userId == principal.id")
    public ResponseEntity<ResponseModel> delete(@RequestParam(value = "userId") long userId,
            @RequestParam(value = "id") Integer id) {
        return ResponseEntity.ok(registerLoginService.delete(id));
    }

}
