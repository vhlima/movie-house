import { GetServerSideProps } from 'next';

import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import * as Yup from 'yup';

import type {
  MovieSortArgs,
  FindUserQuery,
  FindUserQueryVariables,
  FindUserPreMadeListMoviesQuery,
  FindUserPreMadeListMoviesQueryVariables,
} from '../graphql';

import {
  PreMadeListType,
  FindUserDocument,
  FindUserPreMadeListMoviesDocument,
} from '../graphql';

interface FetchDataProps {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  username: string;
  listType: PreMadeListType;
  sort?: MovieSortArgs;
}

export async function withFetchPreMadeListMovies({
  apolloClient,
  listType,
  username,
  sort,
}: FetchDataProps): Promise<{ props: Record<string, unknown> }> {
  try {
    const { data: userData } = await apolloClient.query<
      FindUserQuery,
      FindUserQueryVariables
    >({
      query: FindUserDocument,
      variables: { username },
    });

    if (!userData) {
      throw new Error('User not found');
    }

    const { data: moviesData } = await apolloClient.query<
      FindUserPreMadeListMoviesQuery,
      FindUserPreMadeListMoviesQueryVariables
    >({
      query: FindUserPreMadeListMoviesDocument,
      variables: {
        userId: userData.user.id,
        page: 1,
        listType,
        sort,
      },
    });

    return {
      props: {
        ...userData,
        ...moviesData,
      },
    };
  } catch (err) {
    throw new Error('An error occurred during fetchPreMadeListMovies');
  }
}
