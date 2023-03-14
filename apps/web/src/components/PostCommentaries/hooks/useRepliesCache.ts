import { useApolloClient } from '@apollo/client';

import type {
  FindRepliesQuery,
  FindRepliesQueryVariables as GraphQLFindRepliesQueryVariables,
} from '../../../graphql';

import { FindRepliesDocument } from '../../../graphql';

type FindRepliesQueryVariables = Omit<GraphQLFindRepliesQueryVariables, 'page'>;

export const useRepliesCache = (commentaryId: string) => {
  const { cache } = useApolloClient();

  function deleteReplies() {
    const cachedReplies = cache.readQuery<
      FindRepliesQuery,
      FindRepliesQueryVariables
    >({
      query: FindRepliesDocument,
      variables: { commentaryId },
    });

    if (!cachedReplies) {
      return;
    }

    /* Remove each reply from cache based on apollo's cache id */
    cachedReplies.replies.edges.forEach(reply => {
      cache.evict({ id: `${reply.node.__typename}:${reply.node.id}` });
    });

    // TODO cache.gc is not removing replies mutation from ROOT QUERY

    /*
      Evicting an object often makes other cached objects unreachable. 
      Because of this, you should call cache.gc after evicting one or 
      more objects from the cache.
    */
    cache.gc();
  }

  // cache.evict({ id:  })

  function updateCache(callback: (cacheData: FindRepliesQuery) => void) {
    cache.updateQuery<FindRepliesQuery, FindRepliesQueryVariables>(
      {
        query: FindRepliesDocument,
        variables: { commentaryId },
      },
      cacheData => callback(cacheData),
    );
  }

  return {
    deleteReplies,
    updateCache,
  };
};
