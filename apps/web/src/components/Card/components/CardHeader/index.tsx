import type { PropsWithChildren } from 'react';

import clsx from 'clsx';

import { Typography } from '@/components';

interface CardHeaderProps {
  className?: string;
  title?: string;
  marginBottom?: boolean;
}

const CardHeader: React.FC<PropsWithChildren<CardHeaderProps>> = ({
  className,
  title,
  marginBottom,
  children,
}) => (
  <div
    className={clsx(
      'flex gap-2 items-center text-grey-100 border-b border-b-grey-700 pb-1',
      {
        'mb-4': marginBottom,
      },
      className && className,
    )}
  >
    {title && (
      <Typography
        className="font-bold uppercase"
        component="h1"
        color="primary"
        size="lg"
      >
        {title}
      </Typography>
    )}

    {children}
  </div>
);

export default CardHeader;
