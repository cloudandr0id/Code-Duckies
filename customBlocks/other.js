///////// STOP //////////////////////////////////////////////////////
Blockly.Blocks['stop'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("stop");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
   this.setTooltip("Block to stop the bot. Equivalent to any move with velocity and time 0.");
   this.setHelpUrl("");
    }
  };
  Blockly.JavaScript['stop'] = function(block) {
    var code =
    `
    var wheel_power = new ROSLIB.Message({
      header : {
        stamp : {
          sec : 0,
          nanosec : 0
        }
      },
      v: 0,
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


///////// DISTANCE DATA ///////////////////////////////////////////////////
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
    // Use var the TOF sensor is storing its data in
    var code =
    `
    __DISTANCE__
    `;

    // Return code and order
    return [code, Blockly.JavaScript.ORDER_NONE];
  };

///////// GET LEFT WHEEL ENCODER ///////////////////////////////////////////////////
Blockly.Blocks['getleftwheelencoder'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Left wheel encoder")
      this.setOutput(true, null);
      this.setColour(60);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  Blockly.JavaScript['getleftwheelencoder'] = function(block) {
    // Use var the left wheel encoder is storing its data in
    var code =
    `
    __LEFT_TICKS__
    `;

    // Return code and order
    return [code, Blockly.JavaScript.ORDER_NONE];
  };

///////// GET RIGHT WHEEL ENCODER ///////////////////////////////////////////////////
Blockly.Blocks['getrightwheelencoder'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Right wheel encoder")
      this.setOutput(true, null);
      this.setColour(60);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  Blockly.JavaScript['getrightwheelencoder'] = function(block) {
    // Use var the right wheel encoder is storing its data in
    var code =
    `
    __RIGHT_TICKS__
    `;

    // Return code and order
    return [code, Blockly.JavaScript.ORDER_NONE];
  };

///////// GET ENCODER AVERAGE ///////////////////////////////////////////////////
Blockly.Blocks['getencoderaverage'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Wheel encoder average")
      this.setOutput(true, null);
      this.setColour(60);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  Blockly.JavaScript['getencoderaverage'] = function(block) {
    // Use var the right wheel encoder is storing its data in
    var code =
    `
    Math.round((__LEFT_TICKS__ + __RIGHT_TICKS__)  / 2)
    `;

    // Return code and order
    return [code, Blockly.JavaScript.ORDER_NONE];
  };
