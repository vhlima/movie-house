import { useRouter } from 'next/router';

import { useAuth } from '../../../../../hooks/useAuth';

import { useProfile } from '../../hooks/useProfile';

import Button from '../../../../../components/Button';

const ProfileButtons: React.FC = () => {
  const { user: authUser } = useAuth();

  const { user } = useProfile();

  const { push } = useRouter();

  const isOwnProfile = authUser && authUser._id === user._id;

  const isFollowing = authUser && authUser.following.includes(user._id);

  return (
    <div className="flex gap-2">
      {!isOwnProfile ? (
        <>
          <Button
            buttonStyle="secondary"
            buttonSize="xs"
            // onClick={() => !isFollowing ? followUser(user._id) : unfollowUser(user._id)}
          >
            {!isFollowing ? 'Follow' : 'Unfollow'}
          </Button>

          <Button buttonStyle="secondary" buttonSize="xs">
            Message
          </Button>
        </>
      ) : (
        <Button
          buttonStyle="secondary"
          buttonSize="xs"
          onClick={() => push('/settings')}
        >
          Profile settings
        </Button>
      )}
    </div>
  );
};

export default ProfileButtons;
