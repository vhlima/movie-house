import type { PropsWithChildren, ReactElement, ReactNode } from 'react';

import type { QueryResult } from '@apollo/client';

import ErrorText from '../ErrorText';

import LoadingSpinner from '../LoadingSpinner';

type QueryStateProps = Pick<QueryResult<unknown, unknown>, 'error' | 'loading'>;

const QueryState: React.FC<PropsWithChildren<QueryStateProps>> = ({
  error,
  loading,
  children,
}) => {
  if (loading) {
    return <LoadingSpinner center data-testid="loading-state" />;
  }

  if (error) {
    return <ErrorText text={`Error loading query state: ${error.message}`} />;
  }

  return children as ReactNode & ReactElement;
};

export default QueryState;
