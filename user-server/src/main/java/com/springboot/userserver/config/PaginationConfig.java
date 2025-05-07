package com.springboot.userserver.config;

import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 分页拦截器：拦截sql语句，为源sql语句拼接limit + pageNumber + pageSize
 */
@Configuration
public class PaginationConfig {
    @Bean
    public PaginationInterceptor paginationInterceptor() {
        return new PaginationInterceptor();
    }
}
