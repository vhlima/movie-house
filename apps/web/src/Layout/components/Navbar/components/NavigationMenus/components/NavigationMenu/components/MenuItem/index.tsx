import { SvgIcon, Button, Typography } from '@/components';

import type { ButtonProps } from '@/components';

import type { SvgIconType } from '../../../../../../../../../components/SvgIcon';

type Props = ButtonProps & {
  text: string;
  icon: SvgIconType;
};

const MenuLink: React.FC<Props> = ({ text, icon, ...buttonProps }) => (
  <li className="border-b border-b-grey-700 last-of-type:border-b-0">
    <Button
      className="gap-2"
      intent="tertiary"
      rounded={false}
      center={false}
      {...buttonProps}
    >
      <SvgIcon size={22} iconType={icon} />
      <Typography className="uppercase" component="span">
        {text}
      </Typography>
    </Button>
  </li>
);

export default MenuLink;
