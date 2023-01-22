import type { RefObject } from 'react';

import { useAuth } from '../../../../hooks/useAuth';

import Input from '../../../Input';

import ProfilePicture from '../../../ProfilePicture';

export type TextInputReference = RefObject<HTMLTextAreaElement>;

interface TextInputHandles {
  onFocus?: () => void;
}

export interface TextInputProps {
  formik?: boolean;
  isReply?: boolean;
  loading?: boolean;
}

type TextInputInternalProps = TextInputProps & TextInputHandles;

const TextInput: React.FC<TextInputInternalProps> = ({
  formik,
  isReply,
  loading,
  onFocus,
}) => {
  const { data } = useAuth();

  if (!data) {
    return null;
  }

  return (
    <Input
      name="body"
      formik={formik}
      autoFocus={formik}
      rows={1}
      autoGrow={formik && { maxHeight: 250 }}
      placeholder={!isReply ? 'Add a commentary...' : 'Add a reply...'}
      rightIcon={
        formik && {
          className: 'p-3 mt-auto text-grey-300',
          type: 'submit',
          icon: {
            className: loading && 'animate-spin',
            iconType: !loading ? 'IoIosSend' : 'CgSpinner',
            size: 24,
          },
        }
      }
      styleProps={{
        showError: false,
        border: false,
        borderFocus: false,
        rounded: !formik,
        roundedTop: formik,
      }}
      onFocus={onFocus}
    >
      <div className="p-3 mt-auto">
        <ProfilePicture imageSize="sm" src={data.user.profilePictureUrl} />
      </div>
    </Input>
  );
};
export default TextInput;
