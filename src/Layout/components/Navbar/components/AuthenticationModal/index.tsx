import React from 'react';

import { Formik, Form } from 'formik';

import { populateJSON } from '../../../../../data/populate';

import { useAuth } from '../../../../../hooks/useAuth';

import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';
import FieldLabel from '../../../../../components/FieldLabel';
import Backdrop from '../../../../../components/Backdrop';

interface AuthenticationModalProps {
  onSubmit: () => void;
  onClose: () => void;
}

const AuthenticationModal: React.FC<AuthenticationModalProps> = ({
  onSubmit,
  onClose,
}) => {
  const { user, signIn, signOut } = useAuth();

  const handleSubmit = async () => {
    if (!user) {
      await signIn({ login: 'abc', password: 'abc' });
    } else {
      await signOut();
    }

    onSubmit();
  };

  return (
    <Backdrop onClick={onClose}>
      <div
        className="fixed top-1/4 left-1/2 transform -translate-x-1/2 w-11/12 bg-grey-800 rounded-md z-50"
        role="presentation"
        onClick={e => e.stopPropagation()}
      >
        <Button buttonStyle="tertiary" onClick={() => populateJSON()}>
          Populate database
        </Button>

        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col gap-3 p-4">
            <FieldLabel label="Email" htmlFor="email">
              <Input formik type="email" name="email" placeholder="Email" />
            </FieldLabel>

            <FieldLabel label="Password" htmlFor="password">
              <Input
                formik
                type="password"
                name="password"
                placeholder="Password"
              />
            </FieldLabel>

            <div className="flex gap-1">
              <span className="text-gray-200">Forgot your password?</span>

              <span className="text-movieHouse-mid cursor-pointer">
                Reset here
              </span>
            </div>

            <div className="flex gap-1">
              <span className="text-gray-200">Dont have an account?</span>

              <span className="text-movieHouse-mid cursor-pointer">
                Register now
              </span>
            </div>

            <Button type="submit">Submit</Button>
          </Form>
        </Formik>
      </div>
    </Backdrop>
  );
};

export default AuthenticationModal;
