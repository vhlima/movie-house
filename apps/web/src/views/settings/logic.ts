import { useState } from 'react';

import { useMutation } from '@apollo/client';

import type { MutationResult } from '@apollo/client';

import type { ChangeEvent } from 'react';

import { useAuth } from '../../hooks/useAuth';

interface ProfileSettingsProps {
  username: string;
  realName: string;
  biography: string;
}

type SubmitHandles = (values: ProfileSettingsProps) => Promise<void>;

type AddProfilePictureHandles = (e: ChangeEvent<HTMLInputElement>) => void;

// type UpdateUserResponse = { userUpdate: UserResponse };

interface ProfileSettingsLogicHandles {
  // updateUserResult: MutationResult<UpdateUserResponse>;

  uploadedProfilePictureUrl: string;
  clearUploadedProfilePictureUrl: () => void;

  handleProfilePictureAdd: AddProfilePictureHandles;

  handleSubmit: SubmitHandles;
}

export const useLogic = (): ProfileSettingsLogicHandles => {
  const { user, setUser } = useAuth();

  // const [updateUserMutation, updateUserResult] =
  //   useMutation<UpdateUserResponse>(UPDATE_USER);

  const [uploadedProfilePictureUrl, setUploadedProfilePictureUrl] =
    useState<string>('');

  const clearUploadedProfilePictureUrl = () => {
    setUploadedProfilePictureUrl('');
  };

  // TODO error handling

  const handleSubmit: SubmitHandles = async values => {
    if (!user) return;

    const a = 1;

    // const { data } = await updateUserMutation({
    //   variables: { userId: user._id, data: values },
    // });

    // if (data) {
    //   setUser(data.userUpdate);
    // }
  };

  const handleProfilePictureAdd: AddProfilePictureHandles = e => {
    const { files } = e.currentTarget;

    if (files) {
      // setFieldValue('image_files', files);
      setUploadedProfilePictureUrl(URL.createObjectURL(files[0]));
    }
  };

  return {
    // updateUserResult,

    uploadedProfilePictureUrl,
    clearUploadedProfilePictureUrl,

    handleProfilePictureAdd,

    handleSubmit,
  };
};
