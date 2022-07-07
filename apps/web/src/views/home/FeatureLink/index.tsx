import React from 'react';

import clsx from 'clsx';

import Link, { LinkProps } from '../../../components/Link';

import SvgIcon, { SvgIconType } from '../../../components/SvgIcon';

interface FeatureLinkProps extends LinkProps {
  iconType: SvgIconType;
  text: string;
  color: 'purple' | 'orange' | 'green';
}

/*
  This component represents home page website features with links to their respective page
*/

const FeatureLink: React.FC<FeatureLinkProps> = ({
  iconType,
  text,
  color,
  ...linkProps
}) => (
  <Link
    className={clsx(
      'flex gap-2 p-4 rounded-md border-2 border-grey-600 group hover:border-transparent',
      {
        'hover:bg-success-base': color === 'green',
        'hover:bg-warning-base': color === 'orange',
        'hover:bg-movieHouse-mid': color === 'purple',
      },
    )}
    {...linkProps}
  >
    <SvgIcon
      className={clsx('flex-shrink-0 text-grey-500 group-hover:text-grey-200')}
      iconType={iconType}
      size={50}
    />

    <p className="text-grey-100 group-hover:text-white">{text}</p>
  </Link>
);

export default FeatureLink;
