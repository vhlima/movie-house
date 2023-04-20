import { TextShorter } from '@/components';

import { PostReactions } from './components';

import { UserIdentity } from '../user';

interface Props {
  id: string;
  content?: string;
  commentaryCount: number;
  user?: {
    username: string;
    profilePictureUrl?: string;
  };
}

export const PostMeta: React.FC<Props> = props => {
  const { id, user, content, commentaryCount } = props;

  return (
    <div className="flex flex-col gap-4 mt-4">
      {user && (
        <UserIdentity
          username={user.username}
          profilePictureUrl={user.profilePictureUrl}
        />
      )}

      {content && (
        <TextShorter
          maxCharacters={200}
          text={content}
          data-testid="post-meta-content"
        />
      )}

      <PostReactions postId={id} commentaryCount={commentaryCount} />
    </div>
  );
};
