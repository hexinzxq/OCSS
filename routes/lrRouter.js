//这个是登录和注册相关的路由

//引入express框架
var express = require('express');

//引入student数据库模块
var Student = require('../models/student');

//导入加密模块
var md5 = require('blueimp-md5');

//引入文件操作核心模块
var fs = require('fs');

//创建一个登录注册路由
var lrRouter = express.Router();

//渲染主页
// lrRouter.get('/',function(req,res){
//     res.render('index.html',{
//         //登陆过后通过session显示登录状态
//         student : req.session.student
//     });
// })

//渲染登陆页面
lrRouter.get('/login',function(req,res){
    res.render('login.html');
})

//此处处理登录请求
lrRouter.post('/login',function(req,res){
    //获取表单
    var body = req.body;
    //查询输入的用户名和密码是否正确，并且发送响应数据
    Student.findOne({
        stuId:body.stuId,
        password:body.password=md5(md5(md5(md5(body.password))))
    },function(err,student) {
        if(err){
            return res.status(500).json({
                err_code : 500,
                message:err.message
            })
        }
        if(!student){
            return res.status(200).json({
                err_code:1,
                message:'studentid or password is invalid'
            })
        }

        //否则则是存在这个用户，登录成功，并且通过session记录登录状态
        req.session.student = student;
        return res.status(200).json({
            err_code:0,
            message:'OK'
        })
    })

})

//渲染注册页面
lrRouter.get('/register',function(req,res){
    res.render('register.html');
})

//设置注册服务
lrRouter.post('/register',function(req,res){
    //获取表单的请求体的数据
    var body = req.body;
    //操作数据库（判断是否已经存在用户，存在则提示注册失败）
    Student.findOne({stuId:body.stuId},function(err,data) {
        if(err){
            return res.status(500).json({
                err_code:0,
                message:'服务器出错了~~~'
            })
        }
        if(data){
            //此时是学号已存在
            return res.status(200).json({
                err_code:1,
                message:'该学号已经注册了~~~'
            })
        }

        //此处要使用md5对用户的密码进行加密
        body.password=md5(md5(md5(md5(body.password))));

        //上述错误未发生，保存该条学生数据
        new Student(body).save(function(err,student){
            if(err){
                return res.status(500).json({
                    err_code:500,
                    message:'Internet error!'
                })
            }

            //注册成功，使用Session记录用户登陆状态
            req.session.student = student;

            //该方法接受一个对象作为参数。他会自动将对象转换为字符串再发送给浏览器
            res.status(200).json({
                err_code : 0 ,
                message:'OK'
            })
        })
    })
})

//点击退出时的响应
lrRouter.get('/logout',function(req,res){
    //清除登录状态并返回到登陆页面
    req.session.student = null;
    res.redirect('/courses');
})

//异步处理添加待选课程[此处有问题]
// router.get('/server',function(req,res){
//      //设置响应头,设置允许跨域
//      res.header('Access-Control-Allow-Origin', "*");
//      res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Authorization,Accept,X-Requested-With');
//      res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
//      res.header('X-Powered-By', '3.2.1')
//      //设置响应体
//      res.send(fs.readFile('/public/data/CourseChoice.html','utf8',function(err,data){
//          if(!err){
//             if (err) {
//                 return callback(err);
//             }
//             console.log(data);
//          }
//      }));
// })



//向外暴露路由
module.exports = lrRouter