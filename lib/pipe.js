const process = require('process');
const translate = require('./translate');

// translate({
//   from: 'zh',
//   to: 'en',
//   query: 'Hello China'
// }, function (result) {
//   console.log(result); // 你好中国
// });

console.log(process.argv);

process.stdin.on('data', function (data) {
  console.log(data + '');
  translate({
    from: 'zh',
    to: 'en',
    query: data
  }, function (result) {
    console.log(result); // 你好中国
  });
});