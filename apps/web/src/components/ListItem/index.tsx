import type { PropsWithChildren } from 'react';

import clsx from 'clsx';

interface ListItemProps {
  className?: string;
  borderColor?: 'light' | 'dark';
}

/* 
  This component will be used whenever we need a list with border and spacing
*/

export const ListItem: React.FC<PropsWithChildren<ListItemProps>> = ({
  className,
  borderColor = 'dark',
  children,
}) => (
  <li
    className={clsx(
      'py-4 first-of-type:pt-0 last-of-type:pb-0 border-b last-of-type:border-b-0',
      {
        'border-b-grey-700': borderColor === 'light',
        'border-b-grey-800': borderColor === 'dark',
      },
      className,
    )}
  >
    {children}
  </li>
);
