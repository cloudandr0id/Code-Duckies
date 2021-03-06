(function() {

// global variables
var demoWorkspace;
var robotName = localStorage.getItem("robotName");
var projectNum = 0;
// We need this stripped name to get the topics on the bot
// NOTE: might be a better way to get bot name
var strippedRobotName = robotName.replace('.local', '');
var port = localStorage.getItem("port");

// make sure correct information was grabbed
console.log(robotName);
console.log(port);

// Setup ROS stuff
var ros = new ROSLIB.Ros({
  url : 'ws://' + robotName + ":" + port
});

ros.on('connection', function() {
  console.log('Connected to websocket server.');
});

ros.on('error', function(error) {
  console.log('Error connecting to websocket server: ', error);
  alert("Could not connect to " + robotName + " on port " + port + " more error data can be found in the console.");
});

ros.on('close', function() {
  console.log('Connection to websocket server closed.');
  alert('Connection to websocket server closed.');
});

// Publish wheel commands here
var cmdVel = new ROSLIB.Topic({
  ros : ros,
  name : '/' + strippedRobotName +'/car_cmd_switch_node/cmd',
  messageType : 'duckietown_msgs/Twist2DStamped'
});

// Quick stop
var quickStop = new ROSLIB.Topic({
  ros : ros,
  name : '/' + strippedRobotName +'/wheels_driver_node/emergency_stop',
  messageType : 'duckietown_msgs/BoolStamped'
});

// Subscribe to TOF sensor here
TOF_SENSOR = new ROSLIB.Topic({
  ros : ros,
  name : "/" + strippedRobotName + "/front_center_tof_driver_node/range",
  messageType : "sensor_msgs/Range"
});

TOF_SENSOR.subscribe(function(message) {
  __DISTANCE__ = message.range;
});

// Subscribe to left wheel encoder here
LEFT_WHEEL_ENCODER = new ROSLIB.Topic({
  ros : ros,
  name : "/" + strippedRobotName + "/left_wheel_encoder_node/tick",
  messageType : "duckietown_msgs/WheelEncoderStamped"
});

LEFT_WHEEL_ENCODER.subscribe(function(message) {
  __LEFT_TICKS__ = message.data;
});

// Subscribe to right wheel encoder here
RIGHT_WHEEL_ENCODER = new ROSLIB.Topic({
  ros : ros,
  name : "/" + strippedRobotName + "/right_wheel_encoder_node/tick",
  messageType : "duckietown_msgs/WheelEncoderStamped"
});

RIGHT_WHEEL_ENCODER.subscribe(function(message) {
  __RIGHT_TICKS__ = message.data;
});

// master function to create blockly page
function buildBlocklyWorkspace()
{
var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
demoWorkspace = Blockly.inject(blocklyDiv,
    {toolbox: document.getElementById('toolbox')});
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
}



/*
 * Name: exportBlocks
 * Algorithm: uses xml to download current project
 * Input/Parameters: probably needs to have blocks in the workspace already
 * Output: saves a file if possible
 * Notes: none
 */
function exportBlocks()
{
  try {
    // get blockly workspace
    var xml = Blockly.Xml.workspaceToDom(demoWorkspace);

    // convert to xml text file
    var xml_text = Blockly.Xml.domToText(xml);

    // create file
    var link = document.createElement('a');

    // download file
    link.download="project(" + projectNum + ").txt";

    // increase projectNum
    projectNum = projectNum + 1;


    link.href="data:application/octet-stream;utf-8," + encodeURIComponent(xml_text);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (e) {
    window.location.href="data:application/octet-stream;utf-8," + encodeURIComponent(xml_text);
    alert(e);
  }
}

/*
 * Name: getFile()
 * Algorithm: allows user to select a file
 * Precondition: buttons for import project has been clicked
 * Postcondition: User will be able to select file they wish to use
 */
function getFile() {
  // get the file
  document.getElementById("fileName").click()
}

/*
 * Name: importBlocksFile()
 * Algorithm: Takes the file and imports the data inside into a workspace
 *            Will only do this if there is data in the file
 * Precondition: buttons for import project has been clicked
 * Postcondition: Workspace has been reset to what project has been uploaded
 */
function importBlocksFile() {

  // file is selected, get it
  var file = document.getElementById("fileName").files[0];
  var xml;

  // read file if not empty
  if (file)
  {
    // create a new file reader
    var reader = new FileReader();

    // read the file as text
    reader.readAsText(file, 'utf-8');

    reader.onload = function (reading) {
      // put the result to a variable
      xml = reading.target.result;

      // log contents
      console.log(xml)
      try
      {
        // create new workspace
        var newWorkspace = Blockly.Xml.textToDom(xml);

        // check that user wants to clear workspace
        let clearResponse = prompt("Do you want to clear the workspace?");

        clearResponse = clearResponse.toLowerCase();

        if(clearResponse == "yes" || clearResponse == "y" || clearResponse == "yeah")
        {
          // clear existing workspace
          Blockly.mainWorkspace.clear();
        }

        // set new workspace as current one
        Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, newWorkspace);

      }
      catch (e)
      {
        alert("Invalid xml");
      }
    }
    reader.onerror = function (err) {
      console.log("error reading file");
    }
  }

  // Set the value to null. This will not trigger a reload of the program due to
  // if (file) above
  document.getElementById("fileName").value = null;
}


// Keep track of whether a given program was stopped or not, can keep track of
// last HISTORY_SIZE executions. 100 should be more than enough for the most
// part.
const HISTORY_SIZE = 100;

var currentIdx = 0;
var isCanceled = Array.apply(false, Array(HISTORY_SIZE)).map(function () { return false; });

function setCanceled()
{
  isCanceled[currentIdx] = true;
  currentIdx++;

  if (currentIdx == HISTORY_SIZE)
  {
    currentIdx = 0;
  }
}
// This is a lil hacky, but it gets the job done quick

/*
 * Name: startButtonLogic
 * Algorithm: Call functions needed to run Blockly blocks for Duckiebots
 * Input/Parameters: Blocks have been placed into work area
 * Output: Calls functions that run Duckiebots.
 * Notes: currently only shows an alert
 */
function startButtonLogic()
{
  // check that there is blocks in the workspace
  if(demoWorkspace.getAllBlocks(false).length != 0)
  {
    // show stop button and hide start button
    document.getElementById("stopbutton").classList.toggle("active");
    document.getElementById("startbutton").classList.toggle("active");

    // check for infinite loop. If we see one and we are not cancelled we await
    // a promise with a 0ms timeout. This seems to give enough time for the
    // system to update things like the distance measurement. Without this loop
    // trap something like
    // while (true)
    // {
    //   while ((__DISTANCE__) <= 0.3)
    //   {
    //     // Do something
    //   }
    // }
    // Just gets stuck in the outer while true loop if the inner loop condition
    // is ever false. With this loop trap that should basically work as expected
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP =
        `if (--window.LoopTrap <= 0 && !isCanceled[myIdx])
        {
          await new Promise(r => setTimeout(r, 0));
        }
        else if (isCanceled[myIdx])
        {
          return;
        } \n`;

    // turn workspace into JavaScript
    var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);

    // Wrap the returned code in boilerplate
    code = "(async () => {\nvar myIdx = " + currentIdx + "\n"
     + code + "\n" +
    `
    if (!isCanceled[myIdx])
    {
      stopButtonLogic();
    }
    })();`;

    // Log the generated code for debugging purposes
    console.log(code)

    // eval code
    try
    {
      isCanceled[currentIdx] = false;

      // Let the bot move again
      var start = new ROSLIB.Message(
      {
        header : {
          stamp : {
            sec : 0,
            nanosec : 0
          }
        },
        data : false
      });

      quickStop.publish(start);

      eval(code);
    }
    catch (e)
    {
      // Log the error for debugging purposes
      console.log(e);
      // Make sure we stop the bot before alerting just in case
      stopBotLogic();
      alert(e);
    }

  }
  else
  {
    // else assume that no blocks have been placed in the workspace
    // Also stop bot just in case
    stopBotLogic();

    // send alert to window that there should be development before the bot will run
    alert( "You haven't built blocks yet to run" );
  }

  // end function
}


/*
 * Name: stopButtonLogic
 * Algorithm: calls functions that stop bot and toggle buttons
 * Input/Parameters: none
 * Output: bot stopped and buttons toggled
 */
function stopButtonLogic()
{
  stopBotLogic();

  document.getElementById("stopbutton").classList.toggle("active");
  document.getElementById("startbutton").classList.toggle("active");
}

/*
 * Name: stopBotLogic
 * Algorithm: stops bot and cancels program
 * Input/Parameters: none
 * Output: bot is stopped
 */
function stopBotLogic()
{
  // Stop the bot. This actually prevents the bot from moving at all until it is
  // set to false. No matter what move commands the bot gets it will not move
  // while this is true
  var stop = new ROSLIB.Message(
  {
    header : {
      stamp : {
        sec : 0,
        nanosec : 0
      }
    },
    data : true
  });

  quickStop.publish(stop);

  // Cancel the command
  setCanceled();

  // Set bot velocity to 0
  var stopVel = new ROSLIB.Message(
  {
    header : {
      stamp : {
        sec : 0,
        nanosec : 0
      }
    },
    v : 0,
    omega : 0
  });

  cmdVel.publish(stopVel);
}

// when button clicked, simply clear blockly workspace
function newProjectLogic ()
{
  // check that user wants to clear workspace
  let clearResponse = prompt("Are you sure you want to clear your workspace?");

  clearResponse = clearResponse.toLowerCase();

  if(clearResponse == "yes" || clearResponse == "y" || clearResponse == "yeah")
  {
    // clear existing workspace
    Blockly.mainWorkspace.clear();
  }
  // else don't do anything

}

// run the main executables to build blockly workspace
buildBlocklyWorkspace();



// create aditional listener buttons for settings, start and stop
document.getElementById( 'startbutton' ).addEventListener( 'click', startButtonLogic );
// hide stop button until start is clicked
document.getElementById("stopbutton").classList.toggle("active");
document.getElementById( 'stopbutton' ).addEventListener( 'click', stopButtonLogic );
document.getElementById( 'saveBlocks' ).addEventListener( 'click', exportBlocks );
document.getElementById( 'importProject' ).addEventListener( 'click', getFile );
document.getElementById( 'newProject' ).addEventListener( 'click', newProjectLogic );
document.getElementById( 'fileName' ).addEventListener( 'change', importBlocksFile );
// creates listeners to resize the Blockly workspace if the window size changes
// window.addEventListener('resize', false);
Blockly.svgResize(demoWorkspace);


})();
