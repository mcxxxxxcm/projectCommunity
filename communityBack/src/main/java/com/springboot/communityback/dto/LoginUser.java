package com.springboot.communityback.dto;
import lombok.Data;

/**
 * Data注解：帮助自动生成get、set方法
 */
@Data
public class LoginUser {
    private String username;
    private String password;
}
