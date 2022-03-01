#!/usr/bin/env python
# license removed for brevity
import rospy
from std_msgs.msg import Float32MultiArray

def talker():
    pub = rospy.Publisher('pc_to_bot', Float32MultiArray, queue_size=10)
    rospy.init_node('to_bot', anonymous=True)
    rate = rospy.Rate(10) # 10hz
    while not rospy.is_shutdown():
        rospy.loginfo("I'm speaking")
        cmd = Float32MultiArray()
        cmd.data = [1, -1]
        pub.publish(cmd)
        rate.sleep()

if __name__ == '__main__':
    try:
        talker()
    except rospy.ROSInterruptException:
        pass
