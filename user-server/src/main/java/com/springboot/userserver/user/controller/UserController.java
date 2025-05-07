package com.springboot.userserver.user.controller;


import com.alibaba.fastjson.JSONObject;
import com.springboot.userserver.common.result.Result;
import com.springboot.userserver.user.dto.LoginUser;
import com.springboot.userserver.user.entity.User;
import com.springboot.userserver.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.View;

import javax.annotation.Resource;

/**
 * <p>
 *  前端控制器
 *  RestController: 1. 标记注解，在项目启动时扫描该注解，加载到IOC容器中
 *                  2. 返回的对象是json格式
 *  RequestMapping: 设置接口的url路径
 * </p>
 *
 * @author sdx2009
 * @since 2025-05-06
 */
@RestController
@RequestMapping("/user")
public class UserController {
    @Resource
    private UserService userService;
    @Autowired
    private View error;

    //  @RequestMapping(value = "/login", method = RequestMethod.POST)
    @PostMapping("/login")
    //RequestBody注解：只解析json数据格式，将json转换为对象，只在POST请求下使用
    public Result<?> login(@RequestBody LoginUser loginUser) {
        // 把接受的参数转发给service处理
        User user = userService.login(loginUser);

        // 把处理结果返回给前端
        if (ObjectUtils.isEmpty(user)) {
//            obj.put("code", 500);
//            obj.put("msg", "用户名或密码错误");
            return new Result<>().error("用户名或密码错误");
        } else {
//            obj.put("code", 200);
//            obj.put("msg", "登录成功");
            return new Result<>().success("登陆成功");
        }
    }
}
