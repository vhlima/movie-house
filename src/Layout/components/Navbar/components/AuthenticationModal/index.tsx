import React from 'react';

import { Formik, Form } from 'formik';

import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';
import FieldLabel from '../../../../../components/FieldLabel';

interface AuthenticationModalProps {
  onSubmit: () => void;
}

const AuthenticationModal: React.FC<AuthenticationModalProps> = ({
  onSubmit,
}) => {
  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 w-11/12 bg-complementary rounded-md z-50">
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
            <span className="text-secondary">Forgot your password?</span>

            <span className="text-primary cursor-pointer">Reset here</span>
          </div>

          <div className="flex gap-1">
            <span className="text-secondary">Dont have an account?</span>

            <span className="text-primary cursor-pointer">Register now</span>
          </div>

          <Button type="submit">Submit</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default AuthenticationModal;
