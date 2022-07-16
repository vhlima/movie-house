// todo maybe add these types to a shared package

export enum LikeType {
  POST = 'POST',
  MOVIE = 'MOVIE',
  COMMENTARY = 'COMMENTARY',
}

export interface LikeInput {
  likeType: LikeType;
  rootId?: string;
  referenceId: string;
  userId: string;
}

export interface LikeResponse {
  likeOrDislike: boolean;
}
