(function() {
// master function to create blockly page
function buildBlocklyWorkspace()
{
var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
var demoWorkspace = Blockly.inject(blocklyDiv,
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
 * Name: settingsMessage
 * Algorithm: Ideally a drop down settings menu
 * Input/Parameters: none
 * Output: drops down a menu
 * Notes: currently only shows an alert
 */
function settingsMessage()
{

  // initialize function/variables
  var click = document.getElementsByClassName('settignsDropdown-Content');

  // check what the current display type for the list is and change it
  if( click.style.display == 'none' ) {
    click.style.display = 'block';
    alert("none is the way");
  }
  else{
    click.style.display = 'none';
  }

  // call function to show the dropdown content
  document.getElementById("settingsDropdown").classList.toggle("show");
  
  // close the dropdown if the user clicks outside of dropdown
    // create event listener listening for any action outside of dropdown buttons

  // end function
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

    // play sounds
    tiresPealing.play();

    // call functions that translate those blocks. Maybe in DuckBlock.js file?

  // else assume that no blocks have been placed in the workspace

    // send alert to window that there should be development before the bot will run
    alert( "You haven't built blocks yet to run, idots" );

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



// creates listeners to resize the Blockly workspace if the window size changes
window.addEventListener('resize', onresize, false);
onresize();
Blockly.svgResize(demoWorkspace);



// create listener to make dropdown menu for settings disappear.
window.onclick = function(event){
  if( !event.target.matches('#settingDropBtn')){
    var dropdowns = document.getElementsByClassName("settingsDropdown-Content");
    var i;
    for( i=0; i<dropdowns.length; i++ ){
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')){
        openDropdown.classList.remove('show');
      }
    }
  }
}

})();
