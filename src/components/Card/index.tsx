import React, { PropsWithChildren } from 'react';

interface CardProps {
  title: string;
  description?: string;
}

const Card: React.FC<PropsWithChildren<CardProps>> = ({
  title,
  description,
  children,
}) => (
  <div className="w-full bg-complementary3">
    <div className="p-3">
      <div className="mb-2 select-none">
        <div className="flex gap-2 items-center">
          <span className="block w-1 h-6 rounded-lg bg-primary" />

          <h1 className="text-secondary font-bold text-xl">{title}</h1>
        </div>

        {description && <p className="text-secondaryVariant">{description}</p>}
      </div>

      {children}
    </div>
  </div>
);

export default Card;
