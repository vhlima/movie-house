import type { GetStaticPaths, NextPage, GetStaticProps } from 'next';

import { useRouter } from 'next/router';

import type { UserResponse } from '../../graphql/User/types';

import { FIND_USER } from '../../graphql/User';

import client from '../../api';

import UserProfileView from '../../views/users/profile';

import LoadingSpinner from '../../components/LoadingSpinner';

import ErrorText from '../../components/ErrorText';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const defaultProps = { props: {} };

  const { id } = params;

  if (id) {
    try {
      const { data } = await client.query<UserResponse>({
        query: FIND_USER,
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
  }

  return defaultProps;
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

const UserProfile: NextPage<UserResponse> = ({ user }) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <ErrorText text="User not found" />;
  }

  return <UserProfileView user={user} />;
};

export default UserProfile;
