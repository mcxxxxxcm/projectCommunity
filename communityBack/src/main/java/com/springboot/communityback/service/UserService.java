package com.springboot.communityback.service;

import com.springboot.communityback.dto.LoginUser;
import com.springboot.communityback.entity.User;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author sdx2009
 * @since 2025-05-22
 */
public interface UserService extends IService<User> {
    User login(LoginUser loginUser);
}
