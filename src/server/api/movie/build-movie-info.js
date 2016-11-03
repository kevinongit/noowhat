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

  getRemoteMovieInfo: function() {
    var bmi = require('./build-movie-info');
    var p = [];
    return new Promise((resolve, reject) => {
      bmi.getDailyBoxOffice()
      .then(function(data) {

        var theMovieList = getFirstList(data);
        console.log('----theMovieList.movies.length' + theMovieList.movies.length);
        for (var i=0; i < theMovieList.movies.length; i++) {
          console.log('++');
          p[i] = bmi.getMovieInfoByName(theMovieList.movies[i].name);
        }

        Promise.all(p).then(data => {

            // console.log('**data.length = ' + data.length);
            // console.log('**themovielist = ' + JSON.stringify(theMovieList));
            for(var i=0; i < data.length; i++) {
              theMovieList.movies[i] = getSecondList(theMovieList.movies[i], data[i]);
            }
            // console.log('*theMovieList : ' + JSON.stringify(theMovieList));
            resolve(theMovieList);
          });

      });
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

var getFirstList = function(data) {
  const overall = data.boxOfficeResult;
  const list = overall.dailyBoxOfficeList;
  var firstList = {}, movies = [];
  console.log("-1-----------------------");

  firstList.type = overall.boxofficeType;
  firstList.date = overall.showRange;

  console.log("Title : " + overall.boxofficeType);
  console.log("Date : " + overall.showRange);

  for (var i=0; i < list.length; i++) {
    var movie={};
    movie.rank = list[i].rank;
    movie.name = list[i].movieNm;
    movies.push(movie);
    console.log(list[i].rank, list[i].movieNm);
  }
  firstList.movies = movies;
  console.log("-----------------------1-");
  return firstList;
}

var getSecondList = function(first, data) {
  var movie = first;
  var channel = data.channel;
  console.log("--2----------------------");

  console.log("+Title : " + channel.title);
  console.log("result : " + channel.result);
  console.log("query string : " + channel.q);

  var item = channel.item[0];


  console.log("+Thumbnail : " + item.thumbnail[0].content);
  console.log("photo1 : " + item.photo1.content);      
  console.log("Story : " + item.story[0].content);

  movie.thumbnail = item.thumbnail[0].content;
  movie.title = item.title;
  movie.photo = [item.photo1.content, item.photo2.content, item.photo3.content, item.photo4.content, item.photo5.content];
  movie.engName = item.eng_title[0].content;
  movie.year = item.year[0].content;
  movie.story = item.story[0].content;
  movie.openDay = item.open_info[0].content;
  movie.genre = item.genre;
  movie.actor = item.actor;
  movie.director = item.director;
  movie.video = item.video;
  movie.trailer = item.trailer;
  
  // console.log('movie: ' + JSON.stringify(movie));

  console.log("----------------------2-");
  return movie;
}


var client = function() {
  var bmi = require('./build-movie-info');
  var theMovieList = {};
  var fs=require('fs');
  var filename = './boxoffice.json';
  
  bmi.getRemoteMovieInfo()
  .then(function(list) {
    //console.log('+++++++++++++++++++++list = ' + JSON.stringify(list));
    console.log('aaaaaaaaaaaaaaaa');
    fs.writeFile(filename, JSON.stringify(list), function (err) {
      if (err) { console.log('error : ' + err);}
      console.log('file created : ' + filename);
    });
    console.log('bbbbbbbbbbbbbb');
  });
}

//client();

