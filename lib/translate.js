/**
 * Created by axetroy on 2017/3/11.
 */
const http = require('http');
const process = require('process');
const querystring = require('querystring');
const Promise = require('bluebird');

function translate(params) {
  let deferred = Promise.defer();
  params = {
    from: params.from || '',
    to: params.to || '',
    query: params.query || ''
  };
  let data = querystring.stringify(params);
  const options = {
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
    res.setEncoding('utf8');
    let responseStr = '';
    res.on('data', data => responseStr += data);
    res.on('end', function () {
      let response = {};
      let result = '';
      try {
        response = JSON.parse(responseStr);
        result = response.trans_result.data[0].dst;
      } catch (err) {

      }
      deferred.resolve(result);
    });
  });

  req.on('error', err => deferred.reject(err));

  req.write(data);

  req.end();
  return deferred.promise;
}

module.exports = translate;