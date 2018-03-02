// 使用 doT 模板引擎
var dots = require('dot').process({
  path: './views'
});

var express        = require('express'),
    todoController = require('./controllers/todoController'),
    app            = express();


// 处理引用静态文件
app.use(express.static('./public'));

// todo Controller
todoController(app, dots);

// 监听端口
app.listen(3000);