import type { RefObject } from 'react';

import { useAuth } from '@/hooks/useAuth';

import Input from '../../../Input';

import SvgIcon from '../../../SvgIcon';
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
    <Input.Container borderFocus="none">
      <div className="p-2 flex-shrink-0 mt-auto">
        <ProfilePicture imageSize="sm" src={data.user.profilePictureUrl} />
      </div>

      <Input.AutoGrow
        id="body"
        rows={1}
        formik={formik}
        onFocus={onFocus}
        autoFocus={formik}
        placeholder={!isReply ? 'Add a commentary...' : 'Add a reply...'}
      />

      {loading ? (
        <div className="p-2 mt-auto">
          <SvgIcon className="animate-spin" iconType="CgSpinner" size={24} />
        </div>
      ) : (
        <button className="p-2 mt-auto" type="submit">
          <SvgIcon iconType="IoIosSend" size={24} />
        </button>
      )}
    </Input.Container>
  );
};
export default TextInput;
