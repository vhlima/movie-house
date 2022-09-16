import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Cast = {
  __typename?: 'Cast';
  adult: Scalars['Boolean'];
  castId: Scalars['Int'];
  character: Scalars['String'];
  creditId: Scalars['String'];
  gender: Scalars['Int'];
  id: Scalars['Int'];
  knownForDepartment: Scalars['String'];
  name: Scalars['String'];
  order: Scalars['Int'];
  originalName: Scalars['String'];
  popularity: Scalars['Float'];
  profilePath?: Maybe<Scalars['String']>;
  profilePictureUrl: Scalars['String'];
};

export type Commentaries = {
  __typename?: 'Commentaries';
  edges: Array<CommentariesPaginationEdge>;
  pageInfo: CommentariesPaginationInfo;
};

export type CommentariesPaginationEdge = {
  __typename?: 'CommentariesPaginationEdge';
  cursor: Scalars['String'];
  node: Commentary;
};

export type CommentariesPaginationInfo = {
  __typename?: 'CommentariesPaginationInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  maxItems: Scalars['Int'];
};

export type Commentary = {
  __typename?: 'Commentary';
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  likes: Array<Like>;
  postId: Scalars['ID'];
  replyCount: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type Company = {
  __typename?: 'Company';
  id: Scalars['String'];
  logoPath?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  originCountry: Scalars['String'];
};

export type Crew = {
  __typename?: 'Crew';
  adult: Scalars['Boolean'];
  creditId: Scalars['String'];
  department: Scalars['String'];
  gender: Scalars['Int'];
  id: Scalars['Int'];
  job: Scalars['Int'];
  knownForDepartment: Scalars['String'];
  name: Scalars['String'];
  originalName: Scalars['String'];
  popularity: Scalars['Float'];
  profilePath?: Maybe<Scalars['String']>;
  profilePictureUrl: Scalars['String'];
};

export type Follow = {
  __typename?: 'Follow';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  targetUser: User;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type Followers = {
  __typename?: 'Followers';
  edges: Array<FollowersPaginationEdge>;
  pageInfo: FollowersPaginationInfo;
};

export type FollowersPaginationEdge = {
  __typename?: 'FollowersPaginationEdge';
  cursor: Scalars['String'];
  node: Follow;
};

export type FollowersPaginationInfo = {
  __typename?: 'FollowersPaginationInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  maxItems: Scalars['Int'];
};

export type Genre = {
  __typename?: 'Genre';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Language = {
  __typename?: 'Language';
  englishName: Scalars['String'];
  iso6391: Scalars['String'];
  name: Scalars['String'];
};

export type Like = {
  __typename?: 'Like';
  id: Scalars['ID'];
  referenceId?: Maybe<Scalars['ID']>;
  rootId: Scalars['ID'];
  user: User;
};

export type Movie = {
  __typename?: 'Movie';
  backdropUrl: Scalars['String'];
  credits: MovieCredits;
  genres: Array<Genre>;
  id: Scalars['Int'];
  imdbId: Scalars['String'];
  originalLanguage: Scalars['String'];
  originalTitle: Scalars['String'];
  overview: Scalars['String'];
  posterUrl: Scalars['String'];
  productionCompanies: Array<Company>;
  releaseDate?: Maybe<Scalars['DateTime']>;
  runtime: Scalars['Int'];
  spokenLanguages: Array<Language>;
  voteAverage: Scalars['Float'];
};

export type MovieCredits = {
  __typename?: 'MovieCredits';
  cast: Array<Cast>;
  crew: Array<Crew>;
  id: Scalars['String'];
};

export type MovieSearch = {
  __typename?: 'MovieSearch';
  page: Scalars['Int'];
  results: Array<Movie>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMovieToCustomList: UserListCustomMovie;
  addMovieToList: UserListPremadeMovie;
  comment: Commentary;
  createReview: Review;
  createUserList: UserListCustom;
  deleteCommentary: Scalars['String'];
  deleteReply: Scalars['String'];
  deleteReview: Scalars['String'];
  follow: Scalars['Boolean'];
  like: Scalars['Boolean'];
  login: User;
  pinReview: Review;
  register: User;
  removeMovieFromCustomList: Scalars['String'];
  removeMovieFromList: Scalars['String'];
  reply: Reply;
  updateReview: Review;
  updateUser: User;
};

export type MutationAddMovieToCustomListArgs = {
  listId: Scalars['String'];
  movieId: Scalars['Int'];
};

export type MutationAddMovieToListArgs = {
  listType: UserListType;
  movieId: Scalars['Int'];
};

export type MutationCommentArgs = {
  body: Scalars['String'];
  postId: Scalars['String'];
};

export type MutationCreateReviewArgs = {
  body: Scalars['String'];
  movieId: Scalars['Int'];
};

export type MutationCreateUserListArgs = {
  body: Scalars['String'];
  name: Scalars['String'];
};

export type MutationDeleteCommentaryArgs = {
  commentaryId: Scalars['String'];
};

export type MutationDeleteReplyArgs = {
  replyId: Scalars['String'];
};

export type MutationDeleteReviewArgs = {
  reviewId: Scalars['String'];
};

export type MutationFollowArgs = {
  userId: Scalars['String'];
};

export type MutationLikeArgs = {
  referenceId?: InputMaybe<Scalars['String']>;
  rootId: Scalars['String'];
};

export type MutationLoginArgs = {
  username: Scalars['String'];
};

export type MutationPinReviewArgs = {
  reviewId: Scalars['String'];
};

export type MutationRegisterArgs = {
  username: Scalars['String'];
};

export type MutationRemoveMovieFromCustomListArgs = {
  listId: Scalars['String'];
  movieId: Scalars['Int'];
};

export type MutationRemoveMovieFromListArgs = {
  listType: UserListType;
  movieId: Scalars['Int'];
};

export type MutationReplyArgs = {
  body: Scalars['String'];
  commentaryId: Scalars['String'];
};

export type MutationUpdateReviewArgs = {
  body: Scalars['String'];
  reviewId: Scalars['String'];
};

export type MutationUpdateUserArgs = {
  data: UserInput;
  userId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  commentaries: Commentaries;
  favoriteMovies: Array<UserListPremadeMovie>;
  followerCount: Scalars['Int'];
  followers: Followers;
  following: Followers;
  followingCount: Scalars['Int'];
  isFollowing: Scalars['Boolean'];
  movie: Movie;
  pinnedReviews: Array<Review>;
  popularReviews: Array<Review>;
  recentReviews: Array<Review>;
  replies: Replies;
  review: Review;
  reviews: Array<Review>;
  searchMovie: MovieSearch;
  user: User;
  userList: UserListCustom;
  userLists: Array<UserListCustom>;
  userProfile: UserProfile;
  watchLater: Array<UserListPremadeMovie>;
  watched: Array<UserListPremadeMovie>;
  watchlist: Array<UserListPremadeMovie>;
};

export type QueryCommentariesArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  postId: Scalars['String'];
};

export type QueryFavoriteMoviesArgs = {
  userId: Scalars['String'];
};

export type QueryFollowerCountArgs = {
  userId: Scalars['String'];
};

export type QueryFollowersArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  userId: Scalars['String'];
};

export type QueryFollowingArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  userId: Scalars['String'];
};

export type QueryFollowingCountArgs = {
  userId: Scalars['String'];
};

export type QueryIsFollowingArgs = {
  userId: Scalars['String'];
};

export type QueryMovieArgs = {
  movieId: Scalars['Int'];
};

export type QueryPinnedReviewsArgs = {
  userId: Scalars['String'];
};

export type QueryPopularReviewsArgs = {
  userId: Scalars['String'];
};

export type QueryRecentReviewsArgs = {
  userId: Scalars['String'];
};

export type QueryRepliesArgs = {
  after?: InputMaybe<Scalars['String']>;
  commentaryId: Scalars['String'];
  first: Scalars['Int'];
};

export type QueryReviewArgs = {
  reviewId: Scalars['String'];
};

export type QueryReviewsArgs = {
  userId: Scalars['String'];
};

export type QuerySearchMovieArgs = {
  searchTerm: Scalars['String'];
};

export type QueryUserArgs = {
  userId: Scalars['String'];
};

export type QueryUserListArgs = {
  listId: Scalars['String'];
  userId: Scalars['String'];
};

export type QueryUserListsArgs = {
  userId: Scalars['String'];
};

export type QueryUserProfileArgs = {
  userId: Scalars['String'];
};

