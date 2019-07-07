const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
let session = require('express-session');
const formidable = require('express-formidable');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
//session配置
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
//处理post参数
app.use(formidable({
    //文件上传目录
    uploadDir: path.join(__dirname, 'public', 'uploads'),
    //最大上传文件为2M
    maxFileSize: 2 * 1024 * 1024,
    //保留文件后缀名
    keepExtensions: true
}));
//连接数据库
mongoose.connect('mongodb://itcast:itcast@localhost:27017/alibaixiu', {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'));

require('./routes')(app);

app.listen(3000);
console.log('服务器启动成功');
//require('./genComments.js');