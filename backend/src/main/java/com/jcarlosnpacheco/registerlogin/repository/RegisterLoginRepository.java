package com.jcarlosnpacheco.registerlogin.repository;

import java.util.List;

import com.jcarlosnpacheco.registerlogin.domain.RegisterLogin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RegisterLoginRepository extends JpaRepository<RegisterLogin, Integer> {

        @Query("SELECT rl FROM RegisterLogin rl WHERE rl.userId = :userId " +
                        " AND (lower(rl.loginName) LIKE lower(CONCAT('%',:loginName,'%')) " +
                        " OR lower(rl.observation) LIKE lower(CONCAT('%',:observation,'%')) )")
        List<RegisterLogin> findByUserIdAndLoginNameOrObservationIgnoreCase(
                        @Param("userId") long userId,
                        @Param("loginName") String loginName,
                        @Param("observation") String observation);

        List<RegisterLogin> findAllByUserId(long userId);
}
