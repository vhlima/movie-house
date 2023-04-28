import type { NextPage, GetServerSideProps } from 'next';

import * as Yup from 'yup';

import type {
  FindUserQuery,
  FindUserQueryVariables,
  FindReviewsQuery,
  FindReviewsQueryVariables,
  ReviewSortInput,
} from '@/gql';

import { ReviewSortType, FindUserDocument, FindReviewsDocument } from '@/gql';

import { addApolloState, initializeApollo } from '../../../../client';

import UserReviewsView from '../../../../views/users/reviews';

const movieReferenceSortTypes = [
  {
    route: 'year',
    sortType: ReviewSortType.Year,
  },
  {
    route: 'recent',
    sortType: ReviewSortType.Recent,
  },
  {
    route: 'popular',
    sortType: ReviewSortType.Popular,
  },
  {
    route: 'older',
    sortType: ReviewSortType.Older,
  },
] as Array<{ route: string; sortType: ReviewSortType }>;

function findSortType(route: string) {
  return movieReferenceSortTypes.find(
    type => type.route === route.toLowerCase(),
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const requestValidationSchema = Yup.object().shape({
    username: Yup.string().required(),
    page: Yup.number().min(1).max(100),
    sort: Yup.array()
      .notRequired()
      .of(Yup.string())
      .min(2)
      .max(2)
      .test('test-sort-params', 'Expected [sortType, sortValue]', value =>
        !value || value.length < 2 ? true : !!findSortType(value[0]),
      ),
  });

  try {
    const { username, page, sort } = await requestValidationSchema.validate(
      query,
    );

    const apolloClient = initializeApollo();

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

    const sortInput: ReviewSortInput | null =
      sort && sort.length > 0
        ? {
            type: findSortType(sort[0]).sortType,
            filter: sort[1],
          }
        : null;

    const { data: userReviewsData } = await apolloClient.query<
      FindReviewsQuery,
      FindReviewsQueryVariables
    >({
      query: FindReviewsDocument,
      variables: {
        userId: userData.user.id,
        page: page || 1,
        sort: sortInput,
      },
    });

    return addApolloState(apolloClient, {
      props: {
        ...userData,
        ...userReviewsData,
      },
    });
  } catch (err) {
    return { notFound: true };
  }
};

type PageProps = FindUserQuery & FindReviewsQuery;

const UserReviewsPage: NextPage<PageProps> = ({ ...props }) => (
  <UserReviewsView {...props} />
);

export default UserReviewsPage;
