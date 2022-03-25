/////////// MOVE BOT BLOCK ///////////////////////////////////////////////////
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
      this.setColour(60);
   this.setTooltip("Block to provide power to each wheel");
   this.setHelpUrl("");
    }
  };

  Blockly.JavaScript['movebot'] = function(block) {
    // Get vars
    var number_leftwheel = block.getFieldValue('leftWheel');
    var number_rightwheel = block.getFieldValue('rightWheel');
    var time = block.getFieldValue('time');

    // Template code to send to bot
    var code =
    `(() =>
     {
        var wheel_power = new ROSLIB.Message({
          header : {
            stamp : {
              sec : 0,
              nanosec : 0
            }
          },
          vel_left : ` + number_leftwheel + `,
          vel_right : ` + number_rightwheel + `
        });
      cmdVel.publish(wheel_power);

      sleep(1000 * ` + time +`);

      stopButtonLogic()
    })();\n`;

    // return the two vars
    return code;
  };

///////// MOVE FORWARD ////////////////////////////////////////////////////
Blockly.Blocks['moveforward'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("move forward");
      this.appendDummyInput()
          .appendField("power:")
          .appendField(new Blockly.FieldNumber(0, -1, 1), "power")
          .appendField("time:")
          .appendField(new Blockly.FieldNumber(0,0), "time");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
   this.setTooltip("Block to move bot forward");
   this.setHelpUrl("");
    }
  };
  Blockly.JavaScript['moveforward'] = function(block) {
    var number_power = block.getFieldValue('power');
    var number_time = block.getFieldValue('time');
    // TODO: Assemble JavaScript into code variable.
    var code =
    `(() => {var wheel_power = new ROSLIB.Message({
      data : [` + number_power  + `,` + number_power + `]
    });
    cmdVel.publish(number_power);

    sleep(1000 * ` + number_time +`);

    var stop = new ROSLIB.Message({
      data : [0,0]
    });
    cmdVel.publish(stop);})();\n`;

    // return the two vars
    return code;
  };

////////// MOVE BACKWARD //////////////////////////////////////////////////
Blockly.Blocks['movebackward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("move backward");
    this.appendDummyInput()
        .appendField("power:")
        .appendField(new Blockly.FieldNumber(0, -1, 1), "power")
        .appendField("time:")
        .appendField(new Blockly.FieldNumber(0,0), "time");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
 this.setTooltip("Block to move bot backward");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['movebackward'] = function(block) {
  var number_power = block.getFieldValue('power');
  var number_time = block.getFieldValue('time');
  // TODO: Assemble JavaScript into code variable.
  var code =
  `(() => {var wheel_power = new ROSLIB.Message({
      data : [` + (0 - number_power)  + `,` + (0 - number_power) + `]
    });
    cmdVel.publish(wheel_power);

    sleep(1000 * ` + number_time +`);

    var stop = new ROSLIB.Message({
      data : [0,0]
    });
    cmdVel.publish(stop);})();\n`;

    // return the two vars
  return code;
};

///////// TURN LEFT ///////////////////////////////////////////////////////
Blockly.Blocks['turnleft'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("turn left");
      this.appendDummyInput()
          .appendField("power:")
          .appendField(new Blockly.FieldNumber(0, -1, 1), "power")
          .appendField("time:")
          .appendField(new Blockly.FieldNumber(0,0), "time");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
   this.setTooltip("Block to turn left");
   this.setHelpUrl("");
    }
  };
  Blockly.JavaScript['turnleft'] = function(block) {
    var number_power = block.getFieldValue('power');
    var number_time = block.getFieldValue('time');
    // TODO: Assemble JavaScript into code variable.
    var code =
    `(() => {var wheel_power = new ROSLIB.Message({
      data : [` + (0 - number_power)  + `,` + number_power + `]
    });
    cmdVel.publish(wheel_power);

    sleep(1000 * ` + number_time +`);

    var stop = new ROSLIB.Message({
      data : [0,0]
    });
    cmdVel.publish(stop);})();\n`;

    // return the two vars
    return code;
  };

///////// TURN RIGHT //////////////////////////////////////////////////////
Blockly.Blocks['turnright'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("turn right");
      this.appendDummyInput()
          .appendField("power:")
          .appendField(new Blockly.FieldNumber(0, -1, 1), "power")
          .appendField("time:")
          .appendField(new Blockly.FieldNumber(0,0), "time");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
   this.setTooltip("Block to turn right");
   this.setHelpUrl("");
    }
  };
  Blockly.JavaScript['turnright'] = function(block) {
    var number_power = block.getFieldValue('power');
    var number_time = block.getFieldValue('time');
    // TODO: Assemble JavaScript into code variable.
    var code =
    `(() => {var wheel_power = new ROSLIB.Message({
      data : [` + number_power  + `,` + (0 - number_power) + `]
    });
    cmdVel.publish(wheel_power);

    sleep(1000 * ` + number_time +`);

    var stop = new ROSLIB.Message({
      data : [0,0]
    });
    cmdVel.publish(stop);})();\n`;

    // return the two vars
    return code;
  };

///////// DISTANCE DATA ///////////////////////////////////////////////////
Blockly.Blocks['getdistancedata'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("get distance data");
      this.setOutput(true, null);
      this.setColour(60);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  Blockly.JavaScript['getdistancedata'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = '\n';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };
