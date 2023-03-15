import type { PropsWithChildren } from 'react';

import clsx from 'clsx';

import type { LinkProps } from '@/components';

import { Link } from '@/components';
import type { SvgIconType } from '../SvgIcon';

import SvgIcon from '../SvgIcon';
import CardBody from './components/CardBody';
import CardHeader from './components/CardHeader';

export interface CardIconProps {
  iconType: SvgIconType;
  onClick: () => void;
}

export interface CardProps {
  className?: string;

  title?: string;
  description?: string;

  link?: LinkProps;

  noPadding?: boolean;
  gap?: boolean;

  rightIcon?: CardIconProps;
}

interface CardSubComponents {
  Body: typeof CardBody;
  Header: typeof CardHeader;
}

export const Card: React.FC<PropsWithChildren<CardProps>> &
  CardSubComponents = ({ className, children }) => {
  const a = 1;

  return <div className={clsx('w-full', className)}>{children}</div>;
};

Card.Body = CardBody;
Card.Header = CardHeader;

const OldCard: React.FC<PropsWithChildren<CardProps>> = ({
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
      <div className="flex gap-2 items-center text-grey-100 border-b border-b-grey-700 pb-1">
        {/* <span className="block w-1 h-6 rounded-lg bg-movieHouse-dark" /> */}

        <h1 className="font-bold text-lg uppercase">{title}</h1>

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

      <div className={clsx('flex flex-col flex-grow', { 'gap-2': gap })}>
        {children}
      </div>
    </div>
  );
};
