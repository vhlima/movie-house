import { UserModel } from '../models';

export interface IUserRepository {
  getUserById(userId: string): Promise<UserModel | null>;
  getUserByUsername(username: string): Promise<UserModel | null>;
  getUserByGithubId(githubId: string): Promise<UserModel | null>;
  createUser(
    githubId: string,
    username: string,
    profilePictureUrl?: string,
  ): Promise<UserModel>;
}
