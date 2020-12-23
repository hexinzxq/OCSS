//这个是登录和注册相关的路由

//引入express框架
var express = require('express');

// 引入admin数据库模块
var Admin = require('../models/admin');

//导入加密模块
var md5 = require('blueimp-md5');


//创建一个登录注册路由
var adminLRouters = express.Router();

//渲染管理员登陆页面
adminLRouters.get('/adminLogin',function(req,res){
    res.render('adminLogin.html');
})

//渲染管理员登陆页面
adminLRouters.get('/adminRegister',function(req,res){
    res.render('adminRegister.html');
})

//此处处理管理员登录请求
adminLRouters.post('/adminLogin',function(req,res){
    //获取表单
    var body = req.body;
    //查询输入的用户名和密码是否正确，并且发送响应数据
    Admin.findOne({
        adminId:body.adminId,
        adminPassword:body.adminPassword=md5(md5(md5(md5(body.password))))
    },function(err,admin) {
        if(err){
            return res.status(500).json({
                err_code : 500,
                message:err.message
            })
        }
        if(!admin){
            return res.status(200).json({
                err_code:1,
                message:'admin_id or password is invalid'
            })
        }

        //否则则是存在这个管理员用户，登录成功，并且通过session记录登录状态
        req.session.admin = admin;
        return res.status(200).json({
            err_code:0,
            message:'OK'
        })
    })

})

//设置管理员注册服务
adminLRouters.post('/adminRegister',function(req,res){
    //获取表单的请求体的数据
    var body = req.body;
    //操作数据库（判断是否已经存在用户，存在则提示注册失败）
    Admin.findOne({adminId:body.adminId},function(err,data) {
        if(err){
            return res.status(500).json({
                err_code:0,
                message:'服务器出错了~~~'
            })
        }
        if(data){
            //此时是账号已存在
            return res.status(200).json({
                err_code:1,
                message:'该账号已经注册了~~~'
            })
        }

        //此处要使用md5对用户的密码进行加密
        body.adminPassword=md5(md5(md5(md5(body.password))));

        //上述错误未发生，保存该条管理员数据
        new Admin(body).save(function(err,admin){
            if(err){
                return res.status(500).json({
                    err_code:500,
                    message:'Internet error!'
                })
            }

            //注册成功，使用Session记录用户登陆状态
            req.session.admin = admin;

            //该方法接受一个对象作为参数。他会自动将对象转换为字符串再发送给浏览器
            res.status(200).json({
                err_code : 0 ,
                message:'OK'
            })
        })
    })
})

//点击退出时的响应
adminLRouters.get('/adminLogout',function(req,res){
    //清除登录状态并返回到登陆页面
    req.session.admin = null;
    res.redirect('/admincourses');
})

//向外暴露路由
module.exports = adminLRouters