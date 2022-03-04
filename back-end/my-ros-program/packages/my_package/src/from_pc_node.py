#!/usr/bin/env python3

import os

# from matplotlib.cbook import to_filehandle
import rospy
from duckietown.dtros import DTROS, NodeType
from duckietown_msgs.msg import WheelsCmdStamped

from std_msgs.msg import Float32MultiArray

class FromPCNode(DTROS):

    def __init__(self, node_name):
        # initialize the DTROS parent class
        super(FromPCNode, self).__init__(node_name=node_name, node_type=NodeType.GENERIC)
        # construct publisher
        self.sub = rospy.Subscriber('pc_to_bot', Float32MultiArray, self.callback)
        self.pub = rospy.Publisher('/Rogelio/wheels_driver_node/wheels_cmd', WheelsCmdStamped, queue_size=10)

    def callback(self, data):
        rospy.loginfo(f"I'm hearing {data}")
        cmd = WheelsCmdStamped()
        cmd.header.stamp = rospy.Time.now()
        cmd.vel_left = data.data[0]
        cmd.vel_right = data.data[1]
        self.pub.publish(cmd)


if __name__ == '__main__':
    # create the node
    node = FromPCNode(node_name='from_pc')
    rospy.spin()
