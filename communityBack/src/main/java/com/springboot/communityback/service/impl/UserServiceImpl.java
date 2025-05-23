package com.springboot.communityback.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.ObjectUtils;// ObjectUtils导入mybatis-plus的包
import com.baomidou.mybatisplus.extension.kotlin.KtQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.springboot.communityback.dto.LoginUser;
import com.springboot.communityback.entity.User;
import com.springboot.communityback.mapper.UserMapper;
import com.springboot.communityback.service.UserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
//import org.springframework.util.ObjectUtils;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author sdx2009
 * @since 2025-05-06
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    /**
     * 把用户名和密码发给数据库进行验证
     *
     * @param loginUser
     * @return
     */
    @Override
    public User login(LoginUser loginUser) {

        // sql: select* from user where username=? and password=?
        // 单表操作时，可以使用条件构造器构造sql语句
        QueryWrapper<User> w = new QueryWrapper<>();
        w.eq("username", loginUser.getUsername());
        // 相当于sql的where username=？
        // 两个eq的方法组合，默认以and连接
        w.eq("password", loginUser.getPassword());
        // 相当于sql的where password=？

        // 查询
        // getOne()：从数据表中查询一条数据，如果数据表返回多个数据则抛出异常
        return this.getOne(w);
    }
}