import React from 'react';

import { Formik, Form, FormikHelpers } from 'formik';

import { populateJSON } from '../../../../../data/populate';

import { useAuth } from '../../../../../hooks/useAuth';

import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';
import FieldLabel from '../../../../../components/FieldLabel';
import Backdrop from '../../../../../components/Backdrop';
import Modal from '../../../../../components/Modal';
import { SignInCredentials } from '../../../../../types';

interface AuthenticationModalProps {
  onClose: () => void;
}

const AuthenticationModal: React.FC<AuthenticationModalProps> = ({
  onClose,
}) => {
  const { user, signIn } = useAuth();

  const handleSubmit = async (
    values: SignInCredentials,
    { setFieldError, setSubmitting }: FormikHelpers<SignInCredentials>,
  ) => {
    if (!user) {
      try {
        const result = await signIn(values);

        if (!result.errors) {
          onClose();
          return;
        }
      } catch (err) {
        setFieldError('username', err);
      }

      setSubmitting(false);
    }
  };

  return (
    <Modal portalId="modalPortal">
      <Backdrop onClick={onClose}>
        <div
          className="fixed top-1/4 left-1/2 transform -translate-x-1/2 w-11/12 bg-grey-800 rounded-md z-50"
          role="presentation"
          onClick={e => e.stopPropagation()}
        >
          <Button buttonStyle="tertiary" onClick={() => populateJSON()}>
            Populate database
          </Button>

          <Formik initialValues={{ username: '' }} onSubmit={handleSubmit}>
            <Form className="flex flex-col gap-3 p-4">
              <FieldLabel label="Username" htmlFor="username">
                <Input
                  formik
                  name="username"
                  placeholder="Username"
                  leftIcon="HiMail"
                />
              </FieldLabel>

              {/* <FieldLabel label="Password" htmlFor="password">
                <Input
                  formik
                  type="password"
                  name="password"
                  placeholder="Password"
                  leftIcon="HiLockClosed"
                />
              </FieldLabel> */}

              <div className="flex gap-1">
                <span className="text-grey-200">Forgot your password?</span>

                <span className="text-grey-100 cursor-pointer hover:text-grey-200">
                  Reset here
                </span>
              </div>

              <div className="flex gap-1">
                <span className="text-grey-200">Dont have an account?</span>

                <span className="text-grey-100 cursor-pointer hover:text-grey-200">
                  Register now
                </span>
              </div>

              <Button type="submit">Submit</Button>
            </Form>
          </Formik>
        </div>
      </Backdrop>
    </Modal>
  );
};

export default AuthenticationModal;
