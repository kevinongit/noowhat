'use strict';

var querystring = require('querystring');
var https = require('https');


var apiKey = '03247e3243346fde40e43e8f337a6a3f';
var util = require('util');

function performRequest(host, endpoint, method, data, success) {
  var dataString = JSON.stringify(data);
  var headers = {};
  
  if (method === 'GET') {
    endpoint += '?' + querystring.stringify(data);
  }
  else {
    headers = {
      'Content-Type': 'application/json',
      'Content-Length': dataString.length
    };
  }
  var options = {
    host: host,
    path: endpoint,
    method: method,
    headers: headers
  };

  console.log('REQ : ' + host + endpoint);

  return new Promise((resolve, reject) => {
    const req = https.request(options, function(res) {
      res.setEncoding('utf-8');

      console.log('111');
      var responseString = '';
      if (res.statusCode < 200 || res.statusCode > 299) {
       reject(new Error('Failed to load page, status code: ' + res.statusCode));
      }

      res.on('data', function(data) {
        console.log('222');
        responseString += data;
      });

      res.on('end', function() {
        console.log('* OK End');

        var responseObject = JSON.parse(responseString);
        // console.log(util.inspect(responseObject, {showHidden: false, depth: null}));

        resolve(responseObject);
      });
    }); // end https.request
    console.log('333');
    req.on('error', (err) => reject(err));
    req.write(dataString);
    req.end();
    console.log('444');
  });
}

Date.prototype.yymmdd = function() {
  //var yr = this.getYear() - 100;
  var yr = this.getFullYear();
  var mm = this.getMonth() + 1;
  var dd = this.getDate()-1;

  console.log('year : ' + yr + ', mm : ' + mm + ', dd : ' + dd);

  return yr.toString() + (mm.toString().length === 2 ? mm : '0'+mm).toString() + (dd.toString().length === 2 ? dd : '0'+dd).toString();
  // return [yr, !mm[1] && '0', mm, !dd[1] && '0', dd].join('');
}

module.exports = {
  getDailyBoxOffice: function() {
    var host = 'www.kobis.or.kr';
    var today = new Date();
    console.log('today is ' + today.yymmdd());
    return performRequest(host, '/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json', 
      'GET', 
      {
        key : apiKey,
        targetDt : today.yymmdd()
      }, function(data) {
        console.log('Fetched ' + data);
        //prettify(data);
    });    
  },

  getMovieInfoByName: function (name) {
    var host = 'apis.daum.net';
    var daumKey = '1897b74982e1e8f01c2848ebe4a94cce';
    return performRequest(host, '/contents/movie', 
      'GET', 
      {
        apiKey : daumKey,
        q : name,
        output : 'json'
      }, function(data) {
        console.log('Fetched ' + data);
        prettify2(data);
    });
  },

  prettify: function(data) {
    var overall = data.boxOfficeResult;
    var list = overall.dailyBoxOfficeList;
    console.log("-------------------------");
    
    console.log("Title : " + overall.boxofficeType);
    console.log("Date : " + overall.showRange);
    
    for (var i=0; i < list.length; i++) {
      console.log(list[i].rank, list[i].movieNm);
    }

    console.log("-------------------------");
  },

  prettify2: function(data) {
    var channel = data.channel;
    console.log("-------------------------");
    
    console.log("+Title : " + channel.title);
    console.log("result : " + channel.result);
    console.log("query string : " + channel.q);

    var list = channel.item;
    
    for (var i=0; i < list.length; i++) {
      console.log("+Thumbnail : " + list[i].thumbnail[0].content);
      console.log("photo1 : " + list[i].photo1.content);      
      console.log("Story : " + list[i].story[0].content);

    }

    console.log("-------------------------");
  }

};

// getDailyBoxOffice();
// getMovieInfoByName('부산행');