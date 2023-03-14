export interface SignUp {
  handle(githubId: string): Promise<boolean>;
}
