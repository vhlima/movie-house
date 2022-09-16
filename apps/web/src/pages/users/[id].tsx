import type { GetStaticPaths, NextPage, GetStaticProps } from 'next';

import { useRouter } from 'next/router';

import type {
  User,
  FindUserQuery,
  FindUserQueryVariables,
} from '../../graphql';

import { FindUserDocument } from '../../graphql';

import client from '../../api';

import UserProfileView from '../../views/users/profile';

import LoadingSpinner from '../../components/LoadingSpinner';

import ErrorText from '../../components/ErrorText';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const defaultProps = { props: {} };

  const { id } = params;

  if (!id || typeof id !== 'string') return defaultProps;

  try {
    const { data } = await client.query<FindUserQuery, FindUserQueryVariables>({
      query: FindUserDocument,
      variables: { userId: id },
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

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

const UserProfile: NextPage<FindUserQuery> = ({ user }) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <ErrorText text="User not found" />;
  }

  return <UserProfileView user={user as User} />;
};

export default UserProfile;
