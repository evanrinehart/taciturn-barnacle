

var modalStack = [];
var noSlots = [];

var panelPadding = 20;

function summonModalPanel(gui){
  var screenW = $(document).width(); 
  var screenH = $(document).height(); 
  var panelW = screenW - 2*panelPadding;
  var panelH = screenH - 2*panelPadding;
  var overlay = $('<div class="modal-overlay"></div>');
  var panel = $('<div class="modal-panel"></div>');
  modalStack.push(overlay);
  modalStack.push(panel);
  panel.css('width', panelW);
  panel.css('height', panelH);
  panel.css('left', panelPadding);
  panel.css('top', panelPadding);
  panel.append(gui(panelW, panelH));
  $('body').append(overlay);
  $('body').append(panel);
}

function dismissModalPanel(){
  var panel = modalStack.pop();
  var overlay = modalStack.pop();
  panel.remove();
  overlay.remove();
}

