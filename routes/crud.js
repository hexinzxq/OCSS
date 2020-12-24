//增删改查课程路由

//引入express框架
var express = require('express');

var fs = require('fs')

//引入course和student数据库模块
var Course = require('../models/course');
const Student = require('../models/student');

//创建一个增删改查课程相关的路由
var crudRouter = express.Router();

//当请求/courses/add的时候渲染新增课程的页面
crudRouter.get('/courses/add',function(req,res){
    res.render('CRUDCourses/add.html',{
        admin : req.session.admin
    });
})

//处理表单提交的新增课程的数据,添加进数据库中
crudRouter.post('/courses/add',function(req,res){
    new Course(req.body).save(function(err){
        if(err){
            return res.status(500).send('server error!');
        }
        res.redirect('/admincourses')
    })
})

//渲染编辑学生页面/courses/edit
crudRouter.get('/courses/edit',function(req,res){
    res.render('CRUDCourses/edit.html',{
        admin : req.session.admin
    })
})

//处理删除课程的操作
crudRouter.get('/courses/delete',function(req,res){
    // var id =req.query
    // console.log(req.query);
    Course.deleteOne({course_name:req.query.course_name},function(err){
        if(err){
            // return res.status(500).send('server err')  
            console.log(err);     
        }
        res.redirect('/admincourses')
    })
})




//向外暴露这个与增删改查相关的路由
module.exports = crudRouter;