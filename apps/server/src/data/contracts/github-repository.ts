import { GithubUserModel } from '../models';

export interface IGithubRepository {
  getGithubUserById(githubId: string): Promise<GithubUserModel | null>;
}
