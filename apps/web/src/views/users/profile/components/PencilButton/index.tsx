import { ButtonHTMLAttributes } from 'react';

import { SvgIcon } from '@/components';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/views/users/hooks/useProfile';

type PencilButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const PencilButton: React.FC<PencilButtonProps> = ({ ...props }) => {
  const { data: session } = useAuth();

  const { user } = useProfile();

  const isSameUserAsSession = session && session.user.id === user?.id;

  if (!session || !isSameUserAsSession) {
    return null;
  }

  return (
    <button className="ml-auto" type="button" {...props}>
      <SvgIcon iconType="FaPencilAlt" />
    </button>
  );
};

export default PencilButton;
