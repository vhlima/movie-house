import clsx from 'clsx';
import React from 'react';

import SvgIcon from '../SvgIcon';

interface LogoProps {
  logoSize?: 'lg' | 'sm';
  showText?: boolean;
  showLogo?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  logoSize = 'sm',
  showText,
  showLogo = true,
}) => (
  <div className="flex items-center gap-2 select-none">
    {showLogo && (
      <SvgIcon
        className="text-movieHouse-dark"
        iconType="BsHouse"
        size={logoSize === 'sm' ? 22 : 32}
        strokeWidth={1}
      />
    )}

    {showText && (
      <h1
        className={clsx('text-grey-100 font-mono font-semibold', {
          'text-2xl': logoSize === 'sm',
          'text-4xl': logoSize === 'lg',
        })}
      >
        MovieHouse
      </h1>
    )}
  </div>
);

export default Logo;
