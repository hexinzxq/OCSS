//引入mongoose模块
var mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://localhost/ocss',{useUnifiedTopology: true ,useNewUrlParser: true});

//创建数据库组织结构Schema
var Schema = mongoose.Schema;

var adminSchema = new Schema({
    adminName:{
        type:String,
        required:true
    },
    adminId:{
        type:String,
        required:true,
        default:'admin'
    },
    adminCourse:{
        type:String,
        required:true
    },
    adminAge:{
        type:Number
    },
    adminPassword:{
        type:String,
        required:true,
        default:'admin'
    },
})

// 直接导出模型构造函数
// var Admin = mongoose.model('Admin',adminSchema)
// var admin1 = new Admin({
//     adminName:'左晓琴',
//     adminId:'admin',
//     adminCourse:'生活',
//     adminAge:'22',
//     adminPassword:'admin'
// })

// admin1.save(function(err,ret){
//     if(err){
//         console.log('failed');
//     }else{
//         console.log('保存成功');
//     }
// })

//向外暴露出这个admin模块
module.exports = mongoose.model('Admin',adminSchema);