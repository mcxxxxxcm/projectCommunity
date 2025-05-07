package com.springboot.userserver.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * Configuration：表示这是一个配置类，添加了之后springboot在启动时就会扫描到这个注解，并添加到IOC容器中
 * 允许跨域访问的配置类
 */
@Configuration
public class CorsConfig {
    /**
     * Bean：是IOC容器中的一个bean对象
     */
    @Bean
    //CorsFilter有两个同名对象，这里需要spring框架的，而不是apache的
    public CorsFilter corsFilter() {
        // 定义跨域访问策略对象
        CorsConfiguration conf = new CorsConfiguration();
        conf.addAllowedOrigin("*");// 表示允许哪些请求源进行跨域访问，*可能代表协议、ip或端口，允许所有请求源都进行跨域访问
        conf.addAllowedHeader("*");// 表示允许哪些请求头信息进行跨域访问，*表示所有头信息进行跨域访问
        conf.addAllowedMethod("*");// 表示允许哪些请求类型跨域访问：如post、get

        // 设置哪些url允许使用跨域策略
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", conf);//允许所有的url都可以使用以上策略

        // 返回corsFilter过滤器
        return new CorsFilter(source);
    }
}
