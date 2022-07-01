import React, { PropsWithChildren } from 'react';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';

export type LinkProps = Omit<NextLinkProps, 'passHref'>;

interface LinkInternalProps extends LinkProps {
  className?: string;
}

const Link: React.FC<PropsWithChildren<LinkInternalProps>> = ({
  className,
  children,
  ...rest
}) => (
  <NextLink {...rest} passHref>
    <a className={className || undefined} href="dummy">
      {children}
    </a>
  </NextLink>
);

export default Link;
