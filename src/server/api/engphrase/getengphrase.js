'use strict';


var phrases = [];


var fs = require('fs');


function init() {
  const datafile = './engphrase.json';
  if (phrases.length === 0) {
    phrases = JSON.parse(fs.readFileSync(datafile, 'utf8'));
    console.log('init() - read from ' + datafile);
  }
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
  getEngPhrases: function() {
    init();
    var list = getRandomPhraseArray(getRandomIntArray(0, phrases.length, 5));
    console.log('getEngPhrases(), list.length : ' + list.length);
    return list;
  }
};

// getDailyBoxOffice();
// getMovieInfoByName('부산행');