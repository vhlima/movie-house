import { ButtonHTMLAttributes } from 'react';

import { SvgIcon } from '@/components';

type PencilButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const PencilButton: React.FC<PencilButtonProps> = ({ ...props }) => (
  <button className="ml-auto" type="button" {...props}>
    <SvgIcon iconType="FaPencilAlt" />
  </button>
);

export default PencilButton;
