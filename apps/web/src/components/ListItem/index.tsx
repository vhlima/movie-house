import React, { PropsWithChildren } from 'react';

import clsx from 'clsx';

interface ListItemProps {
  className?: string;
  multiple?: boolean;
}

/* 
  This component will be used when we need a list with border spacing
  Ex: Lists of MovieReview (preview) or MovieList (preview)
*/

const ListItem: React.FC<PropsWithChildren<ListItemProps>> = ({
  className,
  multiple,
  children,
}) => (
  <div
    className={clsx(
      'flex gap-2 py-4 border-b border-b-grey-300 first:pt-0',
      className,
      {
        'mt-4': !multiple,
        'flex-col last:border-0 last:pb-0': multiple,
      },
    )}
  >
    {children}
  </div>
);

export default ListItem;
