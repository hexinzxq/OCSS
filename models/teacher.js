//引入mongoose模块
var mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://localhost/ocss',{useUnifiedTopology: true ,useNewUrlParser: true});

//创建数据库组织结构Schema
var Schema = mongoose.Schema;

var teacherSchema = new Schema({
    teacher_name:{
        name:String,
        required:true
    },
    teacher_id:{
        type:Number,
        required:true
    },
    teacher_course:{
        type:String,
        required:true
    },
    teacher_age:{
        type:Number
    },
})

//向外暴露出这个Teacher模块
module.exports = mongoose.model('Teacher',teacherSchema);