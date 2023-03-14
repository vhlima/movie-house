import { User } from '../entities';

export interface FindUserByGithubId {
  handle(githubId: string): Promise<User>;
}
