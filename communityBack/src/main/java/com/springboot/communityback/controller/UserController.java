package com.springboot.communityback.controller;


import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.springboot.communityback.common.result.Result;
import com.springboot.communityback.dto.LoginUser;
import com.springboot.communityback.entity.User;
import com.springboot.communityback.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.View;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author sdx2009
 * @since 2025-05-22
 */
@RestController
@RequestMapping("/user")
public class UserController {
    @Resource
    private com.springboot.communityback.service.UserService userService;
    @Autowired
    private View error;

    //  @RequestMapping(value = "/login", method = RequestMethod.POST)
    @PostMapping("/login")
    //RequestBody注解：只解析json数据格式，将json转换为对象，只在POST请求下使用
    public Result<?> login(@RequestBody LoginUser loginUser) {
        // 把接收的参数转发给service处理
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
