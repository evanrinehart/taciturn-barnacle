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
    $.ajax({
      url: "https://booking.escapemyroom.com/api/rooms",
      success: function(data){
        rooms = data;
        callback(rooms);
      },
      error: function(xhr){
        console.log(xhr);
        callback([]);
      }
    });
  }
  else{
    callback(rooms);
  }
}

function fetchData(startDate, endDate, okCb, errorCb){
  var crashMsg = 'Sorry, there was a problem fetching availability data. Please try again later.';
  $.ajax({
    method: 'get',
    url: "https://booking.escapemyroom.com/api/availability",
    data: {
      start_date: encodeDate(startDate),
      end_date: encodeDate(endDate)
    },
    success: function(results){
      if(jstype(results) != 'Object'){
        errorCb(crashMsg);
        return;
      }

      for(var k in results){
        db[k] = results[k];
      }

      for(var d=startDate; d<=endDate; d=dateAdd(d,1)){
        if(!results.hasOwnProperty(encodeDate(d))){
          console.log('result is missing one of the days requested');
          errorCb(crashMsg);
          return;
        }
      }

      okCb(db);
    },
    error: function(xhr){
      console.log(xhr);
      errorCb(crashMsg);
    }
  });
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

  if(needFetch || rooms==null){
    callbacks.fetching();
  }

  withRooms(function(rooms){
    if(needFetch){
      fetchData(
        dateAdd(startDate,-10),
        dateAdd(endDate,10),
        function(results){ callbacks.fetchDone(rooms, results); },
        callbacks.error
      );
    }
    else{
      callbacks.now(rooms, db);
    }
  });
}

function fetchPrice(room_id, ticket_count, callbacks){
  $.ajax({
    url: "https://booking.escapemyroom.com/api/pricing",
    data: {
      room_id: room_id,
      ticket_count: ticket_count
    },
    success: function(data){
console.log(data);
      if(data.ok){
        callbacks.ok(data.ok);
      }
      else{
        callbacks.error();
      }
    },
    error: function(xhr){
      callbacks.error();
    }
  });
}
