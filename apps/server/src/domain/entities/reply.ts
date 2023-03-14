import { Commentary, Timestamps, User } from './index';

export class Reply extends Timestamps {
  id: string;

  userId: string;

  user: User;

  commentaryId: string;

  commentary: Commentary;

  content: string;
}
