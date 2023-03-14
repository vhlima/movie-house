import type { PropsWithChildren } from 'react';

const CardBody: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="flex flex-col gap-2 flex-grow">{children}</div>
);

export default CardBody;
