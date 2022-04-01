package com.jcarlosnpacheco.registerlogin.services;

import com.jcarlosnpacheco.registerlogin.model.JwtResponseModel;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.HashSet;
import java.util.Set;
import com.jcarlosnpacheco.registerlogin.domain.Role;
import com.jcarlosnpacheco.registerlogin.domain.User;
import com.jcarlosnpacheco.registerlogin.domain.enums.ERole;

import com.jcarlosnpacheco.registerlogin.model.LoginRequestModel;
import com.jcarlosnpacheco.registerlogin.model.ResponseModel;
import com.jcarlosnpacheco.registerlogin.model.SignupRequestModel;
import com.jcarlosnpacheco.registerlogin.repository.RoleRepository;
import com.jcarlosnpacheco.registerlogin.repository.UserRepository;
import com.jcarlosnpacheco.registerlogin.security.JwtUtils;

@Service
public class AuthenticateService {

    private static final String ERROR_ROLE_IS_NOT_FOUND = "Error: Role is not found.";

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    public JwtResponseModel signin(LoginRequestModel loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        /*
         * UserDetailsImpl userDetails = (UserDetailsImpl)
         * authentication.getPrincipal();
         * List<String> roles = userDetails.getAuthorities().stream()
         * .map(item -> item.getAuthority())
         * .collect(Collectors.toList());
         * 
         * 
         * return new JwtResponseModel(jwt
         * ,
         * userDetails.getId(),
         * userDetails.getUsername(),
         * roles
         * );
         */

        return new JwtResponseModel(jwt);
    }

    public ResponseModel resetPass(LoginRequestModel loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException(
                        "User Not Found with username: " + loginRequest.getUsername()));

        user.setPassword(encoder.encode(loginRequest.getPassword()));

        userRepository.save(user);

        return new ResponseModel(true, "Pass reseted successfully!", null);
    }

    public ResponseModel registerUser(SignupRequestModel signUpRequest) {

        if (Boolean.TRUE.equals(userRepository.existsByUsername(signUpRequest.getUsername()))) {
            return new ResponseModel(false, "Error: Username is already taken!", null);
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER).orElse(new Role(ERole.ROLE_USER));
            // .orElseThrow(() -> new RuntimeException(ERROR_ROLE_IS_NOT_FOUND));
            roles.add(userRole);
            roleRepository.save(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException(ERROR_ROLE_IS_NOT_FOUND));
                        roles.add(adminRole);

                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException(ERROR_ROLE_IS_NOT_FOUND));
                        roles.add(modRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException(ERROR_ROLE_IS_NOT_FOUND));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return new ResponseModel(true, "User registered successfully!", null);
    }

}
