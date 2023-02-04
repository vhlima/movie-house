import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import type {
  ReviewSortInput,
  FindUserQuery,
  FindUserQueryVariables,
  FindUserReviewsQuery,
  FindUserReviewsQueryVariables,
} from '../graphql';

import { FindUserDocument, FindUserReviewsDocument } from '../graphql';

interface FetchDataProps {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  username: string;
  sort?: ReviewSortInput;
}

export async function withFetchUserReviews({
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

    const { data: userReviewsData } = await apolloClient.query<
      FindUserReviewsQuery,
      FindUserReviewsQueryVariables
    >({
      query: FindUserReviewsDocument,
      variables: {
        userId: userData.user.id,
        sort,
      },
    });

    return {
      props: {
        ...userData,
        ...userReviewsData,
      },
    };
  } catch (err) {
    throw new Error('An error occurred during fetchPreMadeListMovies');
  }
}