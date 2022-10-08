import * as Yup from 'yup';

import type {
  SubmitHandles,
  ValidationSchemaType,
  CreateMovieListModalLogicProps,
  CreateMovieListModalLogicHandles,
} from './types';

import type {
  FindUserListsQuery,
  FindUserListsQueryVariables,
} from '../../../../../../../../graphql';

import {
  FindUserListsDocument,
  useCreateUserListMutation,
} from '../../../../../../../../graphql';

import { useAuth } from '../../../../../../../../hooks/useAuth';

export const useLogic = ({
  onClose,
}: CreateMovieListModalLogicProps): CreateMovieListModalLogicHandles => {
  const { user } = useAuth();

  const [createUserList, createUserListResult] = useCreateUserListMutation();

  const handleSubmit: SubmitHandles = async ({ listName, description }) => {
    const { errors } = await createUserList({
      variables: {
        name: listName,
        body: description || '',
      },
      update: (cache, { data }) => {
        if (!data) return;

        cache.updateQuery<FindUserListsQuery, FindUserListsQueryVariables>(
          {
            query: FindUserListsDocument,
            variables: { userId: user.id },
          },
          cacheData => ({
            userLists: [...(cacheData?.userLists || []), data.createUserList],
          }),
        );
      },
    });

    if (!errors) {
      onClose();
    }
  };

  const validationSchema: ValidationSchemaType = Yup.object().shape({
    listName: Yup.string().required(
      'Name is a required field to create a list',
    ),
    description: Yup.string(),
  });

  return {
    createUserListResult,

    validationSchema,

    handleSubmit,
  };
};
