import type { NextPage, GetServerSideProps } from 'next';

import type { FindUserQuery, FindUserQueryVariables } from '@/graphql';

import { FindUserDocument } from '@/graphql';

import { initializeApollo } from '../../../client';

import Card from '../../../components/Card';

import UserFollows from '../../../views/users/follows';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const defaultProps = { props: {} };

  const { username } = params;

  if (!username || typeof username !== 'string') return defaultProps;

  try {
    const apolloClient = initializeApollo();

    const { data } = await apolloClient.query<
      FindUserQuery,
      FindUserQueryVariables
    >({
      query: FindUserDocument,
      variables: { username },
    });

    if (!data) return defaultProps;

    return {
      props: {
        user: data.user,
      },
    };
  } catch (err) {
    return defaultProps;
  }

  return defaultProps;
};

const UserFollowers: NextPage<FindUserQuery> = ({ user }) => {
  if (!user) {
    // user not found
  }

  return (
    <Card>
      <Card.Header title="Followers" marginBottom />

      <Card.Body>
        <UserFollows followType="followers" userId={user.id} />
      </Card.Body>
    </Card>
  );
};

export default UserFollowers;
