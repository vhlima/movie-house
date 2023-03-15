import { Link, SvgIcon } from '@/components';

import type { LinkProps } from '../../../../../../../../../components/Link';

import type { SvgIconType } from '../../../../../../../../../components/SvgIcon';

interface MenuItemButtonProps {
  onClick: () => void;
}

interface MenuLinkProps {
  text: string;
  icon: SvgIconType;
  itemProps: LinkProps | MenuItemButtonProps;
}

const MenuLink: React.FC<MenuLinkProps> = ({ text, icon, itemProps }) => {
  const ItemBody = (
    <div className="flex items-center gap-3">
      <SvgIcon iconType={icon} size={22} />

      <span className="text-grey-200 uppercase font-semibold group-hover:text-grey-300">
        {text}
      </span>
    </div>
  );

  const itemPropsAsLink = itemProps as LinkProps;

  return (
    <li className="border-b border-b-grey-700 group last:border-0 py-2 first:pt-0 last:pb-0">
      {!itemPropsAsLink.href ? (
        <button
          className="flex items-center w-full"
          type="button"
          onClick={(itemProps as MenuItemButtonProps).onClick}
        >
          {ItemBody}
        </button>
      ) : (
        <Link className="block" {...itemPropsAsLink}>
          {ItemBody}
        </Link>
      )}
    </li>
  );
};

export default MenuLink;
