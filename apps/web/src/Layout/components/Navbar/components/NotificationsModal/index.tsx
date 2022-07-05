import React from 'react';

import { MotionProps, motion } from 'framer-motion';

import { fakeUser } from '../../../../../data/fakeData';

import Notification from './components/Notification';

interface NotificationsModalProps {
  animation: MotionProps;
}

const NotificationsModal: React.FC<NotificationsModalProps> = ({
  animation,
}) => {
  const notificationUser = fakeUser();

  return (
    <motion.div className="absolute w-full bg-inherit z-40" {...animation}>
      <ul className="p-4">
        <Notification imageUrl={notificationUser.profilePicture}>
          <span className="text-grey-100">{notificationUser.username}</span>

          <span className="text-grey-200 ml-0.5">sent you a message</span>
        </Notification>

        <Notification imageUrl={notificationUser.profilePicture}>
          <span className="text-grey-100">{notificationUser.username}</span>

          <span className="text-grey-200 ml-0.5">liked your review</span>
        </Notification>

        <Notification imageUrl={notificationUser.profilePicture}>
          <span className="text-grey-100">{notificationUser.username}</span>

          <span className="text-grey-200 ml-0.5">commented in your review</span>

          <span className="text-grey-100 ml-1">what is reality?</span>
        </Notification>

        <Notification imageUrl={notificationUser.profilePicture}>
          <span className="text-grey-100">{notificationUser.username}</span>

          <span className="text-grey-200 ml-0.5">followed you</span>
        </Notification>
      </ul>
    </motion.div>
  );
};

export default NotificationsModal;
