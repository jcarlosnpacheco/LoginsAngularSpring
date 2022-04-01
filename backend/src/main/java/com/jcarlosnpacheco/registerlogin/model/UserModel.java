package com.jcarlosnpacheco.registerlogin.model;

import java.util.Iterator;

import com.jcarlosnpacheco.registerlogin.domain.Role;
import com.jcarlosnpacheco.registerlogin.domain.User;

public class UserModel {
    private Long id;
    private String username;
    private String roles;

    public UserModel() {

    }

    public UserModel(Long id, String username, String roles) {
        this.id = id;
        this.username = username;
        this.roles = roles;
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

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    public void setUsers(User user) {
        this.id = user.getId();
        this.username = user.getUsername();

        // Creating an iterator
        Iterator<Role> role = user.getRoles().iterator();
        Role roleIterator;

        StringBuilder rolesReturned = new StringBuilder();
        while (role.hasNext()) {
            roleIterator = role.next();
            rolesReturned.append(roleIterator.getName() + ", ");
        }

        // remove comma
        if (rolesReturned.length() > 0) {
            rolesReturned = rolesReturned.deleteCharAt(rolesReturned.length() - 2);
        }

        this.roles = rolesReturned.toString();
    }
}
