package com.jcarlosnpacheco.registerlogin.services;

import java.util.List;

import javax.validation.Valid;

import com.jcarlosnpacheco.registerlogin.domain.RegisterLogin;
import com.jcarlosnpacheco.registerlogin.model.RegisterLoginPostBodyModel;
import com.jcarlosnpacheco.registerlogin.model.RegisterLoginPutBodyModel;
import com.jcarlosnpacheco.registerlogin.model.ResponseModel;
import com.jcarlosnpacheco.registerlogin.repository.RegisterLoginRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.security.crypto.encrypt.TextEncryptor;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.server.ResponseStatusException;

@Service
@Validated
public class RegisterLoginService {
    @Value("${jcarlosnpacheco.app.jwtSecret}")
    private String jwtSecret;

    @Value("${jcarlosnpacheco.app.salt}")
    private String salt;

    private final RegisterLoginRepository registerLoginRepository;

    public RegisterLoginService(RegisterLoginRepository registerLoginRepository) {
        this.registerLoginRepository = registerLoginRepository;
    }

    public List<RegisterLogin> listAll(long userId) {
        List<RegisterLogin> result = registerLoginRepository.findAllByUserId(userId);

        /*
         * TextEncryptor encryptor = Encryptors.text(jwtSecret, salt);
         * 
         * for (RegisterLogin item : result) {
         * item.setPassword(encryptor.decrypt(item.getPassword()));
         * }
         */

        return result;
    }

    public RegisterLogin findById(Integer id) {

        // TextEncryptor encryptor = Encryptors.text(jwtSecret, salt);

        RegisterLogin result = registerLoginRepository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Register Not Found"));

        // result.setPassword(encryptor.decrypt(result.getPassword()));
        return result;

    }

    public List<RegisterLogin> findByLoginName(Long userId, String loginName, String observation) {

        List<RegisterLogin> result = registerLoginRepository
                .findByUserIdAndLoginNameOrObservationIgnoreCase(userId, loginName, observation);

        /*
         * TextEncryptor encryptor = Encryptors.text(jwtSecret, salt);
         * 
         * for (RegisterLogin item : result) {
         * item.setPassword(encryptor.decrypt(item.getPassword()));
         * }
         */

        return result;

    }

    public ResponseModel delete(Integer id) {
        registerLoginRepository.delete(findById(id));
        return new ResponseModel(true, "Deleted with success!", null);
    }

    public ResponseModel create(RegisterLoginPostBodyModel registerLoginPostBody) {

        // TextEncryptor encryptor = Encryptors.text(jwtSecret, salt);

        // registerLoginPostBody.setPassword(encryptor.encrypt(registerLoginPostBody.getPassword()));

        RegisterLogin register = new RegisterLogin();

        register.setLoginName(registerLoginPostBody.getLoginName());
        register.setPassword(registerLoginPostBody.getPassword());
        register.setObservation(registerLoginPostBody.getObservation());
        register.setUserId(registerLoginPostBody.getUserId());

        registerLoginRepository.saveAndFlush(register);

        register.setPassword("");

        if (register.getId() > 0) {
            return new ResponseModel(true, "Created with success!", register);
        } else {
            return new ResponseModel(false, "Fail on create!", register);
        }

    }

    // @Transactional // if the service need transaction, use this annotation
    public ResponseModel update(@Valid RegisterLoginPutBodyModel registerLoginPutBody) {
        RegisterLogin savedRegisterLogin = findById(registerLoginPutBody.getId());

        RegisterLogin register = new RegisterLogin();
        TextEncryptor encryptor = Encryptors.text(jwtSecret, salt);

        register.setId(savedRegisterLogin.getId());
        register.setLoginName(registerLoginPutBody.getLoginName());
        register.setPassword(encryptor.encrypt(registerLoginPutBody.getPassword()));
        register.setObservation(registerLoginPutBody.getObservation());
        register.setUserId(registerLoginPutBody.getUserId());

        RegisterLogin registerUpdated = registerLoginRepository.saveAndFlush(register);

        registerUpdated.setPassword("");

        if (registerUpdated.getId() > 0) {
            return new ResponseModel(true, "Updated with success!", registerUpdated);
        } else {
            return new ResponseModel(false, "Fail on update!", registerUpdated);
        }
    }

}
