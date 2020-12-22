//增删改查课程路由

//引入express框架
var express = require('express');

var fs = require('fs')

//引入course和student数据库模块
var Course = require('../models/course');
const student = require('../models/student');

//创建一个增删改查课程相关的路由
var crudRouter = express.Router();

//当请求/courses/add的时候渲染新增课程的页面
crudRouter.get('/courses/add',function(req,res){
    res.render('CRUDCourses/add.html',{
        student : req.session.student
    });
})

//处理表单提交的新增课程的数据,添加进数据库中
crudRouter.post('/courses/add',function(req,res){
    new Course(req.body).save(function(err){
        if(err){
            return res.status(500).send('server error!');
        }
        res.redirect('/courses')
    })
})

//渲染编辑学生页面/courses/edit
crudRouter.get('/courses/edit',function(req,res){
    Course.findById(req.query,function(err,courses){
        if(err){
            return res.status(500).send(req.query)
        }
        res.render('CRUDCourses/edit.html',{
            courses : courses
        })
    })
})


//向外暴露这个与增删改查相关的路由
module.exports = crudRouter;