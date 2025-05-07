package com.springboot.userserver.user.dto;

import lombok.Data;

@Data
public class QueryUser {
    /**
     * 页码（必须）
     * 每页显示的条数（必须）
     * 定义为Long类型：与mybatis-plus的@Page呼应，@Page里面类型是Long
     */
    private Long pageNumber;
    private Long pageSize;

    //条件查询字段（可选）。
    private String username;
}
