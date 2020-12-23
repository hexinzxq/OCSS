//这个是与课程主页相关的路由

//引入express框架
var express = require('express');

//引入course和student数据库模块
var Course = require('../models/course');
// const student = require('../models/student');

//创建一个课程相关的路由
var courseRouter = express.Router();

//显示主页以及所有的待选课程
courseRouter.get('/courses',function(req,res){
    Course.find(function(err,courses){
        if(err){
            return res.status(500).send('Server error!');
        }
        res.render('index.html',{
            courses : courses,
            student : req.session.student
        })
    })
})

// 显示管理员主页
courseRouter.get('/admincourses',function(req,res){
    Course.find(function(err,courses){
        if(err){
            return res.status(500).send('Server error!');
        }
        res.render('index_admin.html',{
            courses : courses,
            admin : req.session.admin
        })
    })
})

//向外暴露这个与课程相关的路由
module.exports = courseRouter;