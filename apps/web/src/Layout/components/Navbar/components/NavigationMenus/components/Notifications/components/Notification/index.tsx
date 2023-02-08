import type { PropsWithChildren } from 'react';

import Link from '../../../../../../../../../components/Link';
import ProfilePicture from '../../../../../../../../../components/ProfilePicture';

interface NotificationProps {
  imageUrl?: string;
}

const Notification: React.FC<PropsWithChildren<NotificationProps>> = ({
  imageUrl,
  children,
}) => (
  <li className="border-b border-b-grey-700 py-3 first:pt-0 last:pb-0 last:border-0">
    <Link className="flex items-center" href="/">
      {imageUrl && (
        <div className="relative w-8 h-8 flex-shrink-0 rounded-full overflow-hidden mr-2">
          <ProfilePicture src={imageUrl} imageSize="md" />
        </div>
      )}

      <div className="flex-wrap">
        {children}

        <span className="text-grey-100 ml-1">1h</span>
      </div>
    </Link>
  </li>
);

export default Notification;
