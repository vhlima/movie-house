import { useCallback } from 'react';

import { FormikHelpers } from 'formik';

import type { SignInMutationVariables } from '../../../../../graphql';

import { useAuth } from '../../../../../hooks/useAuth';

type AuthSubmitHandles = (
  values: SignInMutationVariables,
  helpers: FormikHelpers<SignInMutationVariables>,
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
          const signInResponse = await signIn(values);

          if (signInResponse) {
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
