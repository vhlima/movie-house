import clsx from 'clsx';

import type { LinkProps } from '../../../../Link';

import Link from '../../../../Link';
import Typography from '../../../../Typography';

interface YearListItemProps {
  link: LinkProps;
  text: string;
  selected?: boolean;
}

const YearListItem: React.FC<YearListItemProps> = ({
  link,
  text,
  selected,
}) => (
  <li
    className={clsx(
      'w-full p-1 border-r border-r-grey-700 last-of-type:border-r-0',
      {
        'bg-grey-700': selected,
      },
    )}
  >
    <Link {...link}>
      <Typography className="block text-center" component="span" size="sm">
        {text}
      </Typography>
    </Link>
  </li>
);

export default YearListItem;
