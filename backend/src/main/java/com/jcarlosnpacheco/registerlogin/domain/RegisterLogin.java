package com.jcarlosnpacheco.registerlogin.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "spring_register_login")
public class RegisterLogin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "login_name", nullable = false)
    private String loginName;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "observation")
    private String observation;

    @Column(name = "user_id")
    private long userId;

    public RegisterLogin() {
    }

    public RegisterLogin(int id, String loginName, String password, String observation) {
        this.id = id;
        this.loginName = loginName;
        this.password = password;
        this.observation = observation;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLoginName() {
        return loginName;
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

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

}
