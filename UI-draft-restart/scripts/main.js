(function() {



  // global variables
var demoWorkspace;

  
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
 * Name: displayFileChoice
 * Algorithm: toggles active css for linked list to choose a file 
 * Input/Parameters: none
 * Output: makes chose file available to user
 * Notes: none
 */
function displayFileChoice()
{
  document.getElementById( 'fileSelector' ).classList.toggle( 'active' );
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
 * Name: importBlocksFile()
 * Algorithm: Takes the file and imports the data inside into a workspace
 *            Will only do this if there is data in the file
 * Precondition: buttons for settings and import project have been clicked
 * Postcondition: Workspace has been reset to what project has been uploaded
 * Notes: currently only showing an alert.
 */
function importBlocksFile() {
  alert("trying to import block");
}



/*
 * Name: settingsMessage
 * Algorithm: Ideally a drop down settings menu
 * Input/Parameters: none
 * Output: drops down a menu
 * Notes: currently only shows an alert
 */
function settingsMessage()
{
  // initialize function/variables
  document.getElementById("dropdown").classList.toggle("active");
}



/*
 * Name: startButtonLogic
 * Algorithm: Call functions needed to run Blockly blocks for Duckiebots
 * Input/Parameters: Blocks have been placed into work area
 * Output: Calls functions that run Duckiebots.
 * Notes: currently only shows an alert
 */
function startButtonLogic()
{
  // placeholder to currently verify that the button works
  alert( "You clicked start" );

  // initialize function/variables
  var tiresPealing = new Audio( 'sounds/Tires.m4a' );

  // check that there is blocks in the workspace
  if(demoWorkspace.getAllBlocks(false).length != 0)
  {
    alert( "Evaluating code" );
    // play sounds
    //tiresPealing.play();

    // check for infinite loop
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP =
        'if (--window.LoopTrap === 0) throw "Infinite loop.";\n';

    // turn workspace into JavaScript
    var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;

    // eval code
    try
    {
      eval(code);
    }
    catch (e)
    {
      alert(MSG['Code is bad'].replace('%1',e));
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
 * Algorithm: calls functions that stop functions of the Duckiebots
 *            either stops signal or sends an interupt stop command
 * Input/Parameters: none
 * Output: calls functions to stop Duckiebot
 * Notes: currently only shows an alert
 */
function stopButtonLogic()
{
  // placeholder to currently verify that the button works
  alert( "You clicked stop" );

  // initialize function/variables as needed

  // check for current commands being sent to bot

    // end commands being sent to bot

  // send stop signal

  // end function
}



// run the main executables to build blockly workspace
buildBlocklyWorkspace();



// create aditional listener buttons for settings, start and stop
document.getElementById( 'settingDropBtn' ).addEventListener( 'click', settingsMessage );
document.getElementById( 'startbutton' ).addEventListener( 'click', startButtonLogic );
document.getElementById( 'stopbutton' ).addEventListener( 'click', stopButtonLogic );
document.getElementById( 'saveBlocks' ).addEventListener( 'click', exportBlocks );
document.getElementById( 'importProject' ).addEventListener( 'click', displayFileChoice );
document.getElementById( 'importWorkspace' ).addEventListener( 'click', importBlocksFile );

// creates listeners to resize the Blockly workspace if the window size changes
window.addEventListener('resize', false);
Blockly.svgResize(demoWorkspace);


})();
