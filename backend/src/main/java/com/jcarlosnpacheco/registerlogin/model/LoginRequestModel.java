package com.jcarlosnpacheco.registerlogin.model;

import javax.validation.constraints.NotBlank;

public class LoginRequestModel {

    @NotBlank
    private String username;

    @NotBlank
    private String pass;

    public LoginRequestModel(String username, String pass) {

        this.username = username;
        this.pass = pass;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return pass;
    }

    public void setPassword(String pass) {
        this.pass = pass;
    }

}
