import { Arg, Mutation, Resolver } from 'type-graphql';

import { getSignUpService } from '../../factories';

@Resolver()
export class AuthResolver {
  @Mutation(() => Boolean)
  async signUp(@Arg('githubId') githubId: string) {
    const signUpService = getSignUpService();

    const signUpResponse = await signUpService.handle(githubId);

    return signUpResponse;
  }
}
