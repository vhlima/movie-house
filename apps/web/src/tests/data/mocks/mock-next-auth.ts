import { SessionContextValue, useSession } from 'next-auth/react';

jest.mock('next-auth/react');

export const mockedSession = useSession as jest.Mock;

export function mockSessionValue(session: SessionContextValue) {
  mockedSession.mockReturnValue(session);
}
