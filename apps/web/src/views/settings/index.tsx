import { useRef } from 'react';

import { Form, Formik } from 'formik';

import { useAuth } from '../../hooks/useAuth';

import { useLogic } from './logic';

import Card from '../../components/Card';

import Input from '../../components/Input';

import Button from '../../components/Button';

import ProfilePicture from '../../components/ProfilePicture';

const ProfileSettingsView: React.FC = () => {
  const { user } = useAuth();

  const {
    updateUserResult,

    uploadedProfilePictureUrl,
    clearUploadedProfilePictureUrl,

    handleProfilePictureAdd,

    handleSubmit,
  } = useLogic();

  const profilePictureInputRef = useRef<HTMLInputElement | null>(null);

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
            <ProfilePicture
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
                  onClick={clearUploadedProfilePictureUrl}
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
            className="h-36"
            formik
            textarea
            name="biography"
            label={{ text: 'Bio', htmlFor: true }}
          />

          <Button type="submit" disabled={updateUserResult.loading}>
            Save changes
          </Button>
        </Form>
      </Formik>
    </Card>
  );
};

export default ProfileSettingsView;
