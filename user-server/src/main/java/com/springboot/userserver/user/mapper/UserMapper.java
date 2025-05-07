package com.springboot.userserver.user.mapper;

import com.springboot.userserver.user.entity.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 *  Mapper 接口
 *  1. 接口中所有方法都是public修饰
 *  2. 所有方法只有方法声明，没有方法实现，方法的实现在接口的实现类中实现
 * </p>
 *
 * @author sdx2009
 * @since 2025-05-06
 */
//@Mapper
public interface UserMapper extends BaseMapper<User> {

}
