import React from 'react';

import Link, { LinkProps } from '../../../../../components/Link';

interface UserProfileNumberProps {
  number: number;
  text: string;
  link: LinkProps;
}

const UserProfileNumber: React.FC<UserProfileNumberProps> = ({
  number,
  text,
  link,
}) => (
  <Link
    className="flex flex-col items-center border-r border-grey-700 px-2 first-of-type:pl-0 last-of-type:pr-0 last-of-type:border-0"
    {...link}
  >
    <span className="text-grey-100 font-bold">{number}</span>
    <span className="text-grey-200">{text}</span>
  </Link>
);

export default UserProfileNumber;
