import { useRef } from 'react';

import { Form, Formik } from 'formik';

import { useAuth } from '@/hooks/useAuth';

import { Card, Button, Input, ProfilePicture } from '@/components';
import { useLogic } from './logic';

const ProfileSettingsView: React.FC = () => {
  const { data } = useAuth();

  const {
    // updateUserResult,

    uploadedProfilePictureUrl,
    clearUploadedProfilePictureUrl,

    handleProfilePictureAdd,

    handleSubmit,
  } = useLogic();

  // TODO Fetch user realName and biography from other query, no need tokeep it inside useAuth

  const profilePictureInputRef = useRef<HTMLInputElement | null>(null);

  if (!data) {
    return <h1 className="text-danger-base">Must be logged</h1>;
  }

  const fields = [
    { id: 'username', name: 'Username' },
    { id: 'email', name: 'Email' },
    { id: 'biography', name: 'Biography' },
  ];

  return (
    <Card>
      <Card.Header title="Personal settings" marginBottom />

      <Card.Body>
        <Formik
          initialValues={{
            username: data.user.username,
            email: '',
            biography: '',
          }}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <ProfilePicture
                imageSize="lg"
                src={uploadedProfilePictureUrl || data.user.profilePictureUrl}
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

            {fields.map(field => (
              <Input.Label
                key={`settings-field-${field.id}`}
                htmlFor={field.id}
                text={field.name}
              >
                <Input.Container>
                  <Input id={field.id} />
                </Input.Container>
              </Input.Label>
            ))}

            {/* <Button type="submit" disabled={updateUserResult.loading}>
            Save changes
          </Button> */}
          </Form>
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default ProfileSettingsView;
