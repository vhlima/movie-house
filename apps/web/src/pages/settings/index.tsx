import { useRef, useState } from 'react';

import type { ChangeEvent } from 'react';

import { NextPage } from 'next';

import { Form, Formik } from 'formik';

import { useMutation } from '@apollo/client';

import type { UserResponse } from '../../types/user';

import { useAuth } from '../../hooks/useAuth';

import { UPDATE_USER } from '../../graphql/user';

import Card from '../../components/Card';

import Input from '../../components/Input';

import Button from '../../components/Button';

import UserProfilePicture from '../../views/users/components/ProfilePicture';

interface ProfileSettingsProps {
  username: string;
  realName: string;
  biography: string;
}

const ProfileSettings: NextPage = () => {
  const { user, setUser } = useAuth();

  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const [updateUserMutation] = useMutation<{ updateUser: UserResponse }>(
    UPDATE_USER,
  );

  const [uploadedProfilePictureUrl, setUploadedProfilePictureUrl] =
    useState<string>('');

  const profilePictureInputRef = useRef<HTMLInputElement | null>(null);

  // TODO error handling

  const handleSubmit = async (values: ProfileSettingsProps) => {
    if (!user || isSubmitting) return;

    setSubmitting(true);

    const userResponse = await updateUserMutation({
      variables: { userId: user._id, data: values },
    });

    if (userResponse.data) {
      setUser(userResponse.data.updateUser);
    }

    setSubmitting(false);
  };

  const handleProfilePictureAdd = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;

    if (files) {
      // setFieldValue('image_files', files);
      setUploadedProfilePictureUrl(URL.createObjectURL(files[0]));
    }
  };

  if (!user) {
    return <h1 className="text-danger-base">Must be logged</h1>;
  }

  return (
    <Card title="Personal settings">
      <Formik
        initialValues={{
          username: user.username,
          realName: user.realName,
          biography: user.biography,
          email: user.email,
        }}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <UserProfilePicture
              imageSize="lg"
              src={uploadedProfilePictureUrl || user.profilePicture}
            />

            <input
              className="hidden"
              type="file"
              accept="image/*"
              name="profilePictureFile"
              ref={profilePictureInputRef}
              onChange={handleProfilePictureAdd}
            />

            <div className="flex flex-col gap-2 w-full">
              <Button
                buttonStyle="secondary"
                onClick={() => profilePictureInputRef?.current.click()}
              >
                Upload profile picture
              </Button>

              {uploadedProfilePictureUrl && (
                <Button
                  buttonStyle="danger"
                  onClick={() => setUploadedProfilePictureUrl('')}
                >
                  Remove uploaded picture
                </Button>
              )}
            </div>
          </div>

          <Input
            formik
            name="username"
            label={{ text: 'Username', htmlFor: true }}
          />

          <Input
            formik
            name="realName"
            label={{ text: 'Real name', htmlFor: true }}
          />

          <Input
            formik
            type="email"
            name="email"
            label={{ text: 'Email', htmlFor: true }}
          />

          <Input
            formik
            textarea
            name="biography"
            label={{ text: 'Bio', htmlFor: true }}
          />

          <Button type="submit" disabled={isSubmitting}>
            Save changes
          </Button>
        </Form>
      </Formik>
    </Card>
  );
};

export default ProfileSettings;
