/* local caching of availability data */

var db = {};
var rooms = null;

function dataPresentForDate(d){
  return db.hasOwnProperty(encodeDate(d));
}

function clearData(){
  db = {};
  rooms = null;
}

function withRooms(callback){
  if(rooms === null){
    setTimeout(function(){
      rooms = [
        {name: "Mardi Gras Study", id: "ABCD1"},
        {name: "Jazz Music Parlor", id: "ABCD2"}
      ];
      callback(rooms);
    }, 100);
  }
  else{
    callback(rooms);
  }
}

function fetchData(startDate, endDate, okCb, errorCb){
  setTimeout(function(){
    var results = {
      '2015-09-15': [
        {time: '21:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'ABCD2'},
        {time: '22:00:00', remaining: 6, room: 'Mardi Gras Study', id: 'ABCD1'},
        {time: '23:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'ABCD2'}
      ],
      '2015-09-16': [
        {time: '20:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'ABCD2'},
      ],
      '2015-09-17': [
        {time: '21:00:00', remaining: 6, room: 'Mardi Gras Study', id: 'ABCD1'},
        {time: '22:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'ABCD2'},
        {time: '18:00:00', remaining: 6, room: 'Mardi Gras Study', id: 'ABCD1'},
        {time: '18:00:00', remaining: 6, room: 'Mardi Gras Study', id: 'ABCD1'},
        {time: '19:00:00', remaining: 6, room: 'Mardi Gras Study', id: 'ABCD1'},
        {time: '19:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'ABCD2'},
        {time: '20:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'ABCD2'},
        {time: '20:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'ABCD2'}
      ],
      '2015-09-18': [
        {time: '20:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'ABCD2'},
        {time: '21:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'ABCD2'}
      ],
      '2015-09-19': [
        {time: '21:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'ABCD2'},
        {time: '22:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'ABCD2'}
      ]
    };

    for(var d=startDate; d<=endDate; d=dateAdd(d,1)){
      if(!results.hasOwnProperty(encodeDate(d))){
        results[encodeDate(d)] = [];
      }
    }

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
  }, 700);
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
    fetchData(dateAdd(startDate,-10), dateAdd(endDate,10), callbacks.fetchDone, callbacks.error);
  }
  else{
    callbacks.now(db);
  }
}
