import type { ButtonHTMLAttributes } from 'react';

import SvgIcon from '../../SvgIcon';

import type { SvgIconProps, SvgIconType } from '../../SvgIcon';

export interface InputIconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: SvgIconType | SvgIconProps;
}

export type InputIconProps = SvgIconType | InputIconButtonProps;

interface InputIconInternalProps {
  icon: InputIconProps;
}

const InputIcon: React.FC<InputIconInternalProps> = ({ icon }) => {
  const isObject = typeof icon === 'object';

  const iconStyles = 'text-grey-500';

  const iconSize = 20;

  if (!isObject) {
    return (
      <SvgIcon
        className={iconStyles}
        iconType={icon as SvgIconType}
        size={iconSize}
      />
    );
  }

  const { icon: buttonIcon, ...buttonProps } = icon as InputIconButtonProps;

  const isIconTypeObject = typeof buttonIcon === 'object';

  return (
    <button type="button" {...buttonProps}>
      <SvgIcon
        className={iconStyles}
        iconType={
          !isIconTypeObject
            ? (buttonIcon as SvgIconType)
            : (buttonIcon as SvgIconProps).iconType
        }
        size={iconSize}
        {...(!isIconTypeObject ? {} : (buttonIcon as SvgIconProps))}
      />
    </button>
  );
};

export default InputIcon;
