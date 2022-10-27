import { RESTDataSource } from 'apollo-datasource-rest';

interface GithubUser {
  id: number;
  login: string;
  /* eslint-disable-next-line */
  avatar_url: string;
  name: string;
}

export default class GithubAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.github.com/';
  }

  async getGithubUserById(githubId: number): Promise<GithubUser> {
    const githubUser = await this.get(`/user/${githubId}`);

    return githubUser;
  }
}
