

var modalStack = [];
var level = 10;

function probeHeight(content){
  var probe = $('<div class="custom-dialog modal-probe" style="visibility: hidden"></div>');
  probe.append(content);
  $('body').append(probe);
  var contentW = probe.width();
  var contentH = probe.height();
  probe.remove();
  return {
    width: contentW,
    height: contentH
  };
}

function summonDialog(content){
  var screenH = $(window).height(); 
  var contentH = probeHeight(content).height;
  var overlay = $('<div class="modal-overlay"></div>');
  var panel = $('<div class="custom-dialog"></div>');
  var offset = contentH > screenH ? 0 : Math.floor(screenH/2 - contentH/2);
  modalStack.push(overlay);
  panel.append(content);
  level++;
  overlay.css('z-index', level);
  level++;
  panel.css('z-index', level);
  panel.css('margin-top', offset+'px');
  overlay.append(panel);
  $('body').append(overlay);
}

function summonFullScreenModal(gui){
  var screenW = $(window).width(); 
  var screenH = $(window).height(); 
  var overlay = $('<div class="modal-overlay"></div>');
  var panel = $('<div class="custom-fullscreen"></div>');
  modalStack.push(overlay);
  panel.append(gui(screenW, screenH));
  level++;
  overlay.css('z-index', level);
  level++;
  panel.css('z-index', level);
  panel.css('width', screenW+'px');
  //panel.css('height', screenH+'px');
  overlay.append(panel);
  $('body').append(overlay);
}

function summonModalPanel(gui){
  var screenW = $(window).width(); 
  var screenH = $(window).height(); 
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
  //modalStack.push(panel);
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
//  level++;
//  panel.css('z-index', level);
  overlay.append(panel);
  $('body').append(overlay);
//  $('body').append(panel);
}

function dismissModalPanel(){
//  var panel = modalStack.pop();
  var overlay = modalStack.pop();
//  panel.remove();
  overlay.remove();
  level--;
  level--;
}

function dismissAllModals(){
  while(modalStack.length > 0){
    dismissModalPanel();
  }
}
