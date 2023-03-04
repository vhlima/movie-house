import { Timestamps } from './timestamps';

import { User } from './user';

export class Follow extends Timestamps {
  id: string;

  followerId: string;

  follower: User;

  followedId: string;

  followed: User;
}
