package com.jcarlosnpacheco.registerlogin.model;

public class MessageResponseModel {
    private String message;

    public MessageResponseModel(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
