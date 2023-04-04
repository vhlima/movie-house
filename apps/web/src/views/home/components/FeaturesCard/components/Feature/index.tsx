import { Link, SvgIcon, Typography } from '@/components';

import type { LinkProps, SvgIconType } from '@/components';

interface Props {
  iconType: SvgIconType;
  text: string;
  link: LinkProps;
}

export const Feature: React.FC<Props> = ({ iconType, text, link }) => (
  <li className="rounded-md border border-grey-600 group hover:border-transparent hover:bg-grey-600">
    <Link className="flex gap-2 p-4" {...link}>
      <SvgIcon
        className="flex-shrink-0 text-grey-500 group-hover:text-grey-200"
        iconType={iconType}
        size={50}
      />

      <Typography component="p" color="primary" groupHover>
        {text}
      </Typography>
    </Link>
  </li>
);
