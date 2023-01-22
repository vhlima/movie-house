import type { PropsWithChildren } from 'react';

import clsx from 'clsx';

import type { LinkProps } from '../Link';

import type { SvgIconType } from '../SvgIcon';

import Link from '../Link';

import SvgIcon from '../SvgIcon';

export interface CardIconProps {
  iconType: SvgIconType;
  onClick: () => void;
}

export interface CardProps {
  className?: string;

  title: string;
  description?: string;

  link?: LinkProps;

  noPadding?: boolean;
  gap?: boolean;

  rightIcon?: CardIconProps;
}

const Card: React.FC<PropsWithChildren<CardProps>> = ({
  className,
  title,
  description,
  link,
  noPadding,
  gap = true,
  rightIcon,
  children,
}) => {
  const headContainerStyles = 'group';

  const head = (
    <>
      <div className="flex gap-2 items-center text-grey-100">
        <span className="block w-1 h-6 rounded-lg bg-movieHouse-dark" />

        <h1 className="font-bold text-xl uppercase">{title}</h1>

        {link && (
          <SvgIcon
            className="text-grey-200 group-hover:text-movieHouse-mid"
            iconType="FaChevronRight"
            size={20}
          />
        )}

        {rightIcon && (
          <button
            className="ml-auto p-1"
            type="button"
            onClick={rightIcon.onClick}
          >
            <SvgIcon className="text-grey-200" iconType={rightIcon.iconType} />
          </button>
        )}
      </div>

      {description && <p className="text-grey-300">{description}</p>}
    </>
  );

  return (
    <div className={clsx('w-full', className, { 'p-3': !noPadding })}>
      {!link ? (
        <div className={headContainerStyles}>{head}</div>
      ) : (
        <Link className={headContainerStyles} {...link}>
          {head}
        </Link>
      )}

      <div className={clsx('flex flex-col flex-grow mt-4', { 'gap-2': gap })}>
        {children}
      </div>
    </div>
  );
};

export default Card;
