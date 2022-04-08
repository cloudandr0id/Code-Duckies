/////////// MOVE BOT BLOCK ///////////////////////////////////////////////////
Blockly.Blocks['movebot'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Linear Velocity:")
          .appendField(new Blockly.FieldNumber(0, -.4, .4), "v")
          .appendField("Angular Velocity:")
          .appendField(new Blockly.FieldNumber(0, -8, 8), "omega")
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
    var v = block.getFieldValue('v');
    var omega = block.getFieldValue('omega');
    var time = block.getFieldValue('time');

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
      await new Promise(r => setTimeout(r, 1000 * ` + time + `));
    }
    else
    {
      return;
    }
    `;

    // return the two vars
    return code;
  };

///////// MOVE FORWARD ////////////////////////////////////////////////////
Blockly.Blocks['moveforward'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("move forward");
      this.appendDummyInput()
          .appendField("Forward Velocity:")
          .appendField(new Blockly.FieldNumber(0, 0, .4), "v")
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
    var v = block.getFieldValue('v');
    var time = block.getFieldValue('time');
    // TODO: Assemble JavaScript into code variable.
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
      await new Promise(r => setTimeout(r, 1000 * ` + time + `));
    }
    else
    {
      return;
    }
    `;

    // return the two vars
    return code;
  };

////////// MOVE BACKWARD //////////////////////////////////////////////////
Blockly.Blocks['movebackward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("move backward");
    this.appendDummyInput()
        .appendField("Backward velocity:")
        .appendField(new Blockly.FieldNumber(0, 0, .4), "v")
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
  var v = block.getFieldValue('power');
  var time = block.getFieldValue('time');
  // TODO: Assemble JavaScript into code variable.
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
      await new Promise(r => setTimeout(r, 1000 * ` + time + `));
    }
    else
    {
      return;
    }
    `;

    // return the two vars
  return code;
};

///////// TURN LEFT ///////////////////////////////////////////////////////
Blockly.Blocks['turnleft'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("turn left");
      this.appendDummyInput()
          .appendField("Angular Velocity:")
          .appendField(new Blockly.FieldNumber(0, 0, 8), "omega")
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
    var omega = block.getFieldValue('omega');
    var time = block.getFieldValue('time');
    // TODO: Assemble JavaScript into code variable.
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
        await new Promise(r => setTimeout(r, 1000 * ` + time + `));
      }
      else
      {
        return;
      }
      `;

    // return the two vars
    return code;
  };

///////// TURN RIGHT //////////////////////////////////////////////////////
Blockly.Blocks['turnright'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("turn right");
      this.appendDummyInput()
          .appendField("Angular Velocity:")
          .appendField(new Blockly.FieldNumber(0, 0, 8), "omega")
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
    var omega = block.getFieldValue('power');
    var time = block.getFieldValue('time');
    // TODO: Assemble JavaScript into code variable.
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
        await new Promise(r => setTimeout(r, 1000 * ` + time + `));
      }
      else
      {
        return;
      }
      `;

    // return the two vars
    return code;
  };

///////// DISTANCE DATA ///////////////////////////////////////////////////
// Only use this block once per program
Blockly.Blocks['getdistancedata'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Distance")
      this.setOutput(true, null);
      this.setColour(60);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  Blockly.JavaScript['getdistancedata'] = function(block) {
    // Use far the TOF sensor is storing its data in
    var code =
    `
    __DISTANCE__
    `;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };
