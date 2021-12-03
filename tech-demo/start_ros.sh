gnome-terminal -- roscore
sleep 2 # Make sure roscore is done getting set up before trying to run everything else
gnome-terminal -- rostopic pub /listener std_msgs/String "Hello, World"
gnome-terminal -- rostopic echo /cmd_vel
gnome-terminal -- rosrun rospy_tutorials add_two_ints_server
gnome-terminal -- roslaunch rosbridge_server rosbridge_websocket.launch
