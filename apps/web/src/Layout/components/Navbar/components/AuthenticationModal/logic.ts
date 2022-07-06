import { useCallback } from 'react';

import { FormikHelpers } from 'formik';

import { SignInCredentials } from '../../../../../types';

import { useAuth } from '../../../../../hooks/useAuth';

type AuthSubmitHandles = (
  values: SignInCredentials,
  helpers: FormikHelpers<SignInCredentials>,
) => Promise<void>;

interface AuthModalLogicHandles {
  handleSubmit: AuthSubmitHandles;
}

interface AuthModalLogicProps {
  onClose: () => void;
}

export const useLogic = ({
  onClose,
}: AuthModalLogicProps): AuthModalLogicHandles => {
  const { user, signIn } = useAuth();

  const handleSubmit: AuthSubmitHandles = useCallback(
    async (values, { setFieldError, setSubmitting }) => {
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
    },
    [user, signIn],
  );

  return {
    handleSubmit,
  };
};
