import type { RefObject } from 'react';

import { useAuth } from '../../../../hooks/useAuth';

import type { InputIconButtonProps } from '../../../Input/Icon';

import Input from '../../../Input';

import ProfilePicture from '../../../ProfilePicture';

export type TextInputReference = RefObject<HTMLTextAreaElement>;

interface TextInputHandles {
  onFocus?: () => void;
  onKeyUp?: () => void;
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
  onKeyUp,
}) => {
  const { user } = useAuth();

  // TODO user required

  const rightIcon: InputIconButtonProps = {
    className: 'p-3 mt-auto text-grey-300',
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
      // rows={1}
      // textarea
      autoGrow={{ maxHeight: 250 }}
      formik={formik}
      rounded={false}
      roundedTop={formik}
      border={false}
      showError={false}
      onFocus={onFocus}
      reference={reference}
      borderFocus={!formik}
      onKeyUp={onKeyUp}
      // style={formik && { maxHeight: '200px', overflowY: 'auto' }}
      autoFocus={formik}
      placeholder={!isReply ? 'Add a commentary...' : 'Add a reply...'}
      rightIcon={formik && rightIcon}
    >
      <div className="p-3 mt-auto">
        <ProfilePicture imageSize="sm" src={user.profilePicture} />
      </div>
    </Input>
  );
};
export default TextInput;
