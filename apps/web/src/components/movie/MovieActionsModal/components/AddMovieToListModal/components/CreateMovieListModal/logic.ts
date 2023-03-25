import * as Yup from 'yup';

import type {
  FindUserListsNamesQuery,
  FindUserListsNamesQueryVariables,
} from '@/graphql';

import { FindUserListsNamesDocument, useCreateListMutation } from '@/graphql';

import { useAuth } from '@/hooks/useAuth';

interface CreateMovieListFormValues {
  listName: string;
  description?: string;
}

type ValidationSchemaType = Yup.SchemaOf<CreateMovieListFormValues>;

export const useLogic = () => {
  const { data: session } = useAuth();

  const [createList, createListResult] = useCreateListMutation();

  async function handleSubmit({
    listName,
    description,
  }: CreateMovieListFormValues) {
    const result = await createList({
      variables: {
        listName,
        content: description,
      },
      update: (cache, { data }) => {
        if (!data) return;

        cache.updateQuery<
          FindUserListsNamesQuery,
          FindUserListsNamesQueryVariables
        >(
          {
            query: FindUserListsNamesDocument,
            variables: { userId: session.user.id },
          },
          cacheData => ({
            userListNames: !cacheData
              ? [data.createList]
              : [...cacheData.userListNames, data.createList],
          }),
        );
      },
    });

    return !result?.data;
  }

  const validationSchema: ValidationSchemaType = Yup.object().shape({
    listName: Yup.string().required(
      'You must provide a name to the list you are trying to create',
    ),
    description: Yup.string(),
  });

  return {
    createListResult,

    validationSchema,

    handleSubmit,
  };
};
