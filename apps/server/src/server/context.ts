import type { ContextFunction } from '@apollo/server';

import type { ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4';

import { decode } from 'next-auth/jwt';

import { cookieParser } from '../utils/cookie-parser';

import { GithubAPI, TmdbAPI } from '../api';

import { UserProviderRepository } from '../repositories';

import { ServerContext } from '../types';

const AUTH_COOKIE_ID = 'next-auth.session-token';

async function findUserFromCookies(cookiesString?: string) {
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

    if (!decoded || !decoded.user || !decoded.user.providerId) {
      return undefined;
    }

    // Find the user by providerId from decoded token
    const providerUser = await UserProviderRepository.findOne({
      where: { providerId: decoded.user.providerId },
      relations: ['user'],
    });

    if (!providerUser) {
      return undefined;
    }

    console.log(` `);
    console.log(`SESSION FOUND ${providerUser.userId}`);
    console.log(` `);

    return providerUser.user;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export const context: ContextFunction<
  [ExpressContextFunctionArgument],
  ServerContext
> = async ({ req }) => {
  const dataSources = () => ({
    tmdb: new TmdbAPI(),
    github: new GithubAPI(),
  });

  const user = await findUserFromCookies(req.headers.cookie);

  return { dataSources: dataSources(), user };
};
