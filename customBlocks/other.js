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
    // Use far the TOF sensor is storing its data in
    var code =
    `
    __DISTANCE__
    `;

    // Return code and order
    return [code, Blockly.JavaScript.ORDER_NONE];
  };