import type { PropsWithChildren } from 'react';

import clsx from 'clsx';

import CardBody from './components/CardBody';
import CardHeader from './components/CardHeader';

interface CardProps {
  className?: string;
}

interface CardSubComponents {
  Body: typeof CardBody;
  Header: typeof CardHeader;
}

export const Card: React.FC<PropsWithChildren<CardProps>> &
  CardSubComponents = ({ className, children }) => (
  <div className={clsx('w-full', className)}>{children}</div>
);

Card.Body = CardBody;
Card.Header = CardHeader;
