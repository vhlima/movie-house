import type { DropdownProps } from '../Dropdown';

import { useAuth } from '../../../../../hooks/useAuth';

import Notification from './components/Notification';

import Dropdown from '../Dropdown';

const Notifications: React.FC<DropdownProps> = ({ onClose }) => {
  const { data } = useAuth();

  if (!data) {
    return null;
  }

  const {
    user: { username, profilePictureUrl },
  } = data;

  return (
    <Dropdown onClose={onClose}>
      <ul className="p-4">
        <Notification imageUrl={profilePictureUrl}>
          <span className="text-grey-100">{username}</span>

          <span className="text-grey-200 ml-0.5">sent you a message</span>
        </Notification>

        <Notification imageUrl={profilePictureUrl}>
          <span className="text-grey-100">{username}</span>

          <span className="text-grey-200 ml-0.5">liked your review</span>
        </Notification>

        <Notification imageUrl={profilePictureUrl}>
          <span className="text-grey-100">{username}</span>

          <span className="text-grey-200 ml-0.5">commented in your review</span>

          <span className="text-grey-100 ml-1">what is reality?</span>
        </Notification>

        <Notification imageUrl={profilePictureUrl}>
          <span className="text-grey-100">{username}</span>

          <span className="text-grey-200 ml-0.5">followed you</span>
        </Notification>
      </ul>
    </Dropdown>
  );
};

export default Notifications;