export type QueryWatchLaterArgs = {
  userId: Scalars['String'];
};

export type QueryWatchedArgs = {
  userId: Scalars['String'];
};

export type QueryWatchlistArgs = {
  userId: Scalars['String'];
};

export type Replies = {
  __typename?: 'Replies';
  edges: Array<RepliesPaginationEdge>;
  pageInfo: RepliesPaginationInfo;
};

export type RepliesPaginationEdge = {
  __typename?: 'RepliesPaginationEdge';
  cursor: Scalars['String'];
  node: Reply;
};

export type RepliesPaginationInfo = {
  __typename?: 'RepliesPaginationInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  maxItems: Scalars['Int'];
};

export type Reply = {
  __typename?: 'Reply';
  body: Scalars['String'];
  commentaryId: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  likes: Array<Like>;
  postId: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type Review = {
  __typename?: 'Review';
  author: User;
  body: Scalars['String'];
  commentaryCount: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  likes: Array<Like>;
  movie: Movie;
  pinned?: Maybe<Scalars['Boolean']>;
  updatedAt: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  biography?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  profilePictureUrl?: Maybe<Scalars['String']>;
  realName?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserInput = {
  biography?: InputMaybe<Scalars['String']>;
  profilePicture?: InputMaybe<Scalars['String']>;
  realName?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UserListCustom = {
  __typename?: 'UserListCustom';
  author: User;
  body: Scalars['String'];
  commentaryCount: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  likes: Array<Like>;
  movies: Array<Movie>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UserListCustomMovie = {
  __typename?: 'UserListCustomMovie';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  movie: Movie;
  updatedAt: Scalars['DateTime'];
};

export type UserListPremadeMovie = {
  __typename?: 'UserListPremadeMovie';
  movie: Movie;
  user: User;
};

/** User list type defines wich category is that list in */
export enum UserListType {
  Favorite = 'FAVORITE',
  Watched = 'WATCHED',
  Watchlist = 'WATCHLIST',
  WatchLater = 'WATCH_LATER',
}

export type UserProfile = {
  __typename?: 'UserProfile';
  followerCount: Scalars['Int'];
  followingCount: Scalars['Int'];
  listCount: Scalars['Int'];
  moviesWatchedCount: Scalars['Int'];
  moviesWatchedThisYearCount: Scalars['Int'];
};

export type CommentaryFieldsFragment = {
  __typename?: 'Commentary';
  id: string;
  postId: string;
  body: string;
  replyCount: number;
  createdAt: any;
  updatedAt: any;
  user: {
    __typename?: 'User';
    id: string;
    username: string;
    profilePictureUrl?: string | null;
  };
  likes: Array<{
    __typename?: 'Like';
    user: { __typename?: 'User'; id: string };
  }>;
};

export type FindCommentariesQueryVariables = Exact<{
  first: Scalars['Int'];
  postId: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
}>;

export type FindCommentariesQuery = {
  __typename?: 'Query';
  commentaries: {
    __typename?: 'Commentaries';
    pageInfo: {
      __typename?: 'CommentariesPaginationInfo';
      maxItems: number;
      hasNextPage: boolean;
      endCursor?: string | null;
    };
    edges: Array<{
      __typename?: 'CommentariesPaginationEdge';
      node: {
        __typename?: 'Commentary';
        id: string;
        postId: string;
        body: string;
        replyCount: number;
        createdAt: any;
        updatedAt: any;
        user: {
          __typename?: 'User';
          id: string;
          username: string;
          profilePictureUrl?: string | null;
        };
        likes: Array<{
          __typename?: 'Like';
          user: { __typename?: 'User'; id: string };
        }>;
      };
    }>;
  };
};

export type AddCommentaryMutationVariables = Exact<{
  body: Scalars['String'];
  postId: Scalars['String'];
}>;

export type AddCommentaryMutation = {
  __typename?: 'Mutation';
  comment: {
    __typename?: 'Commentary';
    id: string;
    postId: string;
    body: string;
    replyCount: number;
    createdAt: any;
    updatedAt: any;
    user: {
      __typename?: 'User';
      id: string;
      username: string;
      profilePictureUrl?: string | null;
    };
    likes: Array<{
      __typename?: 'Like';
      user: { __typename?: 'User'; id: string };
    }>;
  };
};

export type DeleteCommentaryMutationVariables = Exact<{
  commentaryId: Scalars['String'];
}>;

export type DeleteCommentaryMutation = {
  __typename?: 'Mutation';
  deleteCommentary: string;
};

export type FollowFieldsFragment = {
  __typename?: 'Followers';
  pageInfo: {
    __typename?: 'FollowersPaginationInfo';
    endCursor?: string | null;
    hasNextPage: boolean;
  };
  edges: Array<{
    __typename?: 'FollowersPaginationEdge';
    node: {
      __typename?: 'Follow';
      id: string;
      targetUser: {
        __typename?: 'User';
        id: string;
        username: string;
        realName?: string | null;
        profilePictureUrl?: string | null;
      };
    };
  }>;
};

export type FollowMutationVariables = Exact<{
  userId: Scalars['String'];
}>;

export type FollowMutation = { __typename?: 'Mutation'; follow: boolean };

export type IsFollowingQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type IsFollowingQuery = { __typename?: 'Query'; isFollowing: boolean };

export type FindFollowingQueryVariables = Exact<{
  first: Scalars['Int'];
  userId: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
}>;

export type FindFollowingQuery = {
  __typename?: 'Query';
  following: {
    __typename?: 'Followers';
    pageInfo: {
      __typename?: 'FollowersPaginationInfo';
      endCursor?: string | null;
      hasNextPage: boolean;
    };
    edges: Array<{
      __typename?: 'FollowersPaginationEdge';
      node: {
        __typename?: 'Follow';
        id: string;
        targetUser: {
          __typename?: 'User';
          id: string;
          username: string;
          realName?: string | null;
          profilePictureUrl?: string | null;
        };
      };
    }>;
  };
};

export type FindFollowersQueryVariables = Exact<{
  first: Scalars['Int'];
  userId: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
}>;

export type FindFollowersQuery = {
  __typename?: 'Query';
  followers: {
    __typename?: 'Followers';
    pageInfo: {
      __typename?: 'FollowersPaginationInfo';
      endCursor?: string | null;
      hasNextPage: boolean;
    };
    edges: Array<{
      __typename?: 'FollowersPaginationEdge';
      node: {
        __typename?: 'Follow';
        id: string;
        targetUser: {
          __typename?: 'User';
          id: string;
          username: string;
          realName?: string | null;
          profilePictureUrl?: string | null;
        };
      };
    }>;
  };
};

export type LikeContentMutationVariables = Exact<{
  rootId: Scalars['String'];
  referenceId?: InputMaybe<Scalars['String']>;
}>;

export type LikeContentMutation = { __typename?: 'Mutation'; like: boolean };

export type AddMovieToCustomListMutationVariables = Exact<{
  movieId: Scalars['Int'];
  listId: Scalars['String'];
}>;

export type AddMovieToCustomListMutation = {
  __typename?: 'Mutation';
  addMovieToCustomList: {
    __typename?: 'UserListCustomMovie';
    movie: { __typename?: 'Movie'; originalTitle: string };
  };
};

export type AddMovieToPremadeListMutationVariables = Exact<{
  movieId: Scalars['Int'];
  listType: UserListType;
}>;

export type AddMovieToPremadeListMutation = {
  __typename?: 'Mutation';
  addMovieToList: {
    __typename?: 'UserListPremadeMovie';
    movie: { __typename?: 'Movie'; originalTitle: string };
  };
};

export type RemoveMovieFromPremadeListMutationVariables = Exact<{
  listType: UserListType;
  movieId: Scalars['Int'];
}>;

export type RemoveMovieFromPremadeListMutation = {
  __typename?: 'Mutation';
  removeMovieFromList: string;
};

export type FindUserFavoriteMoviesQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type FindUserFavoriteMoviesQuery = {
  __typename?: 'Query';
  favoriteMovies: Array<{
    __typename?: 'UserListPremadeMovie';
    movie: { __typename?: 'Movie'; id: number };
  }>;
};

export type FindUserWatchlistQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type FindUserWatchlistQuery = {
  __typename?: 'Query';
  watchlist: Array<{
    __typename?: 'UserListPremadeMovie';
    movie: { __typename?: 'Movie'; id: number };
  }>;
};

export type FindUserWatchLaterQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type FindUserWatchLaterQuery = {
  __typename?: 'Query';
  watchLater: Array<{
    __typename?: 'UserListPremadeMovie';
    movie: { __typename?: 'Movie'; id: number };
  }>;
};

export type FindUserWatchedMoviesQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type FindUserWatchedMoviesQuery = {
  __typename?: 'Query';
  watched: Array<{
    __typename?: 'UserListPremadeMovie';
    movie: { __typename?: 'Movie'; id: number };
  }>;
};

export type MovieFieldsFragment = {
  __typename?: 'Movie';
  id: number;
  imdbId: string;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  runtime: number;
  voteAverage: number;
  releaseDate?: any | null;
  posterUrl: string;
  backdropUrl: string;
  genres: Array<{ __typename?: 'Genre'; id: string; name: string }>;
  productionCompanies: Array<{
    __typename?: 'Company';
    id: string;
    name: string;
    logoPath?: string | null;
  }>;
  spokenLanguages: Array<{
    __typename?: 'Language';
    englishName: string;
    iso6391: string;
  }>;
};

export type FindMovieQueryVariables = Exact<{
  movieId: Scalars['Int'];
}>;

export type FindMovieQuery = {
  __typename?: 'Query';
  movie: {
    __typename?: 'Movie';
    id: number;
    imdbId: string;
    originalLanguage: string;
    originalTitle: string;
    overview: string;
    runtime: number;
    voteAverage: number;
    releaseDate?: any | null;
    posterUrl: string;
    backdropUrl: string;
    genres: Array<{ __typename?: 'Genre'; id: string; name: string }>;
    productionCompanies: Array<{
      __typename?: 'Company';
      id: string;
      name: string;
      logoPath?: string | null;
    }>;
    spokenLanguages: Array<{
      __typename?: 'Language';
      englishName: string;
      iso6391: string;
    }>;
  };
};

export type FindFullMovieQueryVariables = Exact<{
  movieId: Scalars['Int'];
}>;

export type FindFullMovieQuery = {
  __typename?: 'Query';
  movie: {
    __typename?: 'Movie';
    id: number;
    imdbId: string;
    originalLanguage: string;
    originalTitle: string;
    overview: string;
    runtime: number;
    voteAverage: number;
    releaseDate?: any | null;
    posterUrl: string;
    backdropUrl: string;
    credits: {
      __typename?: 'MovieCredits';
      cast: Array<{
        __typename?: 'Cast';
        id: number;
        character: string;
        originalName: string;
        profilePictureUrl: string;
      }>;
    };
    genres: Array<{ __typename?: 'Genre'; id: string; name: string }>;
    productionCompanies: Array<{
      __typename?: 'Company';
      id: string;
      name: string;
      logoPath?: string | null;
    }>;
    spokenLanguages: Array<{
      __typename?: 'Language';
      englishName: string;
      iso6391: string;
    }>;
  };
};

export type SearchMovieQueryVariables = Exact<{
  searchTerm: Scalars['String'];
}>;

export type SearchMovieQuery = {
  __typename?: 'Query';
  searchMovie: {
    __typename?: 'MovieSearch';
    page: number;
    results: Array<{
      __typename?: 'Movie';
      id: number;
      overview: string;
      posterUrl: string;
      originalTitle: string;
      releaseDate?: any | null;
    }>;
  };
};

export type FindUserProfileQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type FindUserProfileQuery = {
  __typename?: 'Query';
  userProfile: {
    __typename?: 'UserProfile';
    followerCount: number;
    followingCount: number;
    listCount: number;
    moviesWatchedCount: number;
    moviesWatchedThisYearCount: number;
  };
};

export type PinReviewMutationVariables = Exact<{
  reviewId: Scalars['String'];
}>;

export type PinReviewMutation = {
  __typename?: 'Mutation';
  pinReview: {
    __typename?: 'Review';
    id: string;
    body: string;
    pinned?: boolean | null;
    commentaryCount: number;
    createdAt: any;
    likes: Array<{
      __typename?: 'Like';
      id: string;
      user: { __typename?: 'User'; id: string; username: string };
    }>;
    author: {
      __typename?: 'User';
      id: string;
      username: string;
      profilePictureUrl?: string | null;
    };
    movie: {
      __typename?: 'Movie';
      id: number;
      originalTitle: string;
      posterUrl: string;
      releaseDate?: any | null;
    };
  };
};

export type ReplyFieldsFragment = {
  __typename?: 'Reply';
  id: string;
  body: string;
  postId: string;
  createdAt: any;
  updatedAt: any;
  user: {
    __typename?: 'User';
    id: string;
    username: string;
    profilePictureUrl?: string | null;
  };
  likes: Array<{
    __typename?: 'Like';
    user: { __typename?: 'User'; id: string };
  }>;
};

export type FindRepliesQueryVariables = Exact<{
  first: Scalars['Int'];
  commentaryId: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
}>;

export type FindRepliesQuery = {
  __typename?: 'Query';
  replies: {
    __typename?: 'Replies';
    pageInfo: {
      __typename?: 'RepliesPaginationInfo';
      maxItems: number;
      endCursor?: string | null;
      hasNextPage: boolean;
    };
    edges: Array<{
      __typename?: 'RepliesPaginationEdge';
      node: {
        __typename?: 'Reply';
        id: string;
        body: string;
        postId: string;
        createdAt: any;
        updatedAt: any;
        user: {
          __typename?: 'User';
          id: string;
          username: string;
          profilePictureUrl?: string | null;
        };
        likes: Array<{
          __typename?: 'Like';
          user: { __typename?: 'User'; id: string };
        }>;
      };
    }>;
  };
};

export type AddReplyMutationVariables = Exact<{
  body: Scalars['String'];
  commentaryId: Scalars['String'];
}>;

export type AddReplyMutation = {
  __typename?: 'Mutation';
  reply: {
    __typename?: 'Reply';
    id: string;
    body: string;
    postId: string;
    createdAt: any;
    updatedAt: any;
    user: {
      __typename?: 'User';
      id: string;
      username: string;
      profilePictureUrl?: string | null;
    };
    likes: Array<{
      __typename?: 'Like';
      user: { __typename?: 'User'; id: string };
    }>;
  };
};

export type DeleteReplyMutationVariables = Exact<{
  replyId: Scalars['String'];
}>;

export type DeleteReplyMutation = {
  __typename?: 'Mutation';
  deleteReply: string;
};

export type ReviewFieldsFragment = {
  __typename?: 'Review';
  id: string;
  body: string;
  pinned?: boolean | null;
  commentaryCount: number;
  createdAt: any;
  likes: Array<{
    __typename?: 'Like';
    user: { __typename?: 'User'; id: string };
  }>;
  author: {
    __typename?: 'User';
    id: string;
    username: string;
    profilePictureUrl?: string | null;
  };
  movie: {
    __typename?: 'Movie';
    id: number;
    originalTitle: string;
    posterUrl: string;
    releaseDate?: any | null;
  };
};

export type CreateReviewMutationVariables = Exact<{
  body: Scalars['String'];
  movieId: Scalars['Int'];
}>;

export type CreateReviewMutation = {
  __typename?: 'Mutation';
  createReview: { __typename?: 'Review'; id: string };
};

export type FindReviewQueryVariables = Exact<{
  reviewId: Scalars['String'];
}>;

export type FindReviewQuery = {
  __typename?: 'Query';
  review: {
    __typename?: 'Review';
    id: string;
    body: string;
    pinned?: boolean | null;
    commentaryCount: number;
    createdAt: any;
    likes: Array<{
      __typename?: 'Like';
      user: { __typename?: 'User'; id: string };
    }>;
    author: {
      __typename?: 'User';
      id: string;
      username: string;
      profilePictureUrl?: string | null;
    };
    movie: {
      __typename?: 'Movie';
      id: number;
      originalTitle: string;
      posterUrl: string;
      releaseDate?: any | null;
    };
  };
};

export type FindUserReviewsQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type FindUserReviewsQuery = {
  __typename?: 'Query';
  reviews: Array<{
    __typename?: 'Review';
    id: string;
    body: string;
    pinned?: boolean | null;
    commentaryCount: number;
    createdAt: any;
    likes: Array<{
      __typename?: 'Like';
      user: { __typename?: 'User'; id: string };
    }>;
    author: {
      __typename?: 'User';
      id: string;
      username: string;
      profilePictureUrl?: string | null;
    };
    movie: {
      __typename?: 'Movie';
      id: number;
      originalTitle: string;
      posterUrl: string;
      releaseDate?: any | null;
    };
  }>;
};

export type FindUserRecentReviewsQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type FindUserRecentReviewsQuery = {
  __typename?: 'Query';
  recentReviews: Array<{
    __typename?: 'Review';
    id: string;
    body: string;
    pinned?: boolean | null;
    commentaryCount: number;
    createdAt: any;
    likes: Array<{
      __typename?: 'Like';
      user: { __typename?: 'User'; id: string };
    }>;
    author: {
      __typename?: 'User';
      id: string;
      username: string;
      profilePictureUrl?: string | null;
    };
    movie: {
      __typename?: 'Movie';
      id: number;
      originalTitle: string;
      posterUrl: string;
      releaseDate?: any | null;
    };
  }>;
};

export type FindUserPinnedReviewsQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type FindUserPinnedReviewsQuery = {
  __typename?: 'Query';
  pinnedReviews: Array<{
    __typename?: 'Review';
    id: string;
    body: string;
    pinned?: boolean | null;
    commentaryCount: number;
    createdAt: any;
    likes: Array<{
      __typename?: 'Like';
      user: { __typename?: 'User'; id: string };
    }>;
    author: {
      __typename?: 'User';
      id: string;
      username: string;
      profilePictureUrl?: string | null;
    };
    movie: {
      __typename?: 'Movie';
      id: number;
      originalTitle: string;
      posterUrl: string;
      releaseDate?: any | null;
    };
  }>;
};

export type FindUserPopularReviewsQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type FindUserPopularReviewsQuery = {
  __typename?: 'Query';
  popularReviews: Array<{
    __typename?: 'Review';
    id: string;
    body: string;
    pinned?: boolean | null;
    commentaryCount: number;
    createdAt: any;
    likes: Array<{
      __typename?: 'Like';
      user: { __typename?: 'User'; id: string };
    }>;
    author: {
      __typename?: 'User';
      id: string;
      username: string;
      profilePictureUrl?: string | null;
    };
    movie: {
      __typename?: 'Movie';
      id: number;
      originalTitle: string;
      posterUrl: string;
      releaseDate?: any | null;
    };
  }>;
};

export type UserFieldsFragment = {
  __typename?: 'User';
  id: string;
  username: string;
  realName?: string | null;
  biography?: string | null;
  profilePictureUrl?: string | null;
};

export type FindUserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type FindUserQuery = {
  __typename?: 'Query';
  user: {
    __typename?: 'User';
    id: string;
    username: string;
    realName?: string | null;
    biography?: string | null;
    profilePictureUrl?: string | null;
  };
};

export type SignInMutationVariables = Exact<{
  username: Scalars['String'];
}>;

export type SignInMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'User';
    id: string;
    username: string;
    realName?: string | null;
    biography?: string | null;
    profilePictureUrl?: string | null;
  };
};

export const CommentaryFieldsFragmentDoc = gql`
  fragment CommentaryFields on Commentary {
    id
    postId
    body
    replyCount
    createdAt
    updatedAt
    user {
      id
      username
      profilePictureUrl
    }
    likes {
      user {
        id
      }
    }
  }
`;
export const FollowFieldsFragmentDoc = gql`
  fragment FollowFields on Followers {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        id
        targetUser {
          id
          username
          realName
          profilePictureUrl
        }
      }
    }
  }
`;
export const MovieFieldsFragmentDoc = gql`
  fragment MovieFields on Movie {
    id
    imdbId
    originalLanguage
    originalTitle
    overview
    runtime
    voteAverage
    releaseDate
    posterUrl
    backdropUrl
    genres {
      id
      name
    }
    productionCompanies {
      id
      name
      logoPath
    }
    spokenLanguages {
      englishName
      iso6391
    }
  }
`;
export const ReplyFieldsFragmentDoc = gql`
  fragment ReplyFields on Reply {
    id
    body
    postId
    createdAt
    updatedAt
    user {
      id
      username
      profilePictureUrl
    }
    likes {
      user {
        id
      }
    }
  }
`;
export const ReviewFieldsFragmentDoc = gql`
  fragment ReviewFields on Review {
    id
    body
    pinned
    commentaryCount
    createdAt
    likes {
      user {
        id
      }
    }
    author {
      id
      username
      profilePictureUrl
    }
    movie {
      id
      originalTitle
      posterUrl
      releaseDate
    }
  }
`;
export const UserFieldsFragmentDoc = gql`
  fragment UserFields on User {
    id
    username
    realName
    biography
    profilePictureUrl
  }
`;
export const FindCommentariesDocument = gql`
  query FindCommentaries($first: Int!, $postId: String!, $after: String) {
    commentaries(first: $first, postId: $postId, after: $after)
      @connection(key: "commentaries") {
      pageInfo {
        maxItems
        hasNextPage
        endCursor
      }
      edges {
        node {
          ...CommentaryFields
        }
      }
    }
  }
  ${CommentaryFieldsFragmentDoc}
`;

/**
 * __useFindCommentariesQuery__
 *
 * To run a query within a React component, call `useFindCommentariesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindCommentariesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindCommentariesQuery({
 *   variables: {
 *      first: // value for 'first'
 *      postId: // value for 'postId'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useFindCommentariesQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindCommentariesQuery,
    FindCommentariesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindCommentariesQuery, FindCommentariesQueryVariables>(
    FindCommentariesDocument,
    options,
  );
}
export function useFindCommentariesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindCommentariesQuery,
    FindCommentariesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindCommentariesQuery,
    FindCommentariesQueryVariables
  >(FindCommentariesDocument, options);
}
export type FindCommentariesQueryHookResult = ReturnType<
  typeof useFindCommentariesQuery
>;
export type FindCommentariesLazyQueryHookResult = ReturnType<
  typeof useFindCommentariesLazyQuery
>;
export type FindCommentariesQueryResult = Apollo.QueryResult<
  FindCommentariesQuery,
  FindCommentariesQueryVariables
>;
export const AddCommentaryDocument = gql`
  mutation AddCommentary($body: String!, $postId: String!) {
    comment(body: $body, postId: $postId) {
      ...CommentaryFields
    }
  }
  ${CommentaryFieldsFragmentDoc}
`;
export type AddCommentaryMutationFn = Apollo.MutationFunction<
  AddCommentaryMutation,
  AddCommentaryMutationVariables
>;

/**
 * __useAddCommentaryMutation__
 *
 * To run a mutation, you first call `useAddCommentaryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentaryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentaryMutation, { data, loading, error }] = useAddCommentaryMutation({
 *   variables: {
 *      body: // value for 'body'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useAddCommentaryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddCommentaryMutation,
    AddCommentaryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddCommentaryMutation,
    AddCommentaryMutationVariables
  >(AddCommentaryDocument, options);
}
export type AddCommentaryMutationHookResult = ReturnType<
  typeof useAddCommentaryMutation
>;
export type AddCommentaryMutationResult =
  Apollo.MutationResult<AddCommentaryMutation>;
export type AddCommentaryMutationOptions = Apollo.BaseMutationOptions<
  AddCommentaryMutation,
  AddCommentaryMutationVariables
>;
export const DeleteCommentaryDocument = gql`
  mutation DeleteCommentary($commentaryId: String!) {
    deleteCommentary(commentaryId: $commentaryId)
  }
`;
export type DeleteCommentaryMutationFn = Apollo.MutationFunction<
  DeleteCommentaryMutation,
  DeleteCommentaryMutationVariables
>;

/**
 * __useDeleteCommentaryMutation__
 *
 * To run a mutation, you first call `useDeleteCommentaryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentaryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentaryMutation, { data, loading, error }] = useDeleteCommentaryMutation({
 *   variables: {
 *      commentaryId: // value for 'commentaryId'
 *   },
 * });
 */
export function useDeleteCommentaryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteCommentaryMutation,
    DeleteCommentaryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteCommentaryMutation,
    DeleteCommentaryMutationVariables
  >(DeleteCommentaryDocument, options);
}
export type DeleteCommentaryMutationHookResult = ReturnType<
  typeof useDeleteCommentaryMutation
>;
export type DeleteCommentaryMutationResult =
  Apollo.MutationResult<DeleteCommentaryMutation>;
export type DeleteCommentaryMutationOptions = Apollo.BaseMutationOptions<
  DeleteCommentaryMutation,
  DeleteCommentaryMutationVariables
>;
export const FollowDocument = gql`
  mutation Follow($userId: String!) {
    follow(userId: $userId)
  }
`;
export type FollowMutationFn = Apollo.MutationFunction<
  FollowMutation,
  FollowMutationVariables
>;

/**
 * __useFollowMutation__
 *
 * To run a mutation, you first call `useFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followMutation, { data, loading, error }] = useFollowMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFollowMutation(
  baseOptions?: Apollo.MutationHookOptions<
    FollowMutation,
    FollowMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<FollowMutation, FollowMutationVariables>(
    FollowDocument,
    options,
  );
}
export type FollowMutationHookResult = ReturnType<typeof useFollowMutation>;
export type FollowMutationResult = Apollo.MutationResult<FollowMutation>;
export type FollowMutationOptions = Apollo.BaseMutationOptions<
  FollowMutation,
  FollowMutationVariables
>;
export const IsFollowingDocument = gql`
  query IsFollowing($userId: String!) {
    isFollowing(userId: $userId)
      @connection(key: "isFollowing", filter: ["userId"])
  }
`;

/**
 * __useIsFollowingQuery__
 *
 * To run a query within a React component, call `useIsFollowingQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsFollowingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsFollowingQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useIsFollowingQuery(
  baseOptions: Apollo.QueryHookOptions<
    IsFollowingQuery,
    IsFollowingQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IsFollowingQuery, IsFollowingQueryVariables>(
    IsFollowingDocument,
    options,
  );
}
export function useIsFollowingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IsFollowingQuery,
    IsFollowingQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IsFollowingQuery, IsFollowingQueryVariables>(
    IsFollowingDocument,
    options,
  );
}
export type IsFollowingQueryHookResult = ReturnType<typeof useIsFollowingQuery>;
export type IsFollowingLazyQueryHookResult = ReturnType<
  typeof useIsFollowingLazyQuery
>;
export type IsFollowingQueryResult = Apollo.QueryResult<
  IsFollowingQuery,
  IsFollowingQueryVariables
>;
export const FindFollowingDocument = gql`
  query FindFollowing($first: Int!, $userId: String!, $after: String) {
    following(first: $first, userId: $userId, after: $after) {
      ...FollowFields
    }
  }
  ${FollowFieldsFragmentDoc}
`;

/**
 * __useFindFollowingQuery__
 *
 * To run a query within a React component, call `useFindFollowingQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindFollowingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindFollowingQuery({
 *   variables: {
 *      first: // value for 'first'
 *      userId: // value for 'userId'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useFindFollowingQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindFollowingQuery,
    FindFollowingQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindFollowingQuery, FindFollowingQueryVariables>(
    FindFollowingDocument,
    options,
  );
}
export function useFindFollowingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindFollowingQuery,
    FindFollowingQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindFollowingQuery, FindFollowingQueryVariables>(
    FindFollowingDocument,
    options,
  );
}
export type FindFollowingQueryHookResult = ReturnType<
  typeof useFindFollowingQuery
>;
export type FindFollowingLazyQueryHookResult = ReturnType<
  typeof useFindFollowingLazyQuery
>;
export type FindFollowingQueryResult = Apollo.QueryResult<
  FindFollowingQuery,
  FindFollowingQueryVariables
>;
export const FindFollowersDocument = gql`
  query FindFollowers($first: Int!, $userId: String!, $after: String) {
    followers(first: $first, userId: $userId, after: $after) {
      ...FollowFields
    }
  }
  ${FollowFieldsFragmentDoc}
`;

/**
 * __useFindFollowersQuery__
 *
 * To run a query within a React component, call `useFindFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindFollowersQuery({
 *   variables: {
 *      first: // value for 'first'
 *      userId: // value for 'userId'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useFindFollowersQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindFollowersQuery,
    FindFollowersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindFollowersQuery, FindFollowersQueryVariables>(
    FindFollowersDocument,
    options,
  );
}
export function useFindFollowersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindFollowersQuery,
    FindFollowersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindFollowersQuery, FindFollowersQueryVariables>(
    FindFollowersDocument,
    options,
  );
}
export type FindFollowersQueryHookResult = ReturnType<
  typeof useFindFollowersQuery
>;
export type FindFollowersLazyQueryHookResult = ReturnType<
  typeof useFindFollowersLazyQuery
>;
export type FindFollowersQueryResult = Apollo.QueryResult<
  FindFollowersQuery,
  FindFollowersQueryVariables
>;
export const LikeContentDocument = gql`
  mutation LikeContent($rootId: String!, $referenceId: String) {
    like(rootId: $rootId, referenceId: $referenceId)
  }
`;
export type LikeContentMutationFn = Apollo.MutationFunction<
  LikeContentMutation,
  LikeContentMutationVariables
>;

/**
 * __useLikeContentMutation__
 *
 * To run a mutation, you first call `useLikeContentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeContentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeContentMutation, { data, loading, error }] = useLikeContentMutation({
 *   variables: {
 *      rootId: // value for 'rootId'
 *      referenceId: // value for 'referenceId'
 *   },
 * });
 */
export function useLikeContentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LikeContentMutation,
    LikeContentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LikeContentMutation, LikeContentMutationVariables>(
    LikeContentDocument,
    options,
  );
}
export type LikeContentMutationHookResult = ReturnType<
  typeof useLikeContentMutation
