/**
 * Created by axetroy on 2017/3/11.
 */
let http = require('http');
let querystring = require('querystring');
function translate(params, callback) {

  if (typeof params === 'string') {
    params = {
      query: params
    };
  }

  params = {
    from: params.from || 'zh',
    to: params.to || 'en',
    query: params.query || ''
  };

  let data = querystring.stringify(params);
  options = {
    host: 'fanyi.baidu.com',
    port: 80,
    path: '/v2transapi',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length
    }
  };

  let req = http.request(options, function (res) {
    let result = '';

    res.setEncoding('utf8');
    res.on('data', function (data) {
      result += data;
    });
    res.on('end', function () {
      let obj = JSON.parse(result),
        str = obj.trans_result.data[0].dst;

      callback(str);
    });
  });

  req.on('error', function (err) {
    console.log(err);
    setTimeout(function () {
      translation(query, callback);
    }, 3000);
  });

  req.write(data);
  req.end();
}

module.exports = translate;