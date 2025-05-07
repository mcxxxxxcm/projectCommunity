package com.springboot.userserver.user.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.ObjectUtils;// ObjectUtils导入mybatis-plus的包
import com.baomidou.mybatisplus.extension.kotlin.KtQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.springboot.userserver.user.dto.LoginUser;
import com.springboot.userserver.user.dto.QueryUser;
import com.springboot.userserver.user.entity.User;
import com.springboot.userserver.user.mapper.UserMapper;
import com.springboot.userserver.user.service.UserService;
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

    /**
     * 分页查询
     * 实现逻辑：
     * 1.把pageNumber和pageSize传给Page对象
     * 2.判断username是否为空，不为空则创建条件构造器，构造sql的筛选条件
     * 3.调用mybatis-plus提供的Page方法来实现分页查询
     *
     * @param queryUser
     * @return
     */
    @Override
    public Page<User> pageUser(QueryUser queryUser) {
        // 1.把pageNumber和pageSize传给Page对象
        Page<User> p = new Page<>(queryUser.getPageNumber(), queryUser.getPageSize());

        // 2.判断username是否为空，不为空则创建条件构造器，构造sql的筛选条件
        QueryWrapper<User> w = new QueryWrapper<>();
        if(!ObjectUtils.isEmpty(queryUser.getUsername())) {
            w.like("username", queryUser.getUsername());
        }

        // 3.调用mybatis-plus提供的Page方法来实现分页查询
        return this.page(p, w);
    }
}