>;
export type LikeContentMutationResult =
  Apollo.MutationResult<LikeContentMutation>;
export type LikeContentMutationOptions = Apollo.BaseMutationOptions<
  LikeContentMutation,
  LikeContentMutationVariables
>;
export const AddMovieToCustomListDocument = gql`
  mutation AddMovieToCustomList($movieId: Int!, $listId: String!) {
    addMovieToCustomList(movieId: $movieId, listId: $listId) {
      movie {
        originalTitle
      }
    }
  }
`;
export type AddMovieToCustomListMutationFn = Apollo.MutationFunction<
  AddMovieToCustomListMutation,
  AddMovieToCustomListMutationVariables
>;

/**
 * __useAddMovieToCustomListMutation__
 *
 * To run a mutation, you first call `useAddMovieToCustomListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMovieToCustomListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMovieToCustomListMutation, { data, loading, error }] = useAddMovieToCustomListMutation({
 *   variables: {
 *      movieId: // value for 'movieId'
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useAddMovieToCustomListMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddMovieToCustomListMutation,
    AddMovieToCustomListMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddMovieToCustomListMutation,
    AddMovieToCustomListMutationVariables
  >(AddMovieToCustomListDocument, options);
}
export type AddMovieToCustomListMutationHookResult = ReturnType<
  typeof useAddMovieToCustomListMutation
>;
export type AddMovieToCustomListMutationResult =
  Apollo.MutationResult<AddMovieToCustomListMutation>;
export type AddMovieToCustomListMutationOptions = Apollo.BaseMutationOptions<
  AddMovieToCustomListMutation,
  AddMovieToCustomListMutationVariables
>;
export const AddMovieToPremadeListDocument = gql`
  mutation AddMovieToPremadeList($movieId: Int!, $listType: UserListType!) {
    addMovieToList(movieId: $movieId, listType: $listType) {
      movie {
        originalTitle
      }
    }
  }
`;
export type AddMovieToPremadeListMutationFn = Apollo.MutationFunction<
  AddMovieToPremadeListMutation,
  AddMovieToPremadeListMutationVariables
>;

/**
 * __useAddMovieToPremadeListMutation__
 *
 * To run a mutation, you first call `useAddMovieToPremadeListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMovieToPremadeListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMovieToPremadeListMutation, { data, loading, error }] = useAddMovieToPremadeListMutation({
 *   variables: {
 *      movieId: // value for 'movieId'
 *      listType: // value for 'listType'
 *   },
 * });
 */
export function useAddMovieToPremadeListMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddMovieToPremadeListMutation,
    AddMovieToPremadeListMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddMovieToPremadeListMutation,
    AddMovieToPremadeListMutationVariables
  >(AddMovieToPremadeListDocument, options);
}
export type AddMovieToPremadeListMutationHookResult = ReturnType<
  typeof useAddMovieToPremadeListMutation
>;
export type AddMovieToPremadeListMutationResult =
  Apollo.MutationResult<AddMovieToPremadeListMutation>;
export type AddMovieToPremadeListMutationOptions = Apollo.BaseMutationOptions<
  AddMovieToPremadeListMutation,
  AddMovieToPremadeListMutationVariables
>;
export const RemoveMovieFromPremadeListDocument = gql`
  mutation RemoveMovieFromPremadeList(
    $listType: UserListType!
    $movieId: Int!
  ) {
    removeMovieFromList(listType: $listType, movieId: $movieId)
  }
`;
export type RemoveMovieFromPremadeListMutationFn = Apollo.MutationFunction<
  RemoveMovieFromPremadeListMutation,
  RemoveMovieFromPremadeListMutationVariables
>;

/**
 * __useRemoveMovieFromPremadeListMutation__
 *
 * To run a mutation, you first call `useRemoveMovieFromPremadeListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMovieFromPremadeListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMovieFromPremadeListMutation, { data, loading, error }] = useRemoveMovieFromPremadeListMutation({
 *   variables: {
 *      listType: // value for 'listType'
 *      movieId: // value for 'movieId'
 *   },
 * });
 */
export function useRemoveMovieFromPremadeListMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveMovieFromPremadeListMutation,
    RemoveMovieFromPremadeListMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RemoveMovieFromPremadeListMutation,
    RemoveMovieFromPremadeListMutationVariables
  >(RemoveMovieFromPremadeListDocument, options);
}
export type RemoveMovieFromPremadeListMutationHookResult = ReturnType<
  typeof useRemoveMovieFromPremadeListMutation
>;
export type RemoveMovieFromPremadeListMutationResult =
  Apollo.MutationResult<RemoveMovieFromPremadeListMutation>;
export type RemoveMovieFromPremadeListMutationOptions =
  Apollo.BaseMutationOptions<
    RemoveMovieFromPremadeListMutation,
    RemoveMovieFromPremadeListMutationVariables
  >;
export const FindUserFavoriteMoviesDocument = gql`
  query FindUserFavoriteMovies($userId: String!) {
    favoriteMovies(userId: $userId) {
      movie {
        id
      }
    }
  }
`;

/**
 * __useFindUserFavoriteMoviesQuery__
 *
 * To run a query within a React component, call `useFindUserFavoriteMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserFavoriteMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserFavoriteMoviesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFindUserFavoriteMoviesQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindUserFavoriteMoviesQuery,
    FindUserFavoriteMoviesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindUserFavoriteMoviesQuery,
    FindUserFavoriteMoviesQueryVariables
  >(FindUserFavoriteMoviesDocument, options);
}
export function useFindUserFavoriteMoviesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindUserFavoriteMoviesQuery,
    FindUserFavoriteMoviesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindUserFavoriteMoviesQuery,
    FindUserFavoriteMoviesQueryVariables
  >(FindUserFavoriteMoviesDocument, options);
}
export type FindUserFavoriteMoviesQueryHookResult = ReturnType<
  typeof useFindUserFavoriteMoviesQuery
>;
export type FindUserFavoriteMoviesLazyQueryHookResult = ReturnType<
  typeof useFindUserFavoriteMoviesLazyQuery
>;
export type FindUserFavoriteMoviesQueryResult = Apollo.QueryResult<
  FindUserFavoriteMoviesQuery,
  FindUserFavoriteMoviesQueryVariables
>;
export const FindUserWatchlistDocument = gql`
  query FindUserWatchlist($userId: String!) {
    watchlist(userId: $userId) {
      movie {
        id
      }
    }
  }
`;

/**
 * __useFindUserWatchlistQuery__
 *
 * To run a query within a React component, call `useFindUserWatchlistQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserWatchlistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserWatchlistQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFindUserWatchlistQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindUserWatchlistQuery,
    FindUserWatchlistQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindUserWatchlistQuery,
    FindUserWatchlistQueryVariables
  >(FindUserWatchlistDocument, options);
}
export function useFindUserWatchlistLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindUserWatchlistQuery,
    FindUserWatchlistQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindUserWatchlistQuery,
    FindUserWatchlistQueryVariables
  >(FindUserWatchlistDocument, options);
}
export type FindUserWatchlistQueryHookResult = ReturnType<
  typeof useFindUserWatchlistQuery
>;
export type FindUserWatchlistLazyQueryHookResult = ReturnType<
  typeof useFindUserWatchlistLazyQuery
>;
export type FindUserWatchlistQueryResult = Apollo.QueryResult<
  FindUserWatchlistQuery,
  FindUserWatchlistQueryVariables
>;
export const FindUserWatchLaterDocument = gql`
  query FindUserWatchLater($userId: String!) {
    watchLater(userId: $userId) {
      movie {
        id
      }
    }
  }
`;

/**
 * __useFindUserWatchLaterQuery__
 *
 * To run a query within a React component, call `useFindUserWatchLaterQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserWatchLaterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserWatchLaterQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFindUserWatchLaterQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindUserWatchLaterQuery,
    FindUserWatchLaterQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindUserWatchLaterQuery,
    FindUserWatchLaterQueryVariables
  >(FindUserWatchLaterDocument, options);
}
export function useFindUserWatchLaterLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindUserWatchLaterQuery,
    FindUserWatchLaterQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindUserWatchLaterQuery,
    FindUserWatchLaterQueryVariables
  >(FindUserWatchLaterDocument, options);
}
export type FindUserWatchLaterQueryHookResult = ReturnType<
  typeof useFindUserWatchLaterQuery
>;
export type FindUserWatchLaterLazyQueryHookResult = ReturnType<
  typeof useFindUserWatchLaterLazyQuery
>;
export type FindUserWatchLaterQueryResult = Apollo.QueryResult<
  FindUserWatchLaterQuery,
  FindUserWatchLaterQueryVariables
>;
export const FindUserWatchedMoviesDocument = gql`
  query FindUserWatchedMovies($userId: String!) {
    watched(userId: $userId) {
      movie {
        id
      }
    }
  }
`;

/**
 * __useFindUserWatchedMoviesQuery__
 *
 * To run a query within a React component, call `useFindUserWatchedMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserWatchedMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserWatchedMoviesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFindUserWatchedMoviesQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindUserWatchedMoviesQuery,
    FindUserWatchedMoviesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindUserWatchedMoviesQuery,
    FindUserWatchedMoviesQueryVariables
  >(FindUserWatchedMoviesDocument, options);
}
export function useFindUserWatchedMoviesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindUserWatchedMoviesQuery,
    FindUserWatchedMoviesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindUserWatchedMoviesQuery,
    FindUserWatchedMoviesQueryVariables
  >(FindUserWatchedMoviesDocument, options);
}
export type FindUserWatchedMoviesQueryHookResult = ReturnType<
  typeof useFindUserWatchedMoviesQuery
>;
export type FindUserWatchedMoviesLazyQueryHookResult = ReturnType<
  typeof useFindUserWatchedMoviesLazyQuery
>;
export type FindUserWatchedMoviesQueryResult = Apollo.QueryResult<
  FindUserWatchedMoviesQuery,
  FindUserWatchedMoviesQueryVariables
>;
export const FindMovieDocument = gql`
  query FindMovie($movieId: Int!) {
    movie(movieId: $movieId) {
      ...MovieFields
    }
  }
  ${MovieFieldsFragmentDoc}
`;

/**
 * __useFindMovieQuery__
 *
 * To run a query within a React component, call `useFindMovieQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMovieQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMovieQuery({
 *   variables: {
 *      movieId: // value for 'movieId'
 *   },
 * });
 */
export function useFindMovieQuery(
  baseOptions: Apollo.QueryHookOptions<FindMovieQuery, FindMovieQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindMovieQuery, FindMovieQueryVariables>(
    FindMovieDocument,
    options,
  );
}
export function useFindMovieLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindMovieQuery,
    FindMovieQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindMovieQuery, FindMovieQueryVariables>(
    FindMovieDocument,
    options,
  );
}
export type FindMovieQueryHookResult = ReturnType<typeof useFindMovieQuery>;
export type FindMovieLazyQueryHookResult = ReturnType<
  typeof useFindMovieLazyQuery
>;
export type FindMovieQueryResult = Apollo.QueryResult<
  FindMovieQuery,
  FindMovieQueryVariables
>;
export const FindFullMovieDocument = gql`
  query FindFullMovie($movieId: Int!) {
    movie(movieId: $movieId) {
      ...MovieFields
      credits {
        cast {
          id
          character
          originalName
          profilePictureUrl
        }
      }
    }
  }
  ${MovieFieldsFragmentDoc}
`;

/**
 * __useFindFullMovieQuery__
 *
 * To run a query within a React component, call `useFindFullMovieQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindFullMovieQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindFullMovieQuery({
 *   variables: {
 *      movieId: // value for 'movieId'
 *   },
 * });
 */
export function useFindFullMovieQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindFullMovieQuery,
    FindFullMovieQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindFullMovieQuery, FindFullMovieQueryVariables>(
    FindFullMovieDocument,
    options,
  );
}
export function useFindFullMovieLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindFullMovieQuery,
    FindFullMovieQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindFullMovieQuery, FindFullMovieQueryVariables>(
    FindFullMovieDocument,
    options,
  );
}
export type FindFullMovieQueryHookResult = ReturnType<
  typeof useFindFullMovieQuery
>;
export type FindFullMovieLazyQueryHookResult = ReturnType<
  typeof useFindFullMovieLazyQuery
>;
export type FindFullMovieQueryResult = Apollo.QueryResult<
  FindFullMovieQuery,
  FindFullMovieQueryVariables
>;
export const SearchMovieDocument = gql`
  query SearchMovie($searchTerm: String!) {
    searchMovie(searchTerm: $searchTerm) {
      page
      results {
        id
        overview
        posterUrl
        originalTitle
        releaseDate
      }
    }
  }
`;

/**
 * __useSearchMovieQuery__
 *
 * To run a query within a React component, call `useSearchMovieQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchMovieQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchMovieQuery({
 *   variables: {
 *      searchTerm: // value for 'searchTerm'
 *   },
 * });
 */
export function useSearchMovieQuery(
  baseOptions: Apollo.QueryHookOptions<
    SearchMovieQuery,
    SearchMovieQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SearchMovieQuery, SearchMovieQueryVariables>(
    SearchMovieDocument,
    options,
  );
}
export function useSearchMovieLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchMovieQuery,
    SearchMovieQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SearchMovieQuery, SearchMovieQueryVariables>(
    SearchMovieDocument,
    options,
  );
}
export type SearchMovieQueryHookResult = ReturnType<typeof useSearchMovieQuery>;
export type SearchMovieLazyQueryHookResult = ReturnType<
  typeof useSearchMovieLazyQuery
>;
export type SearchMovieQueryResult = Apollo.QueryResult<
  SearchMovieQuery,
  SearchMovieQueryVariables
>;
export const FindUserProfileDocument = gql`
  query FindUserProfile($userId: String!) {
    userProfile(userId: $userId) @connection(key: "userProfile") {
      followerCount
      followingCount
      listCount
      moviesWatchedCount
      moviesWatchedThisYearCount
    }
  }
`;

/**
 * __useFindUserProfileQuery__
 *
 * To run a query within a React component, call `useFindUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserProfileQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFindUserProfileQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindUserProfileQuery,
    FindUserProfileQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindUserProfileQuery, FindUserProfileQueryVariables>(
    FindUserProfileDocument,
    options,
  );
}
export function useFindUserProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindUserProfileQuery,
    FindUserProfileQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindUserProfileQuery,
    FindUserProfileQueryVariables
  >(FindUserProfileDocument, options);
}
export type FindUserProfileQueryHookResult = ReturnType<
  typeof useFindUserProfileQuery
>;
export type FindUserProfileLazyQueryHookResult = ReturnType<
  typeof useFindUserProfileLazyQuery
>;
export type FindUserProfileQueryResult = Apollo.QueryResult<
  FindUserProfileQuery,
  FindUserProfileQueryVariables
>;
export const PinReviewDocument = gql`
  mutation PinReview($reviewId: String!) {
    pinReview(reviewId: $reviewId) {
      id
      body
      pinned
      commentaryCount
      createdAt
      likes {
        id
        user {
          id
          username
        }
      }
      author {
        id
        username
        profilePictureUrl
      }
      movie {
        id
        originalTitle
        posterUrl
        releaseDate
      }
    }
  }
`;
export type PinReviewMutationFn = Apollo.MutationFunction<
  PinReviewMutation,
  PinReviewMutationVariables
>;

/**
 * __usePinReviewMutation__
 *
 * To run a mutation, you first call `usePinReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePinReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pinReviewMutation, { data, loading, error }] = usePinReviewMutation({
 *   variables: {
 *      reviewId: // value for 'reviewId'
 *   },
 * });
 */
export function usePinReviewMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PinReviewMutation,
    PinReviewMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PinReviewMutation, PinReviewMutationVariables>(
    PinReviewDocument,
    options,
  );
}
export type PinReviewMutationHookResult = ReturnType<
  typeof usePinReviewMutation
>;
export type PinReviewMutationResult = Apollo.MutationResult<PinReviewMutation>;
export type PinReviewMutationOptions = Apollo.BaseMutationOptions<
  PinReviewMutation,
  PinReviewMutationVariables
>;
export const FindRepliesDocument = gql`
  query FindReplies($first: Int!, $commentaryId: String!, $after: String) {
    replies(first: $first, commentaryId: $commentaryId, after: $after)
      @connection(key: "replies", filter: ["commentaryId"]) {
      pageInfo {
        maxItems
        endCursor
        hasNextPage
      }
      edges {
        node {
          ...ReplyFields
        }
      }
    }
  }
  ${ReplyFieldsFragmentDoc}
`;

/**
 * __useFindRepliesQuery__
 *
 * To run a query within a React component, call `useFindRepliesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindRepliesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindRepliesQuery({
 *   variables: {
 *      first: // value for 'first'
 *      commentaryId: // value for 'commentaryId'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useFindRepliesQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindRepliesQuery,
    FindRepliesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindRepliesQuery, FindRepliesQueryVariables>(
    FindRepliesDocument,
    options,
  );
}
export function useFindRepliesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindRepliesQuery,
    FindRepliesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindRepliesQuery, FindRepliesQueryVariables>(
    FindRepliesDocument,
    options,
  );
}
export type FindRepliesQueryHookResult = ReturnType<typeof useFindRepliesQuery>;
export type FindRepliesLazyQueryHookResult = ReturnType<
  typeof useFindRepliesLazyQuery
>;
export type FindRepliesQueryResult = Apollo.QueryResult<
  FindRepliesQuery,
  FindRepliesQueryVariables
>;
export const AddReplyDocument = gql`
  mutation AddReply($body: String!, $commentaryId: String!) {
    reply(body: $body, commentaryId: $commentaryId) {
      ...ReplyFields
    }
  }
  ${ReplyFieldsFragmentDoc}
`;
export type AddReplyMutationFn = Apollo.MutationFunction<
  AddReplyMutation,
  AddReplyMutationVariables
>;

/**
 * __useAddReplyMutation__
 *
 * To run a mutation, you first call `useAddReplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddReplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addReplyMutation, { data, loading, error }] = useAddReplyMutation({
 *   variables: {
 *      body: // value for 'body'
 *      commentaryId: // value for 'commentaryId'
 *   },
 * });
 */
export function useAddReplyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddReplyMutation,
    AddReplyMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddReplyMutation, AddReplyMutationVariables>(
    AddReplyDocument,
    options,
  );
}
export type AddReplyMutationHookResult = ReturnType<typeof useAddReplyMutation>;
export type AddReplyMutationResult = Apollo.MutationResult<AddReplyMutation>;
export type AddReplyMutationOptions = Apollo.BaseMutationOptions<
  AddReplyMutation,
  AddReplyMutationVariables
>;
export const DeleteReplyDocument = gql`
  mutation DeleteReply($replyId: String!) {
    deleteReply(replyId: $replyId)
  }
`;
export type DeleteReplyMutationFn = Apollo.MutationFunction<
  DeleteReplyMutation,
  DeleteReplyMutationVariables
>;

/**
 * __useDeleteReplyMutation__
 *
 * To run a mutation, you first call `useDeleteReplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReplyMutation, { data, loading, error }] = useDeleteReplyMutation({
 *   variables: {
 *      replyId: // value for 'replyId'
 *   },
 * });
 */
export function useDeleteReplyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteReplyMutation,
    DeleteReplyMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteReplyMutation, DeleteReplyMutationVariables>(
    DeleteReplyDocument,
    options,
  );
}
export type DeleteReplyMutationHookResult = ReturnType<
  typeof useDeleteReplyMutation
>;
export type DeleteReplyMutationResult =
  Apollo.MutationResult<DeleteReplyMutation>;
export type DeleteReplyMutationOptions = Apollo.BaseMutationOptions<
  DeleteReplyMutation,
  DeleteReplyMutationVariables
>;
export const CreateReviewDocument = gql`
  mutation CreateReview($body: String!, $movieId: Int!) {
    createReview(body: $body, movieId: $movieId) {
      id
    }
  }
`;
export type CreateReviewMutationFn = Apollo.MutationFunction<
  CreateReviewMutation,
  CreateReviewMutationVariables
