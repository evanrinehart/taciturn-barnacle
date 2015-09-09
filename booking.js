var maxTicketCount = 7;
var targetColumnWidth = 160;

var state = {
  baseDate: new Date(2015, 8, 17),
  room: undefined,
  ticketCount: 1
};

function computeDynamicColumnCount(width){
  return Math.floor(width / targetColumnWidth);
}

function filterWidget(fieldLabel, valueLabel, containerClass, buttonClass, icon){
  with(HTML){
    return span({class: 'filter-widget-group '+containerClass},
      (fieldLabel ? label(fieldLabel) : ''),
      span({class: 'filter-widget '+buttonClass},
        valueLabel,' ',
        span("▼")
      )
    );
  }
}



// generate or regenerate the widget from surrounding dimensions and state data
function bookingWidget(width, height, room, ticketCount, baseDate, rooms, availabilities, loading){
  var widget;
  var columnCount = computeDynamicColumnCount(width);
  var columnWidth = Math.floor((width - 50 - 50) / columnCount);
  var arrowWidth = (width - columnWidth*columnCount) / 2;
  var staticTitleHeight = 28;
  var staticFiltersHeight = 42;
  var staticHeadersHeight = 27;
  var listHeight = height - (staticTitleHeight + staticFiltersHeight + staticHeadersHeight + 10);

  with(HTML){

    return element(
      div({class: 'booking-widget'},
        div({class: 'title'},
          h1({class: 'inline-block'}, "BUY TICKETS"),
          a({class: 'modal-dismiss close-button'}, i({class: 'fa fa-close'}))
        ),
        div({class: 'filter-section'},
          div(
            filterWidget('', (room||'Any Room'), 'cascading', 'select-room', 'chevron-down'),
            filterWidget('Tickets', ticketCount, 'cascading', 'select-ticket-count', 'chevron-down')
          )
        ),
        div({class: 'clearfix'}),
        table({class: 'lower-section'},
          loading ?
            tr({class: 'loading'}, td(), td(i({class: 'fa fa-spinner fa-pulse'}), " LOADING"), td()) :
            tr(
              td({class: "left-arrow"}, a({class: 'left-arrow arrow'}, '&lang;')),
              td(
                div({class: 'list-heading'},
                  table(tr(range(0, columnCount-1).map(function(i){
                    var d = dateAdd(baseDate, i);
                    var text = formatHeaderDate(d);
                    return th({style: 'width: '+columnWidth+'px'}, text);
                  })))
                ),
                div({class: 'inner-container', style: 'height: '+listHeight+'px'},
                  table({class: 'inner-table'}, tr(range(0, columnCount-1).map(function(i){
                    var d = dateAdd(baseDate, i);
                    var slots = availabilities[encodeDate(d)];
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
                  })))
                )
              ),
              td({class: "right-arrow"}, a({class: 'right-arrow arrow'}, '&rang;'))
            )
        )
      )
    );
  }
}

function roomColor(room){
  switch(room){
    case 'Mardi Gras Study': return 'mardi-gras-study';
    case 'Jazz Music Parlor': return 'jazz-music-parlor';
    default: return 'color4';
  }
}

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

$(document).on('click', '#buy-tickets', function(e){
  e.preventDefault(); 
  reloadBookingUI();
});

$(document).on('click', '.modal-dismiss', function(e){
  e.preventDefault();
  dismissModalPanel();
});

$(document).on('click', '.modal-overlay', function(e){
  dismissModalPanel();
});

$(document).on('click', '.booking-widget a.left-arrow', function(e){
  e.preventDefault();
  state.baseDate = dateAdd(state.baseDate, -1);
  reloadBookingUI();
});

$(document).on('click', '.booking-widget a.right-arrow', function(e){
  e.preventDefault();
  state.baseDate = dateAdd(state.baseDate, 1);
  reloadBookingUI();
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

/* use this to open the panel or reload it after something has changed */
function reloadBookingUI(){
console.log('RELOAD');
  var baseDate = state.baseDate;
  var width = $(window).width();
  var columns = computeDynamicColumnCount(width);
  var tickets = state.ticketCount;
  var room = state.room;
  dismissAllModals();
  withAvailabilities(baseDate, dateAdd(baseDate, columns), {
    now: function(availabilities){
      withRooms(function(rooms){
        summonModalPanel(function(panelW, panelH){
          return bookingWidget(panelW, panelH, room, tickets, baseDate, rooms, availabilities);
        });
      });
    },
    fetching: function(){
      withRooms(function(rooms){
        summonModalPanel(function(panelW, panelH){
          return bookingWidget(panelW, panelH, room, tickets, baseDate, rooms, {}, 'loading');
        });
      });
    },
    fetchDone: function(){
      reloadBookingUI();
    },
    error: function(message){
      state.baseDate = dateToday();
      state.tickets = 1;
      clearData();
      dismissAllModals();
      console.log(message);
      with(HTML){
        summonModalPanel(function(){
          return element(div({class: 'booking-widget error-popup'},
            p(encode(message)),
            div(a({class: 'modal-dismiss'}, 'OK'))
          ));
        });
      }
    }
  });
}

