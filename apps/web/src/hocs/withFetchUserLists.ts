import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import type {
  ListSortInput,
  FindUserQuery,
  FindUserQueryVariables,
  FindUserListsQuery,
  FindUserListsQueryVariables,
} from '../graphql';

import { FindUserDocument, FindUserListsDocument } from '../graphql';

interface FetchDataProps {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  username: string;
  sort?: ListSortInput;
}

export async function withFetchUserLists({
  apolloClient,
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

    const { data: userListsData } = await apolloClient.query<
      FindUserListsQuery,
      FindUserListsQueryVariables
    >({
      query: FindUserListsDocument,
      variables: { userId: userData.user.id, sort },
    });

    return {
      props: {
        ...userData,
        ...userListsData,
      },
    };
  } catch (err) {
    throw new Error('An error occurred during fetchUserLists');
  }
}
