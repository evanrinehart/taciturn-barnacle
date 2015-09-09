/* local caching of availability data */

var db = {};
var rooms = null;

function dataPresentForDate(d){
  return db.hasOwnProperty(encodeDate(d));
}

function clearData(){
  db = {};
}

function withRooms(callback){
  if(rooms === null){
    setTimeout(function(){
      rooms = [
        {name: "Mardi Gras Study", color: 'mardi-gras-study', id: "ABCD1"},
        {name: "Jazz Music Parlor", color: 'jazz-music-parlor', id: "ABCD2"}
      ];
      callback(rooms);
    }, 1000);
  }
  else{
    callback(rooms);
  }
}

function fetchData(startDate, endDate, okCb, errorCb){
  setTimeout(function(){
    var results = {
      '2015-09-07': [],
      '2015-09-08': [],
      '2015-09-09': [],
      '2015-09-10': [],
      '2015-09-11': [],
      '2015-09-12': [],
      '2015-09-13': [],
      '2015-09-14': [],
      '2015-09-15': [
        {time: '21:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'XZXZ'},
        {time: '22:00:00', remaining: 6, room: 'Mardi Gras Study', id: 'XZXZ'},
        {time: '23:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'XZXZ'}
      ],
      '2015-09-16': [
        {time: '20:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'XZXZ'},
      ],
      '2015-09-17': [
        {time: '21:00:00', remaining: 6, room: 'Mardi Gras Study', id: 'XZXZ'},
        {time: '22:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'XZXZ'}
      ],
      '2015-09-18': [
        {time: '20:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'XZXZ'},
        {time: '21:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'XZXZ'}
      ],
      '2015-09-19': [
        {time: '21:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'XZXZ'},
        {time: '22:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'XZXZ'}
      ],
      '2015-09-20': [],
      '2015-09-21': [],
      '2015-09-22': [],
      '2015-09-23': [],
      '2015-09-24': [],
      '2015-09-25': [],
      '2015-09-26': [],
      '2015-09-27': []
    };

    for(var k in results){
      db[k] = results[k];
    }

    for(var d=startDate; d<=endDate; d=dateAdd(d,1)){
      if(!results.hasOwnProperty(encodeDate(d))){
        errorCb('Sorry, there was a problem fetching availability data. Please try again later.');
        return;
      }
    }

    okCb(results);
  }, 2000);
}

function withAvailabilities(startDate, endDate, callbacks){
  var d;
  var needFetch = false;
  for(d=startDate; d<=endDate; d=dateAdd(d,1)){
    if(!dataPresentForDate(d)){
      needFetch = true;
      break;
    }
  }

  if(needFetch){
    callbacks.fetching();
    fetchData(startDate, endDate, callbacks.fetchDone, callbacks.error);
  }
  else{
    callbacks.now(db);
  }
}
