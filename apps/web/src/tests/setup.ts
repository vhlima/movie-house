/* eslint-disable */
import '@testing-library/jest-dom';

import { createContext } from 'react';

jest.mock('next/dist/shared/lib/router-context.js', () => ({
  RouterContext: createContext(true),
}));
