/* eslint-disable import/no-extraneous-dependencies */
import mockRouter from 'next-router-mock';

export const mockedRouter = mockRouter;

/* eslint-disable global-require */
jest.mock('next/router', () => require('next-router-mock'));
