package com.springboot.userserver.common.result;

import lombok.Data;

/**
 * 链式编程：方法返回的数据类型是该类本身
 * 调用：new Result().success().put().error()
 * @param <T>
 */
@Data
public class Result<T> {
    private Integer code;//不适用int类型，防止初始化code为0，而Integer初始化是null
    private String msg;
    private T data;

    public Result<T> success(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
        return this;
    }

    public Result<T> success(String msg) {
        return success(200, msg);
    }

    public Result<T> success() {
        return success("操作成功");
    }

    public Result<T> put(T data) {
        this.data = data;
        return this;
    }

    public Result<T> error(String msg) {
        return success(500, msg);
    }

    public Result<T> error() {
        return error("操作失败");
    }
}
