package com.springboot.communityback.mapper;

import com.springboot.communityback.entity.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author sdx2009
 * @since 2025-05-22
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {

}
