package com.jcarlosnpacheco.registerlogin.model;

import java.util.List;

public class JwtResponseModel {
    private Long id;
    private String username;
    private List<String> roles;
    private String token;

    public JwtResponseModel(String token, Long id, String username, List<String> roles) {
        this.id = id;
        this.username = username;
        this.roles = roles;
        this.token = token;
    }

    public JwtResponseModel(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
