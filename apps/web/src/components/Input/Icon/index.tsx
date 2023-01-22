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

  const { style, size } = {
    style: 'text-grey-500',
    size: 20,
  };

  if (!isObject) {
    return (
      <SvgIcon className={style} iconType={icon as SvgIconType} size={size} />
    );
  }

  const { icon: buttonIcon, ...buttonProps } = icon as InputIconButtonProps;

  const isIconTypeObject = typeof buttonIcon === 'object';

  return (
    <button type="button" {...buttonProps}>
      <SvgIcon
        className={style}
        iconType={
          !isIconTypeObject
            ? (buttonIcon as SvgIconType)
            : (buttonIcon as SvgIconProps).iconType
        }
        size={size}
        {...(!isIconTypeObject ? {} : (buttonIcon as SvgIconProps))}
      />
    </button>
  );
};

export default InputIcon;
