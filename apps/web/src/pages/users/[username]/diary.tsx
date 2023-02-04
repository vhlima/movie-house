import type { NextPage, GetServerSideProps } from 'next';

import * as Yup from 'yup';

import type {
  FindUserListsQuery,
  FindUserListsQueryVariables,
  FindUserQuery,
  FindUserQueryVariables,
} from '../../../graphql';

import { FindUserDocument, FindUserListsDocument } from '../../../graphql';

import { addApolloState, initializeApollo } from '../../../client';

import UserDiariesView from '../../../views/users/diary';

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  const requestValidationSchema = Yup.object().shape({
    username: Yup.string().required(),
  });

  try {
    const { username } = await requestValidationSchema.validate(query);

    const apolloClient = initializeApollo();

    const { data: userData } = await apolloClient.query<
      FindUserQuery,
      FindUserQueryVariables
    >({
      query: FindUserDocument,
      variables: { username },
    });

    if (!userData) {
      res.statusCode = 404;
      return { props: { notFound: true } };
    }

    const { data: userListsData } = await apolloClient.query<
      FindUserListsQuery,
      FindUserListsQueryVariables
    >({
      query: FindUserListsDocument,
      variables: { userId: userData.user.id },
    });

    return addApolloState(apolloClient, {
      props: {
        ...userData,
        ...userListsData,
      },
    });
  } catch (err) {
    res.statusCode = 404;
    return { props: { notFound: true } };
  }
};

type UserDiaryPageProps = FindUserQuery;

const UserDiaryPage: NextPage<UserDiaryPageProps> = ({ user }) => (
  <UserDiariesView user={user} />
);

export default UserDiaryPage;
