(function() {

var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
var demoWorkspace = Blockly.inject(blocklyDiv,
    {media: '/media/',
     toolbox: document.getElementById('toolbox')});
var onresize = function(e) {
  // Compute the absolute coordinates and dimensions of blocklyArea.
  var element = blocklyArea;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  // Position blocklyDiv over blocklyArea.
  blocklyDiv.style.left = x + 'px';
  blocklyDiv.style.top = y + 'px';
  blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
  blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
  Blockly.svgResize(demoWorkspace);
};
window.addEventListener('resize', onresize, false);
onresize();
Blockly.svgResize(demoWorkspace);

})();
