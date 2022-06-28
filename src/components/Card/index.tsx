import React, { PropsWithChildren } from 'react';

import clsx from 'clsx';

import { FaChevronRight } from 'react-icons/fa';

import Link, { LinkProps } from '../Link';

interface CardProps {
  className?: string;
  title: string;
  description?: string;
  link?: LinkProps;
  noPadding?: boolean;
}

const Card: React.FC<PropsWithChildren<CardProps>> = ({
  className,
  title,
  description,
  link,
  noPadding,
  children,
}) => {
  const headContainerStyles = 'group';

  const head = (
    <>
      <div className="flex gap-2 items-center text-grey-100">
        <span className="block w-1 h-6 rounded-lg bg-movieHouse-dark" />

        <h1 className="font-bold text-xl">{title}</h1>

        {link && (
          <FaChevronRight
            className="text-grey-200 group-hover:text-movieHouse-dark"
            size={20}
          />
        )}
      </div>

      {description && <p className="text-grey-300">{description}</p>}
    </>
  );

  return (
    <div className={clsx('w-full', className)}>
      <div className={clsx('flex flex-col gap-2', { 'p-3': !noPadding })}>
        {!link ? (
          <div className={headContainerStyles}>{head}</div>
        ) : (
          <Link className={headContainerStyles} {...link}>
            {head}
          </Link>
        )}

        {children}
      </div>
    </div>
  );
};

export default Card;
