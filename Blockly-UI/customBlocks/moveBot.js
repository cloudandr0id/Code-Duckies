Blockly.Blocks['movebot'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Power percentage to:")
        .appendField("left wheel")
        .appendField(new Blockly.FieldNumber(0, -1, 1), "leftWheel")
        .appendField("and right wheel")
        .appendField(new Blockly.FieldNumber(0, -1, 1), "rightWheel");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(172);
 this.setTooltip("Block to provide power to each wheel");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['movebot'] = function(block) {
  var number_leftwheel = block.getFieldValue('leftWheel');
  var number_rightwheel = block.getFieldValue('rightWheel');
  // print out variables grabbed for debugging
  var code = number_leftwheel + ' ' + number_rightwheel;
  window.alert(code)
  // can add code here to send vars to bot

  // return the two vars
  return [code, JavaScript.ORDER_NONE];
};