/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */


Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    "type": "play_sound",
    "message0": "Play %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "VALUE",
        "options": [
          ["C4", "sounds/c4.m4a"],
          ["D4", "sounds/d4.m4a"],
          ["E4", "sounds/e4.m4a"],
          ["F4", "sounds/f4.m4a"],
          ["G4", "sounds/g4.m4a"]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 355,
  }
]);

Blockly.JavaScript['play_sound'] = function(block) {
  // Connecting to ROS
  // -----------------

  var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
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
    name : '/pc_to_bot',
    messageType : 'std_msgs/Float32MultiArray'
  });

  var move = new ROSLIB.Message({
    data : [0, 0]
  });
  cmdVel.publish(move);

  // Subscribing to a Topic
  // ----------------------

  // var listener = new ROSLIB.Topic({
  //   ros : ros,
  //   name : '/listener',
  //   messageType : 'std_msgs/String'
  // });

  // listener.subscribe(function(message) {
  //   console.log('Received message on ' + listener.name + ': ' + message.data);
  //   listener.unsubscribe();
  // });

  // // Calling a service
  // // -----------------

  // var addTwoIntsClient = new ROSLIB.Service({
  //   ros : ros,
  //   name : '/add_two_ints',
  //   serviceType : 'rospy_tutorials/AddTwoInts'
  // });

  // var request = new ROSLIB.ServiceRequest({
  //   a : 1,
  //   b : 2
  // });

  // addTwoIntsClient.callService(request, function(result) {
  //   console.log('Result for service call on '
  //     + addTwoIntsClient.name
  //     + ': '
  //     + result.sum);
  // });

  // // Getting and setting a param value
  // // ---------------------------------

  // ros.getParams(function(params) {
  //   console.log(params);
  // });

  // var maxVelX = new ROSLIB.Param({
  //   ros : ros,
  //   name : 'max_vel_y'
  // });

  // maxVelX.set(0.8);
  // maxVelX.get(function(value) {
  //   console.log('MAX VAL: ' + value);
  // });

  let value = '\'' + block.getFieldValue('VALUE') + '\'';
  return 'MusicMaker.queueSound(' + value + ');\n';
};
