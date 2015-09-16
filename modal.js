

var modalStack = [];
var level = 10;

function summonFullScreenModalPanel(gui){
  var screenW = $(document).width(); 
  var screenH = $(document).height(); 
  var overlay = $('<div class="modal-overlay"></div>');
  var panel = $('<div class="custom-modal modal-panel"></div>');
  modalStack.push(overlay);
  modalStack.push(panel);
  panel.css('width', screenW);
  panel.css('height', screenH);
  panel.css('left', 0);
  panel.css('top', 0);
  panel.append(gui('expand', screenW, screenH));
  level++;
  overlay.css('z-index', level);
  level++;
  panel.css('z-index', level);
  $('body').append(overlay);
  $('body').append(panel);
}

function summonModalPanel(gui){
  var screenW = $(document).width(); 
  var screenH = $(document).height(); 
  var firstTry = gui('small');
  var probe = $('<div class="custom-modal modal-panel modal-probe" style="visibility: hidden"></div>');
  $('body').append(probe);
  probe.append(firstTry);
  var contentW = probe.width();
  var contentH = probe.height();
  probe.remove();
  var overlay = $('<div class="modal-overlay"></div>');
  var panel = $('<div class="custom-modal modal-panel"></div>');
  modalStack.push(overlay);
  modalStack.push(panel);
  if(contentW > screenW){
    panel.css('width', screenW);
    panel.css('height', screenH);
    panel.css('left', 0);
    panel.css('top', 0);
    panel.append(gui('large', screenW, screenH));
  }
  else if(contentH > screenH){
    panel.css('width', contentW);
    panel.css('height', screenH-1);
    panel.css('left', Math.floor(screenW/2 - contentW/2));
    panel.css('top', 0);
    panel.css('overflow-y', 'scroll');
    panel.css('overflow-x', 'hidden');
    panel.append(firstTry);
  }
  else{
    panel.css('width', contentW);
    //panel.css('height', contentH);
    panel.css('left', Math.floor(screenW/2 - contentW/2));
    panel.css('top', Math.floor(screenH/2 - contentH/2));
    panel.append(firstTry);
  }
  level++;
  overlay.css('z-index', level);
  level++;
  panel.css('z-index', level);
  $('body').append(overlay);
  $('body').append(panel);
}

function dismissModalPanel(){
  var panel = modalStack.pop();
  var overlay = modalStack.pop();
  panel.remove();
  overlay.remove();
  level--;
  level--;
}

function dismissAllModals(){
  while(modalStack.length > 0){
    dismissModalPanel();
  }
}
