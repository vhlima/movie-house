import { User } from '../entities';

export enum LikeType {
  POST = 'POST',
  COMMENTARY = 'COMMENTARY',
  REPLY = 'REPLY',
}

export interface LikeOrDislike {
  handle: (
    contentId: string,
    likeType: LikeType,
    session?: User | undefined,
  ) => Promise<boolean>;
}
