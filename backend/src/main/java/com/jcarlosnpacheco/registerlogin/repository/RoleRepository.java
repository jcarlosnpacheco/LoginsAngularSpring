package com.jcarlosnpacheco.registerlogin.repository;

import java.util.Optional;

import com.jcarlosnpacheco.registerlogin.domain.Role;

import com.jcarlosnpacheco.registerlogin.domain.enums.ERole;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

    Optional<Role> findByName(ERole name);

}