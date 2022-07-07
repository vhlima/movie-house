import { ChangeEvent, useRef, useState } from 'react';

import { NextPage } from 'next';

import { Form, Formik } from 'formik';

import { useAuth } from '../../hooks/useAuth';

import Card from '../../components/Card';

import Input from '../../components/Input';

import Button from '../../components/Button';

import UserProfilePicture from '../../views/users/components/ProfilePicture';

const ProfileSettings: NextPage = () => {
  const { user } = useAuth();

  const [uploadedProfilePictureUrl, setUploadedProfilePictureUrl] =
    useState<string>('');

  const profilePictureInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = () => {
    console.log(`submit`);
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
    <Card className="bg-grey-800" title="Personal settings">
      <Formik
        initialValues={{ ...user, email: '', biography: '' }}
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

          <Button type="submit">Save changes</Button>
        </Form>
      </Formik>
    </Card>
  );
};

export default ProfileSettings;
