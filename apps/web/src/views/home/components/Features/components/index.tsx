import clsx from 'clsx';

import { Link } from '@/components';

import type { LinkProps } from '@/components';

import SvgIcon, { SvgIconType } from '../../../../../components/SvgIcon';

interface FeatureLinkProps extends LinkProps {
  iconType: SvgIconType;
  text: string;
  color: 'purple' | 'orange' | 'green';
}

const FeatureLink: React.FC<FeatureLinkProps> = ({
  iconType,
  text,
  color,
  ...linkProps
}) => (
  <li className="rounded-md border-2 border-grey-600 group hover:border-transparent hover:bg-grey-600">
    <Link
      className={clsx(
        'flex gap-2 p-4',
        // {
        //   'hover:bg-success-base': color === 'green',
        //   'hover:bg-warning-base': color === 'orange',
        //   'hover:bg-movieHouse-mid': color === 'purple',
        // },
      )}
      {...linkProps}
    >
      <SvgIcon
        className={clsx(
          'flex-shrink-0 text-grey-500 group-hover:text-grey-200',
        )}
        iconType={iconType}
        size={50}
      />

      <p className="text-grey-100 group-hover:text-white">{text}</p>
    </Link>
  </li>
);

export default FeatureLink;
