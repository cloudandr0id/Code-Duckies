/////////// MOVE BOT UNTIMED ///////////////////////////////////////////////////
Blockly.Blocks['movebotuntimed'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("move bot untimed");
      this.appendDummyInput()
          .appendField("Linear Velocity:")
          .appendField(new Blockly.FieldNumber(0, -.4, .4), "v")
          .appendField("Radial Velocity:")
          .appendField(new Blockly.FieldNumber(0, -8, 8), "omega");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
   this.setTooltip("Block to move and turn untimed. Equivalent to movebot with time 0");
   this.setHelpUrl("");
    }
  };

  Blockly.JavaScript['movebotuntimed'] = function(block) {
    // Get vars
    var v = block.getFieldValue('v');
    var omega = block.getFieldValue('omega');

    // Template code to send to bot
    var code =
    `
    var wheel_power = new ROSLIB.Message({
      header : {
        stamp : {
          sec : 0,
          nanosec : 0
        }
      },
      v: ` + v + `,
      omega: ` + omega + `
    });

    if (!isCanceled[myIdx])
    {
      cmdVel.publish(wheel_power);
    }
    else
    {
      return;
    }
    `;

    // return the code
    return code;
  };

///////// MOVE FORWARD UNTIMED ////////////////////////////////////////////////////
Blockly.Blocks['moveforwarduntimed'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("move forward untimed");
      this.appendDummyInput()
          .appendField("Forward Velocity:")
          .appendField(new Blockly.FieldNumber(0, 0, .4), "v");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
   this.setTooltip("Block to move bot forward untimed. Equivalent to move forward with time of 0");
   this.setHelpUrl("");
    }
  };
  Blockly.JavaScript['moveforwarduntimed'] = function(block) {
    var v = block.getFieldValue('v');

    var code =
    `
    var wheel_power = new ROSLIB.Message({
      header : {
        stamp : {
          sec : 0,
          nanosec : 0
        }
      },
      v: ` + v + `,
      omega: 0
    });

    if (!isCanceled[myIdx])
    {
      cmdVel.publish(wheel_power);
    }
    else
    {
      return;
    }
    `;

    // return the code
    return code;
  };

////////// MOVE BACKWARD UNTIMED //////////////////////////////////////////////////
Blockly.Blocks['movebackwarduntimed'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("move backward untimed");
    this.appendDummyInput()
        .appendField("Backward velocity:")
        .appendField(new Blockly.FieldNumber(0, 0, .4), "v");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
 this.setTooltip("Block to move bot backward untimed. Equivalent to move backward with time 0.");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['movebackwarduntimed'] = function(block) {
  var v = block.getFieldValue('v');

  var code =
  `
    var wheel_power = new ROSLIB.Message({
    header : {
      stamp : {
        sec : 0,
        nanosec : 0
      }
    },
    v : ` + -v + `,
    omega : 0
    });

    if (!isCanceled[myIdx])
    {
      cmdVel.publish(wheel_power);
    }
    else
    {
      return;
    }
    `;

    // return the code
  return code;
};

///////// TURN LEFT UNTIMED ///////////////////////////////////////////////////////
Blockly.Blocks['turnleftuntimed'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("turn left untimed");
      this.appendDummyInput()
          .appendField("Radial Velocity:")
          .appendField(new Blockly.FieldNumber(0, 0, 8), "omega");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
   this.setTooltip("Block to turn left untimed. Equivalent to turn left with time 0.");
   this.setHelpUrl("");
    }
  };
  Blockly.JavaScript['turnleftuntimed'] = function(block) {
    var omega = block.getFieldValue('omega');

    var code =
    `
      var wheel_power = new ROSLIB.Message({
      header : {
        stamp : {
          sec : 0,
          nanosec : 0
        }
      },
      v : 0,
      omega : ` + omega + `
      });

      if (!isCanceled[myIdx])
      {
        cmdVel.publish(wheel_power);
      }
      else
      {
        return;
      }
      `;

    // return the code
    return code;
  };

///////// TURN RIGHT UNTIMED //////////////////////////////////////////////////////
Blockly.Blocks['turnrightuntimed'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("turn right untimed");
      this.appendDummyInput()
          .appendField("Radial Velocity:")
          .appendField(new Blockly.FieldNumber(0, 0, 8), "omega");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
   this.setTooltip("Block to turn right untimed. Equivalent to turn right with time of 0");
   this.setHelpUrl("");
    }
  };
  Blockly.JavaScript['turnrightuntimed'] = function(block) {
    var omega = block.getFieldValue('omega');

    var code =
    `
      var wheel_power = new ROSLIB.Message({
      header : {
        stamp : {
          sec : 0,
          nanosec : 0
        }
      },
      v : 0,
      omega : ` + -omega + `
      });

      if (!isCanceled[myIdx])
      {
        cmdVel.publish(wheel_power);
      }
      else
      {
        return;
      }
      `;

    // return the code
    return code;
  };