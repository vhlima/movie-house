import React, { PropsWithChildren } from 'react';

import { FaChevronRight } from 'react-icons/fa';

import Link, { LinkProps } from '../Link';

interface CardProps {
  title: string;
  description?: string;
  link?: LinkProps;
}

const Card: React.FC<PropsWithChildren<CardProps>> = ({
  title,
  description,
  link,
  children,
}) => {
  const headContainerStyles = 'group';

  const head = (
    <>
      <div className="flex gap-2 items-center">
        <span className="block w-1 h-6 rounded-lg bg-primary" />

        <h1 className="text-secondary font-bold text-xl">{title}</h1>

        <FaChevronRight
          className="text-secondary group-hover:text-primary"
          size={20}
        />
      </div>

      {description && <p className="text-secondaryVariant">{description}</p>}
    </>
  );

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 p-3">
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
