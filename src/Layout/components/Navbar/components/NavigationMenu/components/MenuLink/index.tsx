import React from 'react';

import { IconBaseProps } from 'react-icons';

import Link, { LinkProps } from '../../../../../../../components/Link';

interface MenuLinkProps extends LinkProps {
  text: string;
  icon: React.ComponentType<IconBaseProps>;
}

const MenuLink: React.FC<MenuLinkProps> = ({
  text,
  icon: Icon,
  ...linkProps
}) => (
  <li className="border-b border-b-grey-300 group last:border-0 py-2 first:pt-0 last:pb-0">
    <Link className="block" {...linkProps}>
      <div className="flex items-center gap-3">
        <Icon className="text-grey-300" size={22} />

        <span className="text-grey-200 uppercase font-semibold group-hover:text-movieHouse-dark">
          {text}
        </span>
      </div>
    </Link>
  </li>
);

export default MenuLink;