>;

/**
 * __useCreateReviewMutation__
 *
 * To run a mutation, you first call `useCreateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewMutation, { data, loading, error }] = useCreateReviewMutation({
 *   variables: {
 *      body: // value for 'body'
 *      movieId: // value for 'movieId'
 *   },
 * });
 */
export function useCreateReviewMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateReviewMutation,
    CreateReviewMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateReviewMutation,
    CreateReviewMutationVariables
  >(CreateReviewDocument, options);
}
export type CreateReviewMutationHookResult = ReturnType<
  typeof useCreateReviewMutation
>;
export type CreateReviewMutationResult =
  Apollo.MutationResult<CreateReviewMutation>;
export type CreateReviewMutationOptions = Apollo.BaseMutationOptions<
  CreateReviewMutation,
  CreateReviewMutationVariables
>;
export const FindReviewDocument = gql`
  query FindReview($reviewId: String!) {
    review(reviewId: $reviewId) {
      ...ReviewFields
    }
  }
  ${ReviewFieldsFragmentDoc}
`;

/**
 * __useFindReviewQuery__
 *
 * To run a query within a React component, call `useFindReviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindReviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindReviewQuery({
 *   variables: {
 *      reviewId: // value for 'reviewId'
 *   },
 * });
 */
export function useFindReviewQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindReviewQuery,
    FindReviewQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindReviewQuery, FindReviewQueryVariables>(
    FindReviewDocument,
    options,
  );
}
export function useFindReviewLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindReviewQuery,
    FindReviewQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindReviewQuery, FindReviewQueryVariables>(
    FindReviewDocument,
    options,
  );
}
export type FindReviewQueryHookResult = ReturnType<typeof useFindReviewQuery>;
export type FindReviewLazyQueryHookResult = ReturnType<
  typeof useFindReviewLazyQuery
>;
export type FindReviewQueryResult = Apollo.QueryResult<
  FindReviewQuery,
  FindReviewQueryVariables
>;
export const FindUserReviewsDocument = gql`
  query FindUserReviews($userId: String!) {
    reviews(userId: $userId) {
      ...ReviewFields
    }
  }
  ${ReviewFieldsFragmentDoc}
`;

/**
 * __useFindUserReviewsQuery__
 *
 * To run a query within a React component, call `useFindUserReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserReviewsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFindUserReviewsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindUserReviewsQuery,
    FindUserReviewsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindUserReviewsQuery, FindUserReviewsQueryVariables>(
    FindUserReviewsDocument,
    options,
  );
}
export function useFindUserReviewsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindUserReviewsQuery,
    FindUserReviewsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindUserReviewsQuery,
    FindUserReviewsQueryVariables
  >(FindUserReviewsDocument, options);
}
export type FindUserReviewsQueryHookResult = ReturnType<
  typeof useFindUserReviewsQuery
>;
export type FindUserReviewsLazyQueryHookResult = ReturnType<
  typeof useFindUserReviewsLazyQuery
>;
export type FindUserReviewsQueryResult = Apollo.QueryResult<
  FindUserReviewsQuery,
  FindUserReviewsQueryVariables
>;
export const FindUserRecentReviewsDocument = gql`
  query FindUserRecentReviews($userId: String!) {
    recentReviews(userId: $userId) {
      ...ReviewFields
    }
  }
  ${ReviewFieldsFragmentDoc}
`;

/**
 * __useFindUserRecentReviewsQuery__
 *
 * To run a query within a React component, call `useFindUserRecentReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserRecentReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserRecentReviewsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFindUserRecentReviewsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindUserRecentReviewsQuery,
    FindUserRecentReviewsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindUserRecentReviewsQuery,
    FindUserRecentReviewsQueryVariables
  >(FindUserRecentReviewsDocument, options);
}
export function useFindUserRecentReviewsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindUserRecentReviewsQuery,
    FindUserRecentReviewsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindUserRecentReviewsQuery,
    FindUserRecentReviewsQueryVariables
  >(FindUserRecentReviewsDocument, options);
}
export type FindUserRecentReviewsQueryHookResult = ReturnType<
  typeof useFindUserRecentReviewsQuery
>;
export type FindUserRecentReviewsLazyQueryHookResult = ReturnType<
  typeof useFindUserRecentReviewsLazyQuery
>;
export type FindUserRecentReviewsQueryResult = Apollo.QueryResult<
  FindUserRecentReviewsQuery,
  FindUserRecentReviewsQueryVariables
>;
export const FindUserPinnedReviewsDocument = gql`
  query FindUserPinnedReviews($userId: String!) {
    pinnedReviews(userId: $userId) @connection(key: "pinnedReviews") {
      ...ReviewFields
    }
  }
  ${ReviewFieldsFragmentDoc}
`;

/**
 * __useFindUserPinnedReviewsQuery__
 *
 * To run a query within a React component, call `useFindUserPinnedReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserPinnedReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserPinnedReviewsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFindUserPinnedReviewsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindUserPinnedReviewsQuery,
    FindUserPinnedReviewsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindUserPinnedReviewsQuery,
    FindUserPinnedReviewsQueryVariables
  >(FindUserPinnedReviewsDocument, options);
}
export function useFindUserPinnedReviewsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindUserPinnedReviewsQuery,
    FindUserPinnedReviewsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindUserPinnedReviewsQuery,
    FindUserPinnedReviewsQueryVariables
  >(FindUserPinnedReviewsDocument, options);
}
export type FindUserPinnedReviewsQueryHookResult = ReturnType<
  typeof useFindUserPinnedReviewsQuery
>;
export type FindUserPinnedReviewsLazyQueryHookResult = ReturnType<
  typeof useFindUserPinnedReviewsLazyQuery
>;
export type FindUserPinnedReviewsQueryResult = Apollo.QueryResult<
  FindUserPinnedReviewsQuery,
  FindUserPinnedReviewsQueryVariables
>;
export const FindUserPopularReviewsDocument = gql`
  query FindUserPopularReviews($userId: String!) {
    popularReviews(userId: $userId) {
      ...ReviewFields
    }
  }
  ${ReviewFieldsFragmentDoc}
`;

/**
 * __useFindUserPopularReviewsQuery__
 *
 * To run a query within a React component, call `useFindUserPopularReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserPopularReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserPopularReviewsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFindUserPopularReviewsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindUserPopularReviewsQuery,
    FindUserPopularReviewsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindUserPopularReviewsQuery,
    FindUserPopularReviewsQueryVariables
  >(FindUserPopularReviewsDocument, options);
}
export function useFindUserPopularReviewsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindUserPopularReviewsQuery,
    FindUserPopularReviewsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindUserPopularReviewsQuery,
    FindUserPopularReviewsQueryVariables
  >(FindUserPopularReviewsDocument, options);
}
export type FindUserPopularReviewsQueryHookResult = ReturnType<
  typeof useFindUserPopularReviewsQuery
>;
export type FindUserPopularReviewsLazyQueryHookResult = ReturnType<
  typeof useFindUserPopularReviewsLazyQuery
>;
export type FindUserPopularReviewsQueryResult = Apollo.QueryResult<
  FindUserPopularReviewsQuery,
  FindUserPopularReviewsQueryVariables
>;
export const FindUserDocument = gql`
  query FindUser($userId: String!) {
    user(userId: $userId) {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;

/**
 * __useFindUserQuery__
 *
 * To run a query within a React component, call `useFindUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFindUserQuery(
  baseOptions: Apollo.QueryHookOptions<FindUserQuery, FindUserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindUserQuery, FindUserQueryVariables>(
    FindUserDocument,
    options,
  );
}
export function useFindUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindUserQuery,
    FindUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindUserQuery, FindUserQueryVariables>(
    FindUserDocument,
    options,
  );
}
export type FindUserQueryHookResult = ReturnType<typeof useFindUserQuery>;
export type FindUserLazyQueryHookResult = ReturnType<
  typeof useFindUserLazyQuery
>;
export type FindUserQueryResult = Apollo.QueryResult<
  FindUserQuery,
  FindUserQueryVariables
>;
export const SignInDocument = gql`
  mutation SignIn($username: String!) {
    login(username: $username) {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;
export type SignInMutationFn = Apollo.MutationFunction<
  SignInMutation,
  SignInMutationVariables
>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useSignInMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignInMutation,
    SignInMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignInMutation, SignInMutationVariables>(
    SignInDocument,
    options,
  );
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  SignInMutation,
  SignInMutationVariables
>;
