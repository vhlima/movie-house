import type { NextPage, GetServerSideProps } from 'next';

import type { FindUserQuery, FindUserQueryVariables } from '@/gql';

import { FindUserDocument } from '@/gql';

import { Card } from '@/components';
import { initializeApollo } from '../../../client';

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

const UserFollowing: NextPage<FindUserQuery> = ({ user }) => {
  if (!user) {
    // user not found
  }

  return (
    <Card>
      <Card.Header title="Following" marginBottom />

      <Card.Body>
        <UserFollows followType="following" userId={user.id} />
      </Card.Body>
    </Card>
  );
};

export default UserFollowing;
