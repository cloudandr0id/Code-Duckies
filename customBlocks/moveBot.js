Blockly.Blocks['movebot'] = {
  init: function() {
    this.appendValueInput("leftWheel")
        .setCheck("Number");
    this.appendValueInput("rightWheel")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(172);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};