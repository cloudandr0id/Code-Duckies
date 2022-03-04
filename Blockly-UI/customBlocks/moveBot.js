Blockly.Blocks['movebot'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Power percentage to:")
        .appendField("left wheel")
        .appendField(new Blockly.FieldNumber(0, -1, 1), "leftWheel")
        .appendField("and right wheel")
        .appendField(new Blockly.FieldNumber(0, -1, 1), "rightWheel")
        .appendField("Time:")
        .appendField(new Blockly.FieldNumber(0, 0), "time");
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
  var time = block.getFieldValue('time');
  // print out variables grabbed for debugging
  // var code = number_leftwheel + ' ' + number_rightwheel + ' ' + time;
  // window.alert(code)
  // can add code here to send vars to bot

  var code =
  `(async () => {var wheel_power = new ROSLIB.Message({
    data : [` + number_leftwheel  + `,` + number_rightwheel + `]
  });
  cmdVel.publish(wheel_power);

  await sleep(1000 * ` + time +`);

  var stop = new ROSLIB.Message({
    data : [0,0]
  });
  cmdVel.publish(stop);})()`

  // return the two vars
  return code;
};