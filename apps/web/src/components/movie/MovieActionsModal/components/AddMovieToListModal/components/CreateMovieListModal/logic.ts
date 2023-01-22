import * as Yup from 'yup';

import type {
  FindUserListNamesQuery,
  FindUserListNamesQueryVariables,
} from '../../../../../../../graphql';

import {
  FindUserListNamesDocument,
  useCreateUserListMutation,
} from '../../../../../../../graphql';

import { useAuth } from '../../../../../../../hooks/useAuth';

interface CreateMovieListFormValues {
  listName: string;
  description?: string;
}

type ValidationSchemaType = Yup.SchemaOf<CreateMovieListFormValues>;

export const useLogic = () => {
  const { data: session } = useAuth();

  const [createUserList, createUserListResult] = useCreateUserListMutation();

  async function handleSubmit({
    listName,
    description,
  }: CreateMovieListFormValues) {
    const { errors } = await createUserList({
      variables: {
        name: listName,
        body: description || '',
      },
      update: (cache, { data }) => {
        if (!data) return;

        cache.updateQuery<
          FindUserListNamesQuery,
          FindUserListNamesQueryVariables
        >(
          {
            query: FindUserListNamesDocument,
            variables: { userId: session.user.id },
          },
          cacheData => ({
            userLists: !cacheData
              ? [data.userListCreate]
              : [...cacheData.userLists, data.userListCreate],
          }),
        );
      },
    });

    return !errors;
  }

  const validationSchema: ValidationSchemaType = Yup.object().shape({
    listName: Yup.string().required(
      'You must provide a name to the list you are trying to create',
    ),
    description: Yup.string(),
  });

  return {
    createUserListResult,

    validationSchema,

    handleSubmit,
  };
};
