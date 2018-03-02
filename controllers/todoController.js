    // 处理 POST 请求库
var bodyParser = require('body-parser'),
    // 操作数据库
    mongoose = require('mongoose');

// 连接数据库 mlab.com
mongoose.connect('mongodb://mingtodo:mingtodo@ds253918.mlab.com:53918/todo');

// 定义数据模板类型
var todoSchema = new mongoose.Schema({
  item: String
});

// 创建 model 名为 todos
var Todo = mongoose.model('Todo', todoSchema);

// 处理表单内容 create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// 本地缓存数据
// var data = [{item: 'nihao'},{item: 'buhao'}];

module.exports = function(app, dots) {
  app.get('/todo', function(req, res) {
    // 从数据库中取出({}表示所有数据)数据
    Todo.find({}, function(err, data) {
      if (err) throw err;
      res.send(dots['todo']({data: data}));
    });
  });

  // 使用本地数据渲染
  // app.get('/todo', function(req, res) {
  //   res.send(dots['todo']({data: data}));
  // });

  // POST 请求
  app.post('/todo', urlencodedParser, function(req, res) {

    // 向数据库 Todo model 中保存一条数据
    var itemOne = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });

    // 向本地缓存数据添加
    // data.push(req.body);
    // res.json(data);
  });

  app.delete('/todo/:item', function(req, res) {
    // 删除数据库中的该条数据
    Todo.find({item: req.params.item.replace(/-/g, " ")}).remove(function(err, data) {
      if (err) throw err;
      res.json(data);
    });

    // 删除本地缓存数据
    // data = data.filter(function(todo) {
    //   return todo.item.replace(/ /g, "-") !== req.params.item;
    // });
    // res.json(data);

  });
};