import type { ContextFunction } from '@apollo/server';

import type { ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4';

import { decode } from 'next-auth/jwt';

import { User } from '../../domain/entities';

import { cookieParser } from '../../utils/cookie-parser';

import { getFindUserByGithubIdService } from '../factories';

export interface ApolloServerContext {
  user?: User;
}

const AUTH_COOKIE_ID = 'next-auth.session-token';

async function findUserFromCookies(
  cookiesString?: string,
): Promise<User | undefined> {
  if (!cookiesString) {
    return undefined;
  }

  const cookies = cookieParser(cookiesString);

  const authCookie = cookies[AUTH_COOKIE_ID];

  if (!authCookie) {
    return undefined;
  }

  if (!process.env.JWT_SECRET) {
    throw new Error('Enviroment variable JWT_SECRET not found.');
  }

  try {
    const decoded = await decode({
      secret: process.env.JWT_SECRET,
      token: authCookie,
    });

    if (!decoded || !decoded.providerId) {
      return undefined;
    }

    const findUserByGithubId = getFindUserByGithubIdService();

    const userResponse = await findUserByGithubId.handle(decoded.providerId);

    if (!userResponse) {
      return undefined;
    }

    console.log(` `);
    console.log(`SESSION FOUND ${userResponse.id}`);
    console.log(` `);

    return userResponse;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export const createContext: ContextFunction<
  [ExpressContextFunctionArgument],
  ApolloServerContext
> = async ({ req }) => {
  const user = await findUserFromCookies(req.headers.cookie);

  return { user };
};
