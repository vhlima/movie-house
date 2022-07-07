import React from 'react';

import SvgIcon, { SvgIconProps } from '../../../../../components/SvgIcon';

interface NavButtonProps extends SvgIconProps {
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ onClick, ...iconProps }) => (
  <button className="p-2" type="button" onClick={onClick}>
    <SvgIcon {...iconProps} />
  </button>
);

export default NavButton;
