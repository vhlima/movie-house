/* eslint-disable import/no-extraneous-dependencies */
import mockRouter from 'next-router-mock';

import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

export const mockedRouter = mockRouter;

export const MockedRouterProvider = MemoryRouterProvider;
/* eslint-disable global-require */
jest.mock('next/router', () => require('next-router-mock'));
