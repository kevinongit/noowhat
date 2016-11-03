'use strict';


var phrases = [];


var fs = require('fs');
var mdb = require('moviedb')('ddd9d004006ade13c9d13b30909b8786');

mdb.searchPerson({"query":"Jesse Eisenberg"}, function(err,res) {
  if (err) {
    console.log('err : ' + err);
  }
  console.log(res);
});

function getPersonImage(name) {
  return new Promise((resolve, reject) => {
    const req = mdb.searchPerson({"query" : name}, function(err, res) {
      if (err) {
        console.log('err : ' + err);
        return 'notfound';
      }
      const imgname = res.results[0].profile_path;
      console.log('imgname : ' + imgname);
      const BASEURL = 'http://image.tmdb.org/t/p/';
      const SIZE = 'w45';
      const imgpath = BASEURL + SIZE + '/' + imgname;

      console.log('imagepath : ' + imgpath);
      resolve(imgpath);
    });
    // req.on('error', (err) => reject(err));
    // req.write(dataString);
    // req.end();
    console.log('444');
  });
}
  //   return new Promise((resolve, reject) => {
  //   const req = https.request(options, function(res) {
  //     res.setEncoding('utf-8');

  //     console.log('111');
  //     var responseString = '';
  //     if (res.statusCode < 200 || res.statusCode > 299) {
  //      reject(new Error('Failed to load page, status code: ' + res.statusCode));
  //     }

  //     res.on('data', function(data) {
  //       console.log('222');
  //       responseString += data;
  //     });

  //     res.on('end', function() {
  //       console.log('* OK End');

  //       var responseObject = JSON.parse(responseString);
  //       // console.log(util.inspect(responseObject, {showHidden: false, depth: null}));

  //       resolve(responseObject);
  //     });
  //   }); // end https.request
  //   console.log('333');
  //   req.on('error', (err) => reject(err));
  //   req.write(dataString);
  //   req.end();
  //   console.log('444');
  // });



function init() {
  const datafile = './moviequote.json';
  if (phrases.length === 0) {
    phrases = JSON.parse(fs.readFileSync(datafile, 'utf8'));
    console.log('init() - read from ' + datafile);
  }
}

function save(list) {
  const datafile = './moviequote.json';
  fs.writeFile(datafile, JSON.stringify(list, null, 2), 'utf-8');
  console.log('json file saved.');
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max-min)) + min;
}

function getRandomIntArray(min, max, n) {
  var list = [];
  const MAX_LOOP=100;
  for (var i=0, collected=0; i < MAX_LOOP; i++) {
    var num = getRandomInt(min, max);
    if (list.indexOf(num) < 0) {
      list[collected++] = num;
      if (collected === n) break;
    }
  }
  console.log('collected : ' + collected);
  return list;
}

function getRandomPhraseArray(indexes) {
  var list = [];
  console.log('indexes : ' + indexes);
  for (var i=0; i < indexes.length; i++) {
    list.push(phrases[indexes[i]]);
  }
  console.log('list.length : ' + list.length);
  return list;
}

function test() {
  init();
  console.log(phrases[1]);
  console.log('phrases.length : ' + phrases.length);
  console.log('random : ' + Math.random());
  console.log('random phrases index : ' + getRandomInt(0, phrases.length));
  const indexes = getRandomIntArray(0, phrases.length, 5);
  console.log('select n : ' + indexes);
  const plist = getRandomPhraseArray(indexes);
  console.log('plist.length = ' + plist.length);

  for (var i=0; i < plist.length; i++) {
    console.log(plist[i]);
  }
  
}

// test();

module.exports = {
  getMovieQuotes: function() {
    init();
    var plist = [];
    var list = getRandomPhraseArray(getRandomIntArray(0, phrases.length, 2));
    console.log('MovieQuotes(), list.length : ' + list.length);
    for (var i=0; i < list.length; i++) {
      console.log('+ name : ' + list[i].actor);
      plist[i] = getPersonImage(list[i].actor);
    }
    return new Promise(function(resolve, reject) {
      Promise.all(plist).then(function(vals) {
          console.log('# of promises : ' + plist.length);
          for (var i=0; i < list.length; i++) {
            console.log("  -- vals[" + i + "]  : " + vals[i]);
            list[i].profile_img = vals[i];
          }
          resolve(list);
        });
    });
  },

  addMovieQuotes: function(item) {
    init();

    phrases.push(item);
    console.log('addMovieQuotes() : return ');
    save(phrases);
    return true;
  }
};

