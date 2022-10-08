import type { SchemaOf } from 'yup';

import type { ModalHandles } from '../../../../../../../../components/Modal';

import type { CreateUserListMutationResult } from '../../../../../../../../graphql';

interface CreateMovieListFormValues {
  listName: string;
  description?: string;
}

export type ValidationSchemaType = SchemaOf<CreateMovieListFormValues>;

export type SubmitHandles = (
  values: CreateMovieListFormValues,
) => Promise<void>;

export type CreateMovieListModalLogicProps = ModalHandles;

export interface CreateMovieListModalLogicHandles {
  createUserListResult: CreateUserListMutationResult;

  validationSchema: ValidationSchemaType;

  handleSubmit: SubmitHandles;
}
