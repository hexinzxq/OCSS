var express = require('express');

//引入course和student数据库模块
var Course = require('../models/course');
const student = require('../models/student');

//创建一个课程操作相关的路由
var cor = express.Router();

//当请求/courses/rebuild的时候查看重修类课程的数据页面
cor.get('/courses/rebuild',function(req,res){
    Course.find({"course_type":"重修课程"},function(err,courses){
        if(err){
            return res.status(500).send('Server error!');
        }
        res.render('otherCoursesType/rebuildCourses.html',{
            courses : courses,
            student : req.session.student
        })
    })
})

//当请求/courses/art时跳转到摄影艺术类课程数据页面
cor.get('/courses/art',function(req,res){
    Course.find({"course_type":"摄影艺术类"},function(err,courses){
        if(err){
            return res.status(500).send('Server error!')
        }
        res.render('getClassByType/artType.html',{
            courses:courses,
            student:req.session.student
        })
    })
})

//当请求/courses/computer时跳转到计算机类课程数据页面
cor.get('/courses/computer',function(req,res){
    Course.find({"course_type":"计算机类"},function(err,courses){
        if(err){
            return res.status(500).send('Server error!')
        }
        res.render('getClassByType/computerType.html',{
            courses:courses,
            student:req.session.student
        })
    })
})

//当请求/courses/knowledge时跳转到百科知识类课程数据页面
cor.get('/courses/knowledge',function(req,res){
    Course.find({"course_type":"百科知识类"},function(err,courses){
        if(err){
            return res.status(500).send('Server error!')
        }
        res.render('getClassByType/knowledgeType.html',{
            courses:courses,
            student:req.session.student
        })
    })
})

//当请求/courses/sport时跳转到体育运动类课程数据页面
cor.get('/courses/sport',function(req,res){
    Course.find({"course_type":"体育运动类"},function(err,courses){
        if(err){
            return res.status(500).send('Server error!')
        }
        res.render('getClassByType/sportType.html',{
            courses:courses,
            student:req.session.student
        })
    })
})

//当请求/courses/scient时跳转到科学技术类课程数据页面
cor.get('/courses/scient',function(req,res){
    Course.find({"course_type":"科学技术类"},function(err,courses){
        if(err){
            return res.status(500).send('Server error!')
        }
        res.render('getClassByType/scientType.html',{
            courses:courses,
            student:req.session.student
        })
    })
})

//当请求/courses/hua时跳到华老师的课程页面
cor.get('/courses/hua',function(req,res){
Course.find({course_teacher:{$regex:"^华"}},function(err,courses){
        if(err){
            return res.status(500).send('Server error!')
        }
        res.render('getClassByTeacherName/hua.html',{
            courses:courses,
            student:req.session.student
        })
    })
})
//当请求/courses/jia时跳到贾老师的课程页面
cor.get('/courses/jia',function(req,res){
    Course.find({course_teacher:{$regex:"^贾"}},function(err,courses){
            if(err){
                return res.status(500).send('Server error!')
            }
            res.render('getClassByTeacherName/jia.html',{
                courses:courses,
                student:req.session.student
            })
        })
    })
//当请求/courses/jiang时跳到江老师的课程页面
cor.get('/courses/jiang',function(req,res){
    Course.find({course_teacher:{$regex:"^江"}},function(err,courses){
            if(err){
                return res.status(500).send('Server error!')
            }
            res.render('getClassByTeacherName/jiang.html',{
                courses:courses,
                student:req.session.student
            })
        })
    })
//当请求/courses/li时跳到李老师的课程页面
cor.get('/courses/li',function(req,res){
    Course.find({course_teacher:{$regex:"^李"}},function(err,courses){
            if(err){
                return res.status(500).send('Server error!')
            }
            res.render('getClassByTeacherName/li.html',{
                courses:courses,
                student:req.session.student
            })
        })
    })
//当请求/courses/shan时跳到山老师的课程页面
cor.get('/courses/shan',function(req,res){
    Course.find({course_teacher:{$regex:"^山"}},function(err,courses){
            if(err){
                return res.status(500).send('Server error!')
            }
            res.render('getClassByTeacherName/shan.html',{
                courses:courses,
                student:req.session.student
            })
        })
    })
//当请求/courses/xiao时跳到晓老师的课程页面
cor.get('/courses/xiao',function(req,res){
    Course.find({course_teacher:{$regex:"^晓"}},function(err,courses){
            if(err){
                return res.status(500).send('Server error!')
            }
            res.render('getClassByTeacherName/xiao.html',{
                courses:courses,
                student:req.session.student
            })
        })
    })
//当请求/courses/yue时跳到月老师的课程页面
cor.get('/courses/yue',function(req,res){
    Course.find({course_teacher:{$regex:"^月"}},function(err,courses){
            if(err){
                return res.status(500).send('Server error!')
            }
            res.render('getClassByTeacherName/yue.html',{
                courses:courses,
                student:req.session.student
            })
        })
    })
//当请求/courses/zuo时跳到左老师的课程页面
cor.get('/courses/zuo',function(req,res){
    Course.find({course_teacher:{$regex:"^左"}},function(err,courses){
            if(err){
                return res.status(500).send('Server error!')
            }
            res.render('getClassByTeacherName/zuo.html',{
                courses:courses,
                student:req.session.student
            })
        })
    })

//当请求/recommen时跳转到推荐选课页面
cor.get('/recommend',function(req,res){
    Course.find({course_type:{$not:{$regex:"重修"}}},function(err,courses){
        if(err){
            return res.status(500).send('Server error!');
        }
        res.render('otherCoursesType/recommend.html',{
            courses : courses,
            student : req.session.student
        })
    })
})

//当请求/can的时候跳转到可选课程界面
cor.get('/can',function(req,res){
    Course.find(function(err,courses){
        if(err){
            return res.status(500).send('Server error!');
        }
        res.render('otherCoursesType/canChoice.html',{
            courses : courses,
            student : req.session.student
        })
    })
})


//向外暴露这个与课程类型查看操作相关的路由
module.exports = cor;