import {
  FollowModel,
  PaginationInputModel,
  PaginationPreResponseModel,
} from '../models';

export interface IFollowRepository {
  getUserFollowers(
    userId: string,
    props: PaginationInputModel,
  ): Promise<PaginationPreResponseModel<FollowModel>>;
  getUserFollowings(
    userId: string,
    props: PaginationInputModel,
  ): Promise<PaginationPreResponseModel<FollowModel>>;

  isFollowing(userId: string, followingId: string): Promise<boolean>;

  createFollow(userId: string, followingId: string): Promise<boolean>;

  deleteFollow(userId: string, followingId: string): Promise<boolean>;
}
