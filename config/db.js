var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/myApp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, '连接错误：'))
db.once('open', (callback) => {
  console.log('MongoDB连接成功！！')
});

module.exports = mongoose;