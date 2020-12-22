//引入express框架
var express = require('express');

//引入核心路径模块
var path = require('path');

//引入session模块
var session = require('express-session');

//引入登录注册的路由规则
var lrRouter = require('./routes/lrRouter');
//引入课程相关的路由规则
var courseRouter = require('./routes/courseRouter');
const cor = require('./routes/courseOperateRouter');
//引入增删改查路由规则
var crudRouter = require('./routes/crud')

//引入中间件
var bodyParser = require('body-parser',{useNewUrlParser:true});

//创建一个服务器
var app = express();

//开放静态资源
app.use('/public/',express.static(path.join(__dirname,'./public')));
app.use('/views/',express.static(path.join(__dirname,'./views')));
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules')));

//配置模板渲染引擎
app.engine('html',require('express-art-template'));

//配置中间件，解析表单请求体插件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//配置session
app.use(session({
    secret: 'itcast',
    resave: false,
    saveUninitialized: true
}))

//将登录和注册的路由挂载到app中
app.use(lrRouter);
//将与课程相关的路由挂载到app中
app.use(courseRouter);
//将与课程操作相关的路由挂载到app中
app.use(cor);
//将增删改查相关的路由挂载到app中
app.use(crudRouter);

//配置404处理中间件
app.use(function(req,res){
    res.render('404.html');
})

//配置全局错误处理中间件
app.use(function(err,req,res,next){
    res.status(500).send(err.message);
})

//监听一个端口号
app.listen(3000,function(){
    console.log('服务器已启动......');
})