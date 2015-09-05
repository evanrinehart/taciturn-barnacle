var maxTicketCount = 7;
var targetColumnWidth = 250;

var dayNames = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

function formatHeaderDate(d){
  return [dayNames[d.getDay()], '<br>', d.getMonth()+1, '/', d.getDate()];
}

function formatTime(text){
  var parts = text.split(':');
  var minutes = parts[1];
  var hours = parts[0];
  var hoursInt = parseInt(hours);
  var ampm = hoursInt >= 12 ? 'PM' : 'AM';
  if(hoursInt > 12) hoursInt %= 12;
  return [hoursInt.toString(), ':', minutes, ' ', ampm];
}

function formatSlot(slot){
  return [
    formatTime(slot.time), '<br>',
    slot.room, '<br>',
    slot.remaining, ' spots left'
  ];
}

// generate or regenerate the widget from surrounding dimensions and state data
function bookingWidget(width, height, room, ticketCount, baseDate, rooms, availabilities){
  var widget;
  var columnCount = Math.floor(width / targetColumnWidth);
  var columnWidth = Math.floor((width - 50 - 50) / columnCount);
  var arrowWidth = (width - columnWidth*columnCount) / 2;
  var listHeight = height - (59 + 72 + 24);
  with(HTML){
    widget = element(
      div({class: 'booking-widget'},
        div({class: 'title'},
          h1({class: 'inline-block'}, "BOOKING"),
          a({class: 'modal-dismiss close-button'}, i({class: 'fa fa-close'}))
        ),
        div(
          div(
            label("Room"), 
            selectWithConfig({
              selected: room,
              attributes: {name: 'room'},
              options: [].concat(
                [{value: '', label: 'Any Room'}],
                rooms.map(function(r){ return {value: r.id, label: r.name}; })
              )
            })
          ),
          div(
            label("Tickets"),
            selectWithConfig({
              selected: ticketCount,
              attributes: {name: 'ticket-count'},
              options: [].concat(
                range(1, maxTicketCount).map(function(n){ return {value: n, label: n}; }),
                [{value: 'too-many', label: (maxTicketCount+1)+'+'}]
              )
            })
          ),
          div(label("Date"), input({name: 'date', value: baseDate}))
        ),
        table({class: 'lower-section'},
          tr(
            td({class: "left-arrow"}, a({class: 'left-arrow arrow fa fa-arrow-left'})),
            td(div({class: 'inner-container', style: 'height: '+listHeight+'px'}, table({class: 'inner-table'},
                tr(range(0, columnCount-1).map(function(i){
                    var d = dateAdd(baseDate, i);
                    var text = formatHeaderDate(d);
                    return th([text, div(text)]);
                  })),
                tr(range(0, columnCount-1).map(function(i){
                    var d = dateAdd(baseDate, i);
                    var slots = availabilities.filter(function(slot){
                      return slot.date == encodeDate(d);
                    });
                    return td(
                      slots.map(function(slot){
                        return div(
                          {class: 'slot', 'data-id': slot.id},
                          formatSlot(slot)
                        )
                      })
                    );
                  }))))),
            td({class: "right-arrow"}, a({class: 'right-arrow arrow fa fa-arrow-right'}))
          )
        )
      )
    );
  }
  return widget;
}

var state = {
  availabilities: [
    {date: '2015-09-15', time: '10:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'XZXZ'},
    {date: '2015-09-15', time: '11:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'XZXZ'},
    {date: '2015-09-16', time: '10:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'Mardi Gras Study', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'Mardi Gras Study', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'B', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'Mardi Gras Study', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'B', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'B', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'B', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'B', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'B', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'B', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'B', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'B', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'B', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'B', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'B', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'B', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'B', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'B', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'B', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'B', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'B', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'B', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'B', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'B', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'B', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'B', id: 'XZXZ'},
    {date: '2015-09-18', time: '12:00:00', remaining: 6, room: 'Mardi Gras Study', id: 'XZXZ'},
    {date: '2015-09-19', time: '12:00:00', remaining: 6, room: 'B', id: 'XZXZ'},
    {date: '2015-09-20', time: '12:00:00', remaining: 6, room: 'B', id: 'XZXZ'},
  ],
  rooms: [
    {id: 'IDZX', name: 'Mardi Gras Study'},
    {id: 'IDXY', name: 'Jazz Music Parlor'}
  ]
};

function range(a, b){
  var r = [];
  var i;
  for(i=a; i<=b; i++){
    r.push(i);
  }
  return r;
}

function replicate(x, n){
  var r = [];
  var i;
  for(i=0; i<n; i++){
    r.push(x);
  }
  return r;
}

function zipWith(as, bs, f){
  var i;
  var L = as.length;
  var r = [];
  for(i=0; i<L; i++){
    r.push(f(as[i], bs[i]));
  }
  return r;
}

function dateToday(){
  var now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function dateAdd(d, n){
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()+n);
}

function readDate(text){
  var parts = text.split('-');
  var year = parseInt(parts[0]);
  var month = parseInt(parts[1]);
  var day = parseInt(parts[2]);
  return new Date(year, month-1, day);
}

function encodeDate(d){
  function pad(x){
    if(x.length < 2) return '0'+x;
    else return x;
  }

  return [
    d.getFullYear(),
    pad((d.getMonth()+1).toString()),
    pad(d.getDate().toString())
  ].join('-');
}

function trace(value){
  console.log('TRACE', value); 
  return value;
}



function example(panelW, panelH){
  return bookingWidget(panelW, panelH, "", 4, new Date(2015,8,17), state.rooms, state.availabilities);
}


$(document).on('click', '#buy-tickets', function(e){
  e.preventDefault(); 
  summonModalPanel(example);
});

$(document).on('click', '.modal-dismiss', function(e){
  e.preventDefault();
  dismissModalPanel();
});

$(document).on('click', '.modal-overlay', function(e){
  dismissModalPanel();
});

$(document).on('click', '.booking-widget .left-arrow', function(e){
  e.preventDefault();
  console.log('left arrow');
});

$(document).on('click', '.booking-widget .right-arrow', function(e){
  e.preventDefault();
  console.log('right arrow');
});
