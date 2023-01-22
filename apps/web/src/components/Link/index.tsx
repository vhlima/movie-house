import type { PropsWithChildren } from 'react';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';

export type LinkProps = Omit<NextLinkProps, 'passHref'>;

interface LinkInternalProps extends LinkProps {
  className?: string;
}

/* 
   This component represents all links inside our aplication. 
   It will automatically put an anchor tag inside our NextJS link.
*/

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
