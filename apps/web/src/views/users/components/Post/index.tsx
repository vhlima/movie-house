import React, { PropsWithChildren } from 'react';

import { useAuth } from '../../../../hooks/useAuth';

import LikeAndComment from '../../../../components/LikeAndComment';

import Interaction, { InteractionProps } from '../Interaction';

/*
  A post could be: Movie List, Movie Review
*/

const Post: React.FC<PropsWithChildren<InteractionProps>> = ({
  children,
  ...interactionProps
}) => {
  const { user } = useAuth();

  if (!user) return <h1>user not found</h1>;

  return (
    <Interaction header={children} {...interactionProps}>
      <LikeAndComment
        likes={2928}
        commentaries={2928}
        liked={false}
        onLike={() => ({})}
      />
    </Interaction>
  );
};

export default Post;
