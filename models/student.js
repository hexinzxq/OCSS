//引入mongoose模块
var mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://localhost/ocss',{useUnifiedTopology: true ,useNewUrlParser: true});

//创建数据库组织结构Schema
var Schema = mongoose.Schema;

//创建student关系模式
var studentSchema = new Schema({
    name:{
        type:String,
        required:true,
        default:'admin'
    },
    gender:{
        type:Number,
        enum:[-1,0,1],
        default:-1
    },
    age:{
        type:Number,
    },
    stuId:{
        type:Number,
        required:true,
        length:11
    },
    department:{
        type:String,
    },
    class:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:'/public/img/图书.png'
    },
    password:{
        type:String,
        required:true,
        default:'admin'
    },
    courseInfo:{
        type:String,
    },
    creatTime:{
        type:Date,
        default:Date.now
    }
});

//向外暴露出这个Student模块
module.exports = mongoose.model('Student',studentSchema);