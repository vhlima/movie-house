import type { RefObject } from 'react';

import { useAuth } from '../../../../hooks/useAuth';

import type { InputIconButtonProps } from '../../../Input/Icon';

import Input from '../../../Input';

import ProfilePicture from '../../../ProfilePicture';

export type TextInputReference = RefObject<HTMLInputElement>;

interface TextInputHandles {
  onFocus?: () => void;
}

export interface TextInputProps {
  reference?: TextInputReference;
  formik?: boolean;
  isReply?: boolean;
  loading?: boolean;
}

type TextInputInternalProps = TextInputProps & TextInputHandles;

const TextInput: React.FC<TextInputInternalProps> = ({
  reference,
  formik,
  isReply,
  loading,
  onFocus,
}) => {
  const { user } = useAuth();

  // TODO user required

  const rightIcon: InputIconButtonProps = {
    className: 'p-2 text-grey-300',
    type: 'submit',
    icon: {
      className: loading && 'animate-spin',
      iconType: !loading ? 'IoIosSend' : 'CgSpinner',
      size: 24,
    },
  };

  return (
    <Input
      name="body"
      formik={formik}
      rounded={false}
      border={false}
      showError={false}
      onFocus={onFocus}
      reference={reference}
      borderFocus={!formik}
      placeholder={!isReply ? 'Add a commentary...' : 'Add a reply...'}
      rightIcon={formik && rightIcon}
    >
      <div className="px-3">
        <ProfilePicture imageSize="sm" src={user.profilePicture} />
      </div>
    </Input>
  );
};
export default TextInput;
