package com.springboot.userserver.user.service;

import com.springboot.userserver.user.dto.LoginUser;
import com.springboot.userserver.user.entity.User;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author sdx2009
 * @since 2025-05-06
 */
public interface UserService extends IService<User> {
    User login(LoginUser loginUser);
}
