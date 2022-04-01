package com.jcarlosnpacheco.registerlogin.model;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

public class RegisterLoginPutBodyModel {

    @Positive(message = "The id must be greater zero")
    private int id;

    @NotNull(message = "The loginName cannot be empty")
    @NotEmpty(message = "The loginName cannot be empty")
    private String loginName;

    @NotNull(message = "The password cannot be empty")
    @NotEmpty(message = "The password cannot be empty")
    private String password;

    private String observation;

    @Min(value = 1, message = "User ID must be greater 0(Zero)")
    private Long userId;

    public String getLoginName() {
        return loginName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getObservation() {
        return observation;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

}
