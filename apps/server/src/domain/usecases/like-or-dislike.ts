import { User } from '../entities';

import { LikeType } from '../enums';

export interface LikeOrDislike {
  handle: (
    contentId: string,
    likeType: LikeType,
    session?: User | undefined,
  ) => Promise<boolean>;
}
