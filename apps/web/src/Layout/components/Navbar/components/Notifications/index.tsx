import React from 'react';

import { fakeUser } from '../../../../../data/fakeData';

import Notification from './components/Notification';

import Dropdown, { DropdownProps } from '../Dropdown';

const Notifications: React.FC<DropdownProps> = ({ onClose }) => {
  const notificationUser = fakeUser();

  return (
    <Dropdown onClose={onClose}>
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
    </Dropdown>
  );
};

export default Notifications;
