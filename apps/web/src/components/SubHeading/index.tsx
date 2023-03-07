import type { PropsWithChildren } from 'react';

import Typography from '../Typography';

interface SubHeadingProps {
  title?: string;
}

const SubHeading: React.FC<PropsWithChildren<SubHeadingProps>> = ({
  title,
  children,
}) => (
  <div className="flex items-center gap-2 pb-1 border-b border-b-grey-800 mb-4">
    {title && (
      <Typography className="uppercase" component="h2" size="sm">
        {title}
      </Typography>
    )}

    {children}
  </div>
);

export default SubHeading;
