import type { PropsWithChildren } from 'react';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';

export type LinkProps = Omit<NextLinkProps, 'passHref'>;

interface LinkInternalProps extends LinkProps {
  className?: string;
}

/* 
  Represents all links included inside our application.
  
  We are using this approach because we want to have
  our app totally independent from 3rd party libs.
*/

const Link: React.FC<PropsWithChildren<LinkInternalProps>> = ({
  children,
  ...rest
}) => <NextLink {...rest}>{children}</NextLink>;

export default Link;
