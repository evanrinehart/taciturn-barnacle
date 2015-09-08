var maxTicketCount = 7;
var targetColumnWidth = 160;

function filterWidget(fieldLabel, valueLabel, containerClass, buttonClass, icon){
  with(HTML){
    return span({class: 'filter-widget-group '+containerClass},
      (fieldLabel ? label(fieldLabel) : ''),
      span({class: 'filter-widget '+buttonClass},
        valueLabel,' ',
        i({class: 'icon fa fa-'+icon}
      ))
    );
  }
}

// generate or regenerate the widget from surrounding dimensions and state data
function bookingWidget(width, height, room, ticketCount, baseDate, rooms, availabilities){
  var widget;
  var columnCount = Math.floor(width / targetColumnWidth);
  var columnWidth = Math.floor((width - 50 - 50) / columnCount);
  var arrowWidth = (width - columnWidth*columnCount) / 2;
  var staticTitleHeight = 59;
  var staticFiltersHeight = 78;
  var staticHeadersHeight = 27;
  var listHeight = height - (staticTitleHeight + staticFiltersHeight + staticHeadersHeight + 10);

  with(HTML){

    var listHeading = table(tr(range(0, columnCount-1).map(function(i){
      var d = dateAdd(baseDate, i);
      var text = formatHeaderDate(d);
      return th({style: 'width: '+columnWidth+'px'}, text);
    })));

    var listBody = table({class: 'inner-table'}, tr(range(0, columnCount-1).map(function(i){
      var d = dateAdd(baseDate, i);
      var slots = availabilities.filter(function(slot){
        return slot.date == encodeDate(d);
      });
      var contents;
      if(slots.length > 0){
        contents = slots.map(function(slot){
          return div(
            {class: 'result slot '+roomColor(slot.room), 'data-id': slot.id},
            formatSlot(slot)
          )
        });
      }
      else{
        contents = div({class: 'result'}, "No matches for this date.");
      }
      return td({style: 'width: '+columnWidth+'px'}, contents);
    })));

    widget = element(
      div({class: 'booking-widget'},
        div({class: 'title'},
          h1({class: 'inline-block'}, "ESCAPE MY ROOM TICKETS"),
          a({class: 'modal-dismiss close-button'}, i({class: 'fa fa-close'}))
        ),
        div({class: 'filter-section'},
          div({class: 'filter-widget-container'}, filterWidget('', room, 'full-width', 'select-room full-width', 'chevron-down')),
          div(
            filterWidget('Tickets', ticketCount, 'cascading', 'select-ticket-count', 'chevron-down'),
            filterWidget('Date', formatDateForButton(baseDate), 'cascading', 'select-date', 'calendar')
          )
        ),
        div({class: 'clearfix'}),
        table({class: 'lower-section'},
          tr(
            td({class: "left-arrow"}, a({class: 'left-arrow arrow'}, '&lang;')),
            td(
              div({class: 'list-heading'}, listHeading),
              div({class: 'inner-container', style: 'height: '+listHeight+'px'}, listBody)
            ),
            td({class: "right-arrow"}, a({class: 'right-arrow arrow'}, '&rang;'))
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
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'Mardi Gras Study', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'Jazz Music Parlor', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'Other Room', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'Other Room', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'Other Room', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'Other Room', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'Other Room', id: 'XZXZ'},
    {date: '2015-09-17', time: '12:00:00', remaining: 6, room: 'Other Room', id: 'XZXZ'},
    {date: '2015-09-18', time: '12:00:00', remaining: 6, room: 'Mardi Gras Study', id: 'XZXZ'},
    {date: '2015-09-19', time: '12:00:00', remaining: 6, room: 'Other Room', id: 'XZXZ'},
    {date: '2015-09-20', time: '12:00:00', remaining: 6, room: 'Other Room', id: 'XZXZ'},
  ],
  rooms: [
    {id: 'IDZX', name: 'Mardi Gras Study', color: 'mardi-gras-study'},
    {id: 'IDXY', name: 'Jazz Music Parlor', color: 'jazz-music-parlor'}
  ],
  baseDate: new Date(2015, 8, 17)
};

function roomColor(room){
  var i;
  var L = state.rooms.length;
  for(i=0; i<L; i++){
    if(state.rooms[i].name == room) return state.rooms[i].color;
  }
  return 'color4';
}

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

var dayNames = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
var monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function formatHeaderDate(d){
  return [dayNames[d.getDay()], ' ', d.getMonth()+1, '/', d.getDate()];
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

function formatDateForButton(d){
  return monthNames[d.getMonth()+1] + ' ' + d.getDate();
}

function formatSlot(slot){
  var span = HTML.span;
  var color = roomColor(slot.room);
  return [
    span({class: 'time'}, formatTime(slot.time)), '<br>',
    slot.room,' ',
    span({class: 'remaining bg-'+color}, slot.remaining, ' tickets')
  ];
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
  return bookingWidget(panelW, panelH, "Any Room", 4, new Date(2015,8,17), state.rooms, state.availabilities);
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

$(window).on('resize', function(e){
  dismissAllModals();
});

$(document).on('click', '.booking-widget .slot', function(e){
  e.preventDefault();
  alert('slot clicked');
});

$(document).on('click', '.booking-widget .select-room', function(e){
  e.preventDefault();
});

$(document).on('click', '.booking-widget .select-ticket-count', function(e){
  e.preventDefault();
});

function calendarWidget(d){
  return function(panelW, panelH){
    with(HTML){
      return element(div({class: 'calendar-widget'},
        div({class: 'title'},
          h1({class: 'inline-block'}, "SELECT DATE"),
          a({class: 'modal-dismiss close-button'}, i({class: 'fa fa-close'}))
        ),
        div([div(d.toString()), div(1, 2, 3, 4, 5)])
      ));
    }
  }
}

$(document).on('click', '.booking-widget .select-date', function(e){
  e.preventDefault();
  summonModalPanel(calendarWidget(state.baseDate));
});
