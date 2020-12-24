var express = require('express')

var Student = require('../models/student')

var studentRouter = express.Router()

// 当请求/student时渲染学生信息页面
studentRouter.get('/student',(req,res)=>{
   Student.find((err,student)=>{
       if(err){
           return res.status(500).send('server error')
       }
       res.render('studentInfo/viewstudent.html',{
           student : student,
           admin : req.session.admin
       })
   }) 
})

module.exports = studentRouter