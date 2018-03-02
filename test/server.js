var fs         = require('fs');
var express    = require('express');
var bodyParser = require('body-parser'); // 处理 POST 请求库
var multer     = require('multer'); // 上传文件库


// 模块化路由
var indexRouter = require('./routes/index'),
    usersRouter = require('./routes/users');

// 实例化 express
var app = express();

// 创建文件夹
var createFolder = function(folder) {
  try {
    fs.accessSync(folder);
  } catch (e) {
    fs.mkdirSync(folder);
  }
};

// 文件路径
var uploadFolder = './upload/';

createFolder(uploadFolder);

// 上传文件存储
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // 存储路径
    cb(null, uploadFolder);
  },
  filename: function(req, file, cb) {
    console.log(file.originalname)
    // 存储文件名
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

// 中间件函数，处理表单内容
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// 中间件函数，处理JSON格式
// create application/json parser
var jsonParser = bodyParser.json();

// 定义路由，取值 ?name=ming
// app.get('/', function(req, res) {
//   console.dir(req.query);
//   // send 可以处理纯文本和JSON
//   res.send('Hello World ' + req.query.name);
// });

// 定义路由，GET 请求，动态URL
app.get('/user/:id', function(req, res) {
  console.dir(req.params);
  // send 可以处理纯文本和JSON
  res.send('Hello World ' + req.params.id);
});

// 定义路由 POST 请求，处理表单数据
app.post('/login', urlencodedParser, function(req, res) {
  console.dir(req.body);
  res.send(req.body.name);
});

// 定义路由 POST 请求，处理JSON数据
app.post('/sign', jsonParser, function(req, res) {
  console.dir(req.body);
  res.send(req.body.name);
});

// 定义路由 POST 请求，上传图片，使用 Postman 调试时，去除 Headers 信息
app.post('/upload', upload.single('logo'), function(req, res) {
  console.dir(req.file);
  res.send({ 'ret_code': 0 });
});

// 定义路由 GET 请求，使用表单上传图片
app.get('/upload/form', upload.single('logo'), function(req, res) {
  // 读取文件流，同步，发送给浏览器
  // var form = fs.readFileSync('./upload.html', { encoding: "utf8" });
  // res.send(form);

  // 另一种方法
  res.sendFile(__dirname + '/upload.html');
});

// 使用中间件重构路由
app.use('/', indexRouter);
app.use('/users', usersRouter);


// 端口监听
app.listen(3000);