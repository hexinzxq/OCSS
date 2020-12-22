//引入mongoose模块
var mongoose = require('mongoose');

//连接收据库
mongoose.connect('mongodb://localhost/ocss',{useUnifiedTopology: true ,useNewUrlParser: true});

//创建数据库组织结构
var Schema = mongoose.Schema;

//创建课程关系模式
var courseSchema = new Schema({
    course_name:{
        type:String,
        required:true
    },
    course_start_time:{
        type:String,
        required:true
    },
    course_study_time:{
        type:Number,
        required:true
    },
    course_teacher:{
        type:String,
        required:true
    },
    course_type:{
        type:String,
        required:true
    },
    course_describe:{
        type:String,
        required:true
    },
    course_credit:{
        type:Number,
        required:true
    },
    course_quota:{
        type:Number,
        required:true
    }
})

//直接导出模型构造函数
var Course = mongoose.model('Course',courseSchema)

// var course1 = new Course({
//     course_name:"《生活中的仪式感》",
//     course_start_time:"2020-12-20",
//     course_study_time:"64",
//     course_teacher:"晓琴",
//     course_type:"百科知识类",
//     course_describe:"生活也是需要仪式感的哟",
//     course_credit:"2.0",
//     course_quota:80
// })

// course1.save(function(err,ret){
//     if(err){
//         console.log('failed');
//     }else{
//         console.log('保存成功');
//     }
// })

//向外暴露出这个Course模块
module.exports = mongoose.model('Course',courseSchema);

