import { RESTDataSource } from '@apollo/datasource-rest';
import { IGithubRepository } from '../../data/contracts';

import { GithubUserModel } from '../../data/models';

export class GithubRepository
  extends RESTDataSource
  implements IGithubRepository
{
  constructor() {
    super();
    this.baseURL = 'https://api.github.com/';
  }

  async getGithubUserById(githubId: string): Promise<GithubUserModel | null> {
    const githubUser = await this.get(`/user/${githubId}`);

    return githubUser;
  }
}
