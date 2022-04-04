(function() {



  // global variables
var demoWorkspace;
var robotName = localStorage.getItem("robotName");
var port = localStorage.getItem("port");

console.log(robotName);
console.log(port);

// Setup ROS stuff
// old ip: 192.168.62.214
var ros = new ROSLIB.Ros({
  url : 'ws://' + robotName + ":" + port
});

ros.on('connection', function() {
  console.log('Connected to websocket server.');
});

ros.on('error', function(error) {
  console.log('Error connecting to websocket server: ', error);
});

ros.on('close', function() {
  console.log('Connection to websocket server closed.');
});

// Publishing a Topic
// ------------------

var cmdVel = new ROSLIB.Topic({
  ros : ros,
  name : '/Rogelio/wheels_driver_node/wheels_cmd',
  messageType : 'duckietown_msgs/WheelsCmdStamped'
});


// master function to create blockly page
function buildBlocklyWorkspace()
{
var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
demoWorkspace = Blockly.inject(blocklyDiv,
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
    var xml = Blockly.Xml.workspaceToDom(demoWorkspace);
    var xml_text = Blockly.Xml.domToText(xml);
    var link = document.createElement('a');
    link.download="project.txt";
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

        // clear existing workspace
        Blockly.mainWorkspace.clear();

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
}



// Used by blocks
function sleep(milliseconds)
{
    var date = new Date();
    var curDate = null;
    do
    {
      curDate = new Date();
    }
    while(curDate - date < milliseconds);
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
  // initialize function/variables
  var tiresPealing = new Audio( 'sounds/Tires.m4a' );

  // check that there is blocks in the workspace
  if(demoWorkspace.getAllBlocks(false).length != 0)
  {
    // show stop button and hide start button
    document.getElementById("stopbutton").classList.toggle("active");
    document.getElementById("startbutton").classList.toggle("active");

    // play sounds
    //tiresPealing.play();

    // check for infinite loop
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP =
        'if (--window.LoopTrap === 0) throw "Infinite loop.";\n';

    // turn workspace into JavaScript
    var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;

    // Wrap the returned code in boilerplate
    code = "(async () => {var myIdx = " + currentIdx + "\n"
     + code + "\n" +
    `if (!isCanceled[myIdx])
    {
      stopRobotLogic();
    }
    })();`;

    // Log the generated code for debugging purposes
    console.log(code)

    // eval code
    try
    {
      isCanceled[currentIdx] = false;
      eval(code);
    }
    catch (e)
    {
      // Log the error for debugging purposes
      console.log(e);
      // Make sure we stop the bot before alerting just in case
      stopRobotLogic();
      alert(e);
    }

  }
  else
  {
    // else assume that no blocks have been placed in the workspace

    // send alert to window that there should be development before the bot will run
    alert( "You haven't built blocks yet to run" );
  }

  // end function
}



/*
 * Name: stopButtonLogic
 * Algorithm: calls the function that stops the robot
 *            changes the stop button back to start
 * Input/Parameters: none
 * Output: stops robot and changes visible buttons
 * Notes: none
 */
function stopButtonLogic()
{
  // stop the robot
  stopRobotLogic()

  // show start button and hide stop button
  document.getElementById("startbutton").classList.toggle("active");
  document.getElementById("stopbutton").classList.toggle("active");
}



/*
 * Name: stopRobotLogic
 * Algorithm: calls functions that stop functions of the Duckiebots
 *            either stops signal or sends an interupt stop command
 * Input/Parameters: none
 * Output: calls functions to stop Duckiebot
 * Notes: currently only shows an alert
 */
function stopRobotLogic()
{
  // Stop the bot
  var stop = new ROSLIB.Message(
  {
    header : {
      stamp : {
        sec : 0,
        nanosec : 0
      }
    },
    vel_left : 0,
    vel_right : 0
  });

  setCanceled();

  cmdVel.publish(stop);
}

// when button clicked, simply clear blockly workspace
function newProjectLogic ()
{
  // clear existing workspace
  Blockly.mainWorkspace.clear();
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
window.addEventListener('resize', false);
Blockly.svgResize(demoWorkspace);


})();
