export interface LikeInput {
  rootId: string;
  referenceId?: string;
}

export interface LikeResponse {
  like: boolean;
}
