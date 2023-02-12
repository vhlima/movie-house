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
  /** Sort scalar type */
  Sort: any;
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
  post: Post;
  postId: Scalars['Int'];
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
  id: Scalars['Int'];
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

export type Limit = {
  __typename?: 'Limit';
  limit: Scalars['Int'];
  limitType: LimitType;
};

/** User list type defines wich category is that list in */
export enum LimitType {
  MaxFavoriteMovies = 'MAX_FAVORITE_MOVIES',
  MaxFeaturedReviews = 'MAX_FEATURED_REVIEWS',
  MaxPinnedReviews = 'MAX_PINNED_REVIEWS',
}

export type List = {
  __typename?: 'List';
  backgroundImageUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isPrivate: Scalars['Boolean'];
  movies: Array<Movie>;
  name: Scalars['String'];
  post: Post;
  user: User;
};

export type ListMovie = {
  __typename?: 'ListMovie';
  createdAt: Scalars['DateTime'];
  movie: Movie;
  updatedAt: Scalars['DateTime'];
};

export type ListSortInput = {
  type: ListSortType;
};

/** Sort options for lists */
export enum ListSortType {
  Name = 'NAME',
  Older = 'OLDER',
  Popularity = 'POPULARITY',
  Updated = 'UPDATED',
}

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
  releaseDate?: Maybe<Scalars['String']>;
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
  totalPages: Scalars['Int'];
  totalResults: Scalars['Int'];
};

export type MovieSortInput = {
  filter?: InputMaybe<Scalars['Sort']>;
  type: MovieSortType;
};

/** Sort options for movie list */
export enum MovieSortType {
  Decade = 'DECADE',
  Genre = 'GENRE',
  PopularityAsc = 'POPULARITY_ASC',
  PopularityDesc = 'POPULARITY_DESC',
  PopularityYear = 'POPULARITY_YEAR',
  ReleaseDateAsc = 'RELEASE_DATE_ASC',
  ReleaseDateDesc = 'RELEASE_DATE_DESC',
  Service = 'SERVICE',
  Year = 'YEAR',
}

export type MovieTrending = {
  __typename?: 'MovieTrending';
  page: Scalars['Int'];
  results: Array<Movie>;
};

export type Mutation = {
  __typename?: 'Mutation';
  comment: Commentary;
  deleteCommentary: Scalars['String'];
  deleteReply: Scalars['String'];
  follow: Scalars['Boolean'];
  like: Scalars['Boolean'];
  register: Scalars['Boolean'];
  reply: Reply;
  reviewCreate: Review;
  reviewDelete: Scalars['Boolean'];
  reviewPin: Review;
  reviewUnpin: Review;
  updateUser: User;
  userListAddMovie: ListMovie;
  userListCreate: List;
  userListDelete: Scalars['Boolean'];
  userListRemoveMovie: Scalars['Boolean'];
  userPreMadeListAddMovie: ListMovie;
  userPreMadeListRemoveMovie: Scalars['Boolean'];
};

export type MutationCommentArgs = {
  body: Scalars['String'];
  postId: Scalars['Int'];
};

export type MutationDeleteCommentaryArgs = {
  commentaryId: Scalars['String'];
};

export type MutationDeleteReplyArgs = {
  replyId: Scalars['String'];
};

export type MutationFollowArgs = {
  userId: Scalars['String'];
};

export type MutationLikeArgs = {
  referenceId?: InputMaybe<Scalars['String']>;
  rootId: Scalars['String'];
};

export type MutationRegisterArgs = {
  githubId: Scalars['String'];
};

export type MutationReplyArgs = {
  body: Scalars['String'];
  commentaryId: Scalars['String'];
};

export type MutationReviewCreateArgs = {
  body: Scalars['String'];
  movieId: Scalars['Int'];
};

export type MutationReviewDeleteArgs = {
  postId: Scalars['Int'];
};

export type MutationReviewPinArgs = {
  postId: Scalars['Int'];
};

export type MutationReviewUnpinArgs = {
  postId: Scalars['Int'];
};

export type MutationUpdateUserArgs = {
  data: UserFieldsInput;
};

export type MutationUserListAddMovieArgs = {
  listId: Scalars['String'];
  movieId: Scalars['Int'];
};

export type MutationUserListCreateArgs = {
  body?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type MutationUserListDeleteArgs = {
  listId: Scalars['String'];
};

export type MutationUserListRemoveMovieArgs = {
  listId: Scalars['String'];
  movieId: Scalars['Int'];
};

export type MutationUserPreMadeListAddMovieArgs = {
  listType: PreMadeListType;
  movieId: Scalars['Int'];
};

export type MutationUserPreMadeListRemoveMovieArgs = {
  listType: PreMadeListType;
  movieId: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

/** Used to distinguish lists */
export enum PreMadeListType {
  Favorite = 'FAVORITE',
  Watched = 'WATCHED',
  Watchlist = 'WATCHLIST',
  WatchLater = 'WATCH_LATER',
}

export type ProfileStats = {
  __typename?: 'ProfileStats';
  followerCount: Scalars['Int'];
  followingCount: Scalars['Int'];
  listCount: Scalars['Int'];
  moviesWatchedCount: Scalars['Int'];
  moviesWatchedThisYearCount: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  commentaries: Commentaries;
  followers: Followers;
  following: Followers;
  hasUserLike: Scalars['Boolean'];
  isFollowing: Scalars['Boolean'];
  isMovieOnList: Scalars['Boolean'];
  isMovieOnPreMadeList: Scalars['Boolean'];
  limit: Limit;
  movie: Movie;
  moviePopularLists: Array<List>;
  movieRecommendations: Array<Movie>;
  movies: MovieSearch;
  replies: Replies;
  review: Review;
  reviewsPopularFromMovie: Array<Review>;
  reviewsPopularWeek: Array<Review>;
  reviewsRecent: Array<Review>;
  reviewsRecentFromMovie: Array<Review>;
  reviewsUser: Array<Review>;
  reviewsUserPinned: Array<Review>;
  reviewsUserPopular: Array<Review>;
  reviewsUserRecent: Array<Review>;
  searchMovie: MovieSearch;
  streamProviders: Array<StreamingProvider>;
  trendingMovies: MovieTrending;
  user: User;
  userByProvider: User;
  userList: List;
  userListMovies: Array<Movie>;
  userLists: Array<List>;
  userPreMadeListMovies: Array<Movie>;
  userProfileStats: ProfileStats;
};

export type QueryCommentariesArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  postId: Scalars['Int'];
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

export type QueryHasUserLikeArgs = {
  referenceId?: InputMaybe<Scalars['String']>;
  rootId: Scalars['String'];
  userId: Scalars['String'];
};

export type QueryIsFollowingArgs = {
  userId: Scalars['String'];
};

export type QueryIsMovieOnListArgs = {
  postId: Scalars['Int'];
};

export type QueryIsMovieOnPreMadeListArgs = {
  listType: PreMadeListType;
  movieId: Scalars['Int'];
};

export type QueryLimitArgs = {
  limitType: LimitType;
};

export type QueryMovieArgs = {
  movieId: Scalars['Int'];
};

export type QueryMoviePopularListsArgs = {
  movieId: Scalars['Int'];
};

export type QueryMovieRecommendationsArgs = {
  movieId: Scalars['Int'];
};

export type QueryMoviesArgs = {
  page?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<MovieSortInput>;
};

export type QueryRepliesArgs = {
  after?: InputMaybe<Scalars['String']>;
  commentaryId: Scalars['String'];
  first: Scalars['Int'];
};

export type QueryReviewArgs = {
  postId: Scalars['Int'];
};

export type QueryReviewsPopularFromMovieArgs = {
  movieId: Scalars['Int'];
};

export type QueryReviewsRecentFromMovieArgs = {
  movieId: Scalars['Int'];
};

export type QueryReviewsUserArgs = {
  sort?: InputMaybe<ReviewSortInput>;
  userId: Scalars['String'];
};

export type QueryReviewsUserPinnedArgs = {
  userId: Scalars['String'];
};

export type QueryReviewsUserPopularArgs = {
  userId: Scalars['String'];
};

export type QueryReviewsUserRecentArgs = {
  userId: Scalars['String'];
};

export type QuerySearchMovieArgs = {
  page?: InputMaybe<Scalars['Int']>;
  searchTerm: Scalars['String'];
};

export type QueryTrendingMoviesArgs = {
  page: Scalars['Int'];
};

export type QueryUserArgs = {
  username: Scalars['String'];
};

export type QueryUserByProviderArgs = {
  provider: Scalars['String'];
  providerId: Scalars['String'];
};

export type QueryUserListArgs = {
  postId: Scalars['Int'];
};

export type QueryUserListMoviesArgs = {
  listId: Scalars['String'];
  page?: InputMaybe<Scalars['Int']>;
};

export type QueryUserListsArgs = {
  sort?: InputMaybe<ListSortInput>;
  userId: Scalars['String'];
};

export type QueryUserPreMadeListMoviesArgs = {
  listType: PreMadeListType;
  page?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<MovieSortInput>;
  userId: Scalars['String'];
};

export type QueryUserProfileStatsArgs = {
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
  commentary: Commentary;
  commentaryId: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  likes: Array<Like>;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type Review = {
  __typename?: 'Review';
  id: Scalars['ID'];
  isPinned: Scalars['Boolean'];
  movie: Movie;
  post: Post;
  user: User;
};

export type ReviewSortInput = {
  filter?: InputMaybe<Scalars['Sort']>;
  type: ReviewSortType;
};

/** Sort options for review */
export enum ReviewSortType {
  CreateDateAsc = 'CREATE_DATE_ASC',
  CreateDateDesc = 'CREATE_DATE_DESC',
  Year = 'YEAR',
}

export type StreamingProvider = {
  __typename?: 'StreamingProvider';
  displayPriority: Scalars['Int'];
  id: Scalars['Int'];
  logoUrl: Scalars['String'];
  name: Scalars['String'];
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

export type UserFieldsInput = {
  biography?: InputMaybe<Scalars['String']>;
  profilePicture?: InputMaybe<Scalars['String']>;
  realName?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type CommentaryFieldsFragment = {
  __typename?: 'Commentary';
  id: string;
  postId: number;
  body: string;
  replyCount: number;
  createdAt: any;
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
  postId: Scalars['Int'];
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
        postId: number;
        body: string;
        replyCount: number;
        createdAt: any;
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
  postId: Scalars['Int'];
}>;

export type AddCommentaryMutation = {
  __typename?: 'Mutation';
  comment: {
    __typename?: 'Commentary';
    id: string;
    postId: number;
    body: string;
    replyCount: number;
    createdAt: any;
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

export type FindLimitQueryVariables = Exact<{
  limitType: LimitType;
}>;

export type FindLimitQuery = {
  __typename?: 'Query';
  limit: { __typename?: 'Limit'; limit: number };
};

export type FindUserListMoviesQueryVariables = Exact<{
  listId: Scalars['String'];
}>;

export type FindUserListMoviesQuery = {
  __typename?: 'Query';
  userListMovies: Array<{
    __typename?: 'Movie';
    id: number;
    originalTitle: string;
    posterUrl: string;
  }>;
};

export type FindUserPreMadeListMoviesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<MovieSortInput>;
  listType: PreMadeListType;
  userId: Scalars['String'];
}>;

export type FindUserPreMadeListMoviesQuery = {
  __typename?: 'Query';
  userPreMadeListMovies: Array<{
    __typename?: 'Movie';
    id: number;
    originalTitle: string;
    posterUrl: string;
  }>;
};

export type IsMovieOnPreMadeListQueryVariables = Exact<{
  listType: PreMadeListType;
  movieId: Scalars['Int'];
}>;

export type IsMovieOnPreMadeListQuery = {
  __typename?: 'Query';
  isMovieOnPreMadeList: boolean;
};

export type IsMovieOnListQueryVariables = Exact<{
  postId: Scalars['Int'];
}>;

export type IsMovieOnListQuery = {
  __typename?: 'Query';
  isMovieOnList: boolean;
};

export type FindUserListNamesQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type FindUserListNamesQuery = {
  __typename?: 'Query';
  userLists: Array<{ __typename?: 'List'; id: string; name: string }>;
};

export type FindUserListsQueryVariables = Exact<{
  userId: Scalars['String'];
  sort?: InputMaybe<ListSortInput>;
}>;

export type FindUserListsQuery = {
  __typename?: 'Query';
  userLists: Array<{
    __typename?: 'List';
    name: string;
    isPrivate: boolean;
    user: {
      __typename?: 'User';
      id: string;
      username: string;
      profilePictureUrl?: string | null;
    };
    post: { __typename?: 'Post'; id: number; body: string };
    movies: Array<{
      __typename?: 'Movie';
      id: number;
      originalTitle: string;
      posterUrl: string;
    }>;
  }>;
};

export type FindUserListQueryVariables = Exact<{
  postId: Scalars['Int'];
}>;

export type FindUserListQuery = {
  __typename?: 'Query';
  userList: {
    __typename?: 'List';
    id: string;
    name: string;
    backgroundImageUrl?: string | null;
    user: {
      __typename?: 'User';
      id: string;
      username: string;
      profilePictureUrl?: string | null;
    };
    post: { __typename?: 'Post'; id: number; body: string; createdAt: any };
  };
};

export type FindMoviePopularListsQueryVariables = Exact<{
  movieId: Scalars['Int'];
}>;

export type FindMoviePopularListsQuery = {
  __typename?: 'Query';
  moviePopularLists: Array<{
    __typename?: 'List';
    id: string;
    name: string;
    backgroundImageUrl?: string | null;
    user: {
      __typename?: 'User';
      id: string;
      username: string;
      profilePictureUrl?: string | null;
    };
    post: { __typename?: 'Post'; id: number; body: string; createdAt: any };
    movies: Array<{
      __typename?: 'Movie';
      id: number;
      originalTitle: string;
      posterUrl: string;
    }>;
  }>;
};

export type CreateUserListMutationVariables = Exact<{
  name: Scalars['String'];
  body?: InputMaybe<Scalars['String']>;
}>;

export type CreateUserListMutation = {
  __typename?: 'Mutation';
  userListCreate: { __typename?: 'List'; id: string; name: string };
};

export type DeleteUserListMutationVariables = Exact<{
  listId: Scalars['String'];
}>;

export type DeleteUserListMutation = {
  __typename?: 'Mutation';
  userListDelete: boolean;
};

export type AddMovieToListMutationVariables = Exact<{
  movieId: Scalars['Int'];
  listId: Scalars['String'];
}>;

export type AddMovieToListMutation = {
  __typename?: 'Mutation';
  userListAddMovie: {
    __typename?: 'ListMovie';
    movie: { __typename?: 'Movie'; originalTitle: string };
  };
};

export type RemoveMovieFromListMutationVariables = Exact<{
  movieId: Scalars['Int'];
  listId: Scalars['String'];
}>;

export type RemoveMovieFromListMutation = {
  __typename?: 'Mutation';
  userListRemoveMovie: boolean;
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
  releaseDate?: string | null;
  posterUrl: string;
  backdropUrl: string;
  genres: Array<{ __typename?: 'Genre'; id: number; name: string }>;
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
    releaseDate?: string | null;
    posterUrl: string;
    backdropUrl: string;
    genres: Array<{ __typename?: 'Genre'; id: number; name: string }>;
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
    releaseDate?: string | null;
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
      crew: Array<{
        __typename?: 'Crew';
        id: number;
        popularity: number;
        department: string;
        originalName: string;
      }>;
    };
    genres: Array<{ __typename?: 'Genre'; id: number; name: string }>;
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
  page?: InputMaybe<Scalars['Int']>;
}>;

export type SearchMovieQuery = {
  __typename?: 'Query';
  searchMovie: {
    __typename?: 'MovieSearch';
    page: number;
    totalResults: number;
    totalPages: number;
    results: Array<{
      __typename?: 'Movie';
      id: number;
      posterUrl: string;
      originalTitle: string;
      releaseDate?: string | null;
    }>;
  };
};

export type FindTrendingMoviesQueryVariables = Exact<{
  page: Scalars['Int'];
}>;

export type FindTrendingMoviesQuery = {
  __typename?: 'Query';
  trendingMovies: {
    __typename?: 'MovieTrending';
    page: number;
    results: Array<{
      __typename?: 'Movie';
      id: number;
      originalTitle: string;
      posterUrl: string;
    }>;
  };
};

export type FindMovieRecommendationsQueryVariables = Exact<{
  movieId: Scalars['Int'];
}>;

export type FindMovieRecommendationsQuery = {
  __typename?: 'Query';
  movieRecommendations: Array<{
    __typename?: 'Movie';
    id: number;
    originalTitle: string;
    posterUrl: string;
  }>;
};

export type FindMoviesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<MovieSortInput>;
}>;

export type FindMoviesQuery = {
  __typename?: 'Query';
  movies: {
    __typename?: 'MovieSearch';
    page: number;
    totalPages: number;
    totalResults: number;
    results: Array<{
      __typename?: 'Movie';
      id: number;
      originalTitle: string;
      posterUrl: string;
    }>;
  };
};

export type AddMovieToPreMadeListMutationVariables = Exact<{
  listType: PreMadeListType;
  movieId: Scalars['Int'];
}>;

export type AddMovieToPreMadeListMutation = {
  __typename?: 'Mutation';
  userPreMadeListAddMovie: {
    __typename?: 'ListMovie';
    movie: {
      __typename?: 'Movie';
      id: number;
      originalTitle: string;
      posterUrl: string;
    };
  };
};

export type RemoveMovieFromPreMadeListMutationVariables = Exact<{
  listType: PreMadeListType;
  movieId: Scalars['Int'];
}>;

export type RemoveMovieFromPreMadeListMutation = {
  __typename?: 'Mutation';
  userPreMadeListRemoveMovie: boolean;
};

export type FindUserProfileStatsQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type FindUserProfileStatsQuery = {
  __typename?: 'Query';
  userProfileStats: {
    __typename?: 'ProfileStats';
    followerCount: number;
    followingCount: number;
    listCount: number;
    moviesWatchedCount: number;
    moviesWatchedThisYearCount: number;
  };
};

export type ReplyFieldsFragment = {
  __typename?: 'Reply';
  id: string;
  body: string;
  createdAt: any;
  user: {
    __typename?: 'User';
    id: string;
    username: string;
    profilePictureUrl?: string | null;
  };
  commentary: { __typename?: 'Commentary'; id: string; postId: number };
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
        createdAt: any;
        user: {
          __typename?: 'User';
          id: string;
          username: string;
          profilePictureUrl?: string | null;
        };
        commentary: { __typename?: 'Commentary'; id: string; postId: number };
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
    createdAt: any;
    user: {
      __typename?: 'User';
      id: string;
      username: string;
      profilePictureUrl?: string | null;
    };
    commentary: { __typename?: 'Commentary'; id: string; postId: number };
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

export type FindReviewQueryVariables = Exact<{
  postId: Scalars['Int'];
}>;

export type FindReviewQuery = {
  __typename?: 'Query';
  review: {
    __typename?: 'Review';
    id: string;
    isPinned: boolean;
    user: {
      __typename?: 'User';
      username: string;
      profilePictureUrl?: string | null;
    };
    post: { __typename?: 'Post'; id: number; body: string; createdAt: any };
    movie: {
      __typename?: 'Movie';
      id: number;
      originalTitle: string;
      runtime: number;
      posterUrl: string;
      backdropUrl: string;
      releaseDate?: string | null;
      credits: {
        __typename?: 'MovieCredits';
        crew: Array<{
          __typename?: 'Crew';
          department: string;
          originalName: string;
        }>;
      };
    };
  };
};

export type BasicReviewFieldsFragment = {
  __typename?: 'Review';
  id: string;
  user: {
    __typename?: 'User';
    username: string;
    profilePictureUrl?: string | null;
  };
  post: { __typename?: 'Post'; id: number; body: string; createdAt: any };
  movie: {
    __typename?: 'Movie';
    id: number;
    originalTitle: string;
    posterUrl: string;
    releaseDate?: string | null;
  };
};

export type FindUserRecentReviewsQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type FindUserRecentReviewsQuery = {
  __typename?: 'Query';
  reviewsUserRecent: Array<{
    __typename?: 'Review';
    id: string;
    user: {
      __typename?: 'User';
      username: string;
      profilePictureUrl?: string | null;
    };
    post: { __typename?: 'Post'; id: number; body: string; createdAt: any };
    movie: {
      __typename?: 'Movie';
      id: number;
      originalTitle: string;
      posterUrl: string;
      releaseDate?: string | null;
    };
  }>;
};

export type FindUserPopularReviewsQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type FindUserPopularReviewsQuery = {
  __typename?: 'Query';
  reviewsUserPopular: Array<{
    __typename?: 'Review';
    id: string;
    user: {
      __typename?: 'User';
      username: string;
      profilePictureUrl?: string | null;
    };
    post: { __typename?: 'Post'; id: number; body: string; createdAt: any };
    movie: {
      __typename?: 'Movie';
      id: number;
      originalTitle: string;
      posterUrl: string;
      releaseDate?: string | null;
    };
  }>;
};

export type FindUserPinnedReviewsQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type FindUserPinnedReviewsQuery = {
  __typename?: 'Query';
  reviewsUserPinned: Array<{
    __typename?: 'Review';
    isPinned: boolean;
    id: string;
    user: {
      __typename?: 'User';
      username: string;
      profilePictureUrl?: string | null;
    };
    post: { __typename?: 'Post'; id: number; body: string; createdAt: any };
    movie: {
      __typename?: 'Movie';
      id: number;
      originalTitle: string;
      posterUrl: string;
      releaseDate?: string | null;
    };
  }>;
};

export type FindUserReviewsQueryVariables = Exact<{
  userId: Scalars['String'];
  sort?: InputMaybe<ReviewSortInput>;
}>;

export type FindUserReviewsQuery = {
  __typename?: 'Query';
  reviewsUser: Array<{
    __typename?: 'Review';
    isPinned: boolean;
    id: string;
    movie: {
      __typename?: 'Movie';
      releaseDate?: string | null;
      id: number;
      originalTitle: string;
      posterUrl: string;
    };
    user: {
      __typename?: 'User';
      username: string;
      profilePictureUrl?: string | null;
    };
    post: { __typename?: 'Post'; id: number; body: string; createdAt: any };
  }>;
};

export type FindRecentReviewsQueryVariables = Exact<{ [key: string]: never }>;

export type FindRecentReviewsQuery = {
  __typename?: 'Query';
  reviewsRecent: Array<{
    __typename?: 'Review';
    id: string;
    user: {
      __typename?: 'User';
      username: string;
      profilePictureUrl?: string | null;
    };
    post: { __typename?: 'Post'; id: number; body: string; createdAt: any };
    movie: {
      __typename?: 'Movie';
      id: number;
      originalTitle: string;
      posterUrl: string;
      releaseDate?: string | null;
    };
  }>;
};

export type FindPopularReviewsFromMovieQueryVariables = Exact<{
  movieId: Scalars['Int'];
}>;

export type FindPopularReviewsFromMovieQuery = {
  __typename?: 'Query';
  reviewsPopularFromMovie: Array<{
    __typename?: 'Review';
    id: string;
    user: {
      __typename?: 'User';
      username: string;
      profilePictureUrl?: string | null;
    };
    post: { __typename?: 'Post'; id: number; body: string; createdAt: any };
    movie: {
      __typename?: 'Movie';
      id: number;
      originalTitle: string;
      posterUrl: string;
      releaseDate?: string | null;
    };
  }>;
};

export type FindMovieRecentReviewsQueryVariables = Exact<{
  movieId: Scalars['Int'];
}>;

export type FindMovieRecentReviewsQuery = {
  __typename?: 'Query';
  reviewsRecentFromMovie: Array<{
    __typename?: 'Review';
    id: string;
    user: {
      __typename?: 'User';
      username: string;
      profilePictureUrl?: string | null;
    };
    post: { __typename?: 'Post'; id: number; body: string; createdAt: any };
    movie: {
      __typename?: 'Movie';
      id: number;
      originalTitle: string;
      posterUrl: string;
      releaseDate?: string | null;
    };
  }>;
};

export type FindPopularReviewsWeekQueryVariables = Exact<{
  [key: string]: never;
}>;

export type FindPopularReviewsWeekQuery = {
  __typename?: 'Query';
  reviewsPopularWeek: Array<{
    __typename?: 'Review';
    id: string;
    user: {
      __typename?: 'User';
      username: string;
      profilePictureUrl?: string | null;
    };
    post: { __typename?: 'Post'; id: number; body: string; createdAt: any };
    movie: {
      __typename?: 'Movie';
      id: number;
      originalTitle: string;
      posterUrl: string;
      releaseDate?: string | null;
    };
  }>;
};

export type CreateReviewMutationVariables = Exact<{
  body: Scalars['String'];
  movieId: Scalars['Int'];
}>;

export type CreateReviewMutation = {
  __typename?: 'Mutation';
  reviewCreate: {
    __typename?: 'Review';
    post: { __typename?: 'Post'; id: number };
  };
};

export type PinReviewMutationVariables = Exact<{
  postId: Scalars['Int'];
}>;

export type PinReviewMutation = {
  __typename?: 'Mutation';
  reviewPin: {
    __typename?: 'Review';
    isPinned: boolean;
    id: string;
    user: {
      __typename?: 'User';
      username: string;
      profilePictureUrl?: string | null;
    };
    post: { __typename?: 'Post'; id: number; body: string; createdAt: any };
    movie: {
      __typename?: 'Movie';
      id: number;
      originalTitle: string;
      posterUrl: string;
      releaseDate?: string | null;
    };
  };
};

export type UnpinReviewMutationVariables = Exact<{
  postId: Scalars['Int'];
}>;

export type UnpinReviewMutation = {
  __typename?: 'Mutation';
  reviewUnpin: {
    __typename?: 'Review';
    isPinned: boolean;
    id: string;
    user: {
      __typename?: 'User';
      username: string;
      profilePictureUrl?: string | null;
    };
    post: { __typename?: 'Post'; id: number; body: string; createdAt: any };
    movie: {
      __typename?: 'Movie';
      id: number;
      originalTitle: string;
      posterUrl: string;
      releaseDate?: string | null;
    };
  };
};

export type FindStreamProvidersQueryVariables = Exact<{ [key: string]: never }>;

export type FindStreamProvidersQuery = {
  __typename?: 'Query';
  streamProviders: Array<{
    __typename?: 'StreamingProvider';
    id: number;
    name: string;
  }>;
};

export type UserFieldsFragment = {
  __typename?: 'User';
  id: string;
  username: string;
  realName?: string | null;
  biography?: string | null;
  profilePictureUrl?: string | null;
  createdAt: any;
};

export type FindUserQueryVariables = Exact<{
  username: Scalars['String'];
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
    createdAt: any;
  };
};

export type FindUserByProviderQueryVariables = Exact<{
  providerId: Scalars['String'];
  provider: Scalars['String'];
}>;

export type FindUserByProviderQuery = {
  __typename?: 'Query';
  userByProvider: {
    __typename?: 'User';
    id: string;
    username: string;
    realName?: string | null;
    profilePictureUrl?: string | null;
  };
};

export type UserRegisterMutationVariables = Exact<{
  githubId: Scalars['String'];
}>;

export type UserRegisterMutation = {
  __typename?: 'Mutation';
  register: boolean;
};

export const CommentaryFieldsFragmentDoc = gql`
  fragment CommentaryFields on Commentary {
    id
    postId
    body
    replyCount
    createdAt
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
    createdAt
    user {
      id
      username
      profilePictureUrl
    }
    commentary {
      id
      postId
    }
    likes {
      user {
        id
      }
    }
  }
`;
export const BasicReviewFieldsFragmentDoc = gql`
  fragment BasicReviewFields on Review {
    id
    user {
      username
      profilePictureUrl
    }
    post {
      id
      body
      createdAt
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
    createdAt
  }
`;
export const FindCommentariesDocument = gql`
  query FindCommentaries($first: Int!, $postId: Int!, $after: String) {
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
  mutation AddCommentary($body: String!, $postId: Int!) {
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
export const FindLimitDocument = gql`
  query FindLimit($limitType: LimitType!) {
    limit(limitType: $limitType) {
      limit
    }
  }
`;

/**
 * __useFindLimitQuery__
 *
 * To run a query within a React component, call `useFindLimitQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindLimitQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindLimitQuery({
 *   variables: {
 *      limitType: // value for 'limitType'
 *   },
 * });
 */
export function useFindLimitQuery(
  baseOptions: Apollo.QueryHookOptions<FindLimitQuery, FindLimitQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindLimitQuery, FindLimitQueryVariables>(
    FindLimitDocument,
    options,
  );
}
export function useFindLimitLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindLimitQuery,
    FindLimitQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindLimitQuery, FindLimitQueryVariables>(
    FindLimitDocument,
    options,
  );
}
export type FindLimitQueryHookResult = ReturnType<typeof useFindLimitQuery>;
export type FindLimitLazyQueryHookResult = ReturnType<
  typeof useFindLimitLazyQuery
>;
export type FindLimitQueryResult = Apollo.QueryResult<
  FindLimitQuery,
  FindLimitQueryVariables
>;
export const FindUserListMoviesDocument = gql`
  query FindUserListMovies($listId: String!) {
    userListMovies(listId: $listId) {
      id
      originalTitle
      posterUrl
    }
  }
`;

/**
 * __useFindUserListMoviesQuery__
 *
 * To run a query within a React component, call `useFindUserListMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserListMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserListMoviesQuery({
 *   variables: {
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useFindUserListMoviesQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindUserListMoviesQuery,
    FindUserListMoviesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindUserListMoviesQuery,
    FindUserListMoviesQueryVariables
  >(FindUserListMoviesDocument, options);
}
export function useFindUserListMoviesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindUserListMoviesQuery,
    FindUserListMoviesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindUserListMoviesQuery,
    FindUserListMoviesQueryVariables
  >(FindUserListMoviesDocument, options);
}
export type FindUserListMoviesQueryHookResult = ReturnType<
  typeof useFindUserListMoviesQuery
>;
export type FindUserListMoviesLazyQueryHookResult = ReturnType<
  typeof useFindUserListMoviesLazyQuery
>;
export type FindUserListMoviesQueryResult = Apollo.QueryResult<
  FindUserListMoviesQuery,
  FindUserListMoviesQueryVariables
>;
export const FindUserPreMadeListMoviesDocument = gql`
  query FindUserPreMadeListMovies(
    $page: Int
    $sort: MovieSortInput
    $listType: PreMadeListType!
    $userId: String!
  ) {
    userPreMadeListMovies(
      page: $page
      sort: $sort
      listType: $listType
      userId: $userId
    ) {
      id
      originalTitle
      posterUrl
    }
  }
`;

/**
 * __useFindUserPreMadeListMoviesQuery__
 *
 * To run a query within a React component, call `useFindUserPreMadeListMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserPreMadeListMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserPreMadeListMoviesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      sort: // value for 'sort'
 *      listType: // value for 'listType'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFindUserPreMadeListMoviesQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindUserPreMadeListMoviesQuery,
    FindUserPreMadeListMoviesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindUserPreMadeListMoviesQuery,
    FindUserPreMadeListMoviesQueryVariables
  >(FindUserPreMadeListMoviesDocument, options);
}
export function useFindUserPreMadeListMoviesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindUserPreMadeListMoviesQuery,
    FindUserPreMadeListMoviesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindUserPreMadeListMoviesQuery,
    FindUserPreMadeListMoviesQueryVariables
  >(FindUserPreMadeListMoviesDocument, options);
}
export type FindUserPreMadeListMoviesQueryHookResult = ReturnType<
  typeof useFindUserPreMadeListMoviesQuery
>;
export type FindUserPreMadeListMoviesLazyQueryHookResult = ReturnType<
  typeof useFindUserPreMadeListMoviesLazyQuery
>;
export type FindUserPreMadeListMoviesQueryResult = Apollo.QueryResult<
  FindUserPreMadeListMoviesQuery,
  FindUserPreMadeListMoviesQueryVariables
>;
export const IsMovieOnPreMadeListDocument = gql`
  query IsMovieOnPreMadeList($listType: PreMadeListType!, $movieId: Int!) {
    isMovieOnPreMadeList(listType: $listType, movieId: $movieId)
  }
`;

/**
 * __useIsMovieOnPreMadeListQuery__
 *
 * To run a query within a React component, call `useIsMovieOnPreMadeListQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsMovieOnPreMadeListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsMovieOnPreMadeListQuery({
 *   variables: {
 *      listType: // value for 'listType'
 *      movieId: // value for 'movieId'
 *   },
 * });
 */
export function useIsMovieOnPreMadeListQuery(
  baseOptions: Apollo.QueryHookOptions<
    IsMovieOnPreMadeListQuery,
    IsMovieOnPreMadeListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IsMovieOnPreMadeListQuery,
    IsMovieOnPreMadeListQueryVariables
  >(IsMovieOnPreMadeListDocument, options);
}
export function useIsMovieOnPreMadeListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IsMovieOnPreMadeListQuery,
    IsMovieOnPreMadeListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IsMovieOnPreMadeListQuery,
    IsMovieOnPreMadeListQueryVariables
  >(IsMovieOnPreMadeListDocument, options);
}
export type IsMovieOnPreMadeListQueryHookResult = ReturnType<
  typeof useIsMovieOnPreMadeListQuery
>;
export type IsMovieOnPreMadeListLazyQueryHookResult = ReturnType<
  typeof useIsMovieOnPreMadeListLazyQuery
>;
export type IsMovieOnPreMadeListQueryResult = Apollo.QueryResult<
  IsMovieOnPreMadeListQuery,
  IsMovieOnPreMadeListQueryVariables
>;
export const IsMovieOnListDocument = gql`
  query IsMovieOnList($postId: Int!) {
    isMovieOnList(postId: $postId)
  }
`;

/**
 * __useIsMovieOnListQuery__
 *
 * To run a query within a React component, call `useIsMovieOnListQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsMovieOnListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsMovieOnListQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useIsMovieOnListQuery(
  baseOptions: Apollo.QueryHookOptions<
    IsMovieOnListQuery,
    IsMovieOnListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IsMovieOnListQuery, IsMovieOnListQueryVariables>(
    IsMovieOnListDocument,
    options,
  );
}
export function useIsMovieOnListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IsMovieOnListQuery,
    IsMovieOnListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IsMovieOnListQuery, IsMovieOnListQueryVariables>(
    IsMovieOnListDocument,
    options,
  );
}
export type IsMovieOnListQueryHookResult = ReturnType<
  typeof useIsMovieOnListQuery
>;
export type IsMovieOnListLazyQueryHookResult = ReturnType<
  typeof useIsMovieOnListLazyQuery
>;
export type IsMovieOnListQueryResult = Apollo.QueryResult<
  IsMovieOnListQuery,
  IsMovieOnListQueryVariables
>;
export const FindUserListNamesDocument = gql`
  query FindUserListNames($userId: String!) {
    userLists(userId: $userId) {
      id
      name
    }
  }
`;

/**
 * __useFindUserListNamesQuery__
 *
 * To run a query within a React component, call `useFindUserListNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserListNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserListNamesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFindUserListNamesQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindUserListNamesQuery,
    FindUserListNamesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindUserListNamesQuery,
    FindUserListNamesQueryVariables
  >(FindUserListNamesDocument, options);
}
export function useFindUserListNamesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindUserListNamesQuery,
    FindUserListNamesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindUserListNamesQuery,
    FindUserListNamesQueryVariables
  >(FindUserListNamesDocument, options);
}
export type FindUserListNamesQueryHookResult = ReturnType<
  typeof useFindUserListNamesQuery
>;
export type FindUserListNamesLazyQueryHookResult = ReturnType<
  typeof useFindUserListNamesLazyQuery
>;
export type FindUserListNamesQueryResult = Apollo.QueryResult<
  FindUserListNamesQuery,
  FindUserListNamesQueryVariables
>;
export const FindUserListsDocument = gql`
  query FindUserLists($userId: String!, $sort: ListSortInput) {
    userLists(userId: $userId, sort: $sort) {
      name
      isPrivate
      user {
        id
        username
        profilePictureUrl
      }
      post {
        id
        body
      }
      movies {
        id
        originalTitle
        posterUrl
      }
    }
  }
`;

/**
 * __useFindUserListsQuery__
 *
 * To run a query within a React component, call `useFindUserListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserListsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useFindUserListsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindUserListsQuery,
    FindUserListsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindUserListsQuery, FindUserListsQueryVariables>(
    FindUserListsDocument,
    options,
  );
}
export function useFindUserListsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindUserListsQuery,
    FindUserListsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindUserListsQuery, FindUserListsQueryVariables>(
    FindUserListsDocument,
    options,
  );
}
export type FindUserListsQueryHookResult = ReturnType<
  typeof useFindUserListsQuery
>;
export type FindUserListsLazyQueryHookResult = ReturnType<
  typeof useFindUserListsLazyQuery
>;
export type FindUserListsQueryResult = Apollo.QueryResult<
  FindUserListsQuery,
  FindUserListsQueryVariables
>;
export const FindUserListDocument = gql`
  query FindUserList($postId: Int!) {
    userList(postId: $postId) {
      id
      name
      backgroundImageUrl
      user {
        id
        username
        profilePictureUrl
      }
      post {
        id
        body
        createdAt
      }
    }
  }
`;

/**
 * __useFindUserListQuery__
 *
 * To run a query within a React component, call `useFindUserListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserListQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useFindUserListQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindUserListQuery,
    FindUserListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindUserListQuery, FindUserListQueryVariables>(
    FindUserListDocument,
    options,
  );
}
export function useFindUserListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindUserListQuery,
    FindUserListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindUserListQuery, FindUserListQueryVariables>(
    FindUserListDocument,
    options,
  );
}
export type FindUserListQueryHookResult = ReturnType<
  typeof useFindUserListQuery
>;
export type FindUserListLazyQueryHookResult = ReturnType<
  typeof useFindUserListLazyQuery
>;
export type FindUserListQueryResult = Apollo.QueryResult<
  FindUserListQuery,
  FindUserListQueryVariables
>;
export const FindMoviePopularListsDocument = gql`
  query FindMoviePopularLists($movieId: Int!) {
    moviePopularLists(movieId: $movieId) {
      id
      name
      backgroundImageUrl
      user {
        id
        username
        profilePictureUrl
      }
      post {
        id
        body
        createdAt
      }
      movies {
        id
        originalTitle
        posterUrl
      }
    }
  }
`;

/**
 * __useFindMoviePopularListsQuery__
 *
 * To run a query within a React component, call `useFindMoviePopularListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMoviePopularListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMoviePopularListsQuery({
 *   variables: {
 *      movieId: // value for 'movieId'
 *   },
 * });
 */
export function useFindMoviePopularListsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindMoviePopularListsQuery,
    FindMoviePopularListsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindMoviePopularListsQuery,
    FindMoviePopularListsQueryVariables
  >(FindMoviePopularListsDocument, options);
}
export function useFindMoviePopularListsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindMoviePopularListsQuery,
    FindMoviePopularListsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindMoviePopularListsQuery,
    FindMoviePopularListsQueryVariables
  >(FindMoviePopularListsDocument, options);
}
export type FindMoviePopularListsQueryHookResult = ReturnType<
  typeof useFindMoviePopularListsQuery
>;
export type FindMoviePopularListsLazyQueryHookResult = ReturnType<
  typeof useFindMoviePopularListsLazyQuery
>;
export type FindMoviePopularListsQueryResult = Apollo.QueryResult<
  FindMoviePopularListsQuery,
  FindMoviePopularListsQueryVariables
>;
export const CreateUserListDocument = gql`
  mutation CreateUserList($name: String!, $body: String) {
    userListCreate(name: $name, body: $body) {
      id
      name
    }
  }
`;
export type CreateUserListMutationFn = Apollo.MutationFunction<
  CreateUserListMutation,
  CreateUserListMutationVariables
>;

/**
 * __useCreateUserListMutation__
 *
 * To run a mutation, you first call `useCreateUserListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserListMutation, { data, loading, error }] = useCreateUserListMutation({
 *   variables: {
 *      name: // value for 'name'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useCreateUserListMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserListMutation,
    CreateUserListMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateUserListMutation,
    CreateUserListMutationVariables
  >(CreateUserListDocument, options);
}
export type CreateUserListMutationHookResult = ReturnType<
  typeof useCreateUserListMutation
>;
export type CreateUserListMutationResult =
  Apollo.MutationResult<CreateUserListMutation>;
export type CreateUserListMutationOptions = Apollo.BaseMutationOptions<
  CreateUserListMutation,
  CreateUserListMutationVariables
>;
export const DeleteUserListDocument = gql`
  mutation DeleteUserList($listId: String!) {
    userListDelete(listId: $listId)
  }
`;
export type DeleteUserListMutationFn = Apollo.MutationFunction<
  DeleteUserListMutation,
  DeleteUserListMutationVariables
>;

/**
 * __useDeleteUserListMutation__
 *
 * To run a mutation, you first call `useDeleteUserListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserListMutation, { data, loading, error }] = useDeleteUserListMutation({
 *   variables: {
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useDeleteUserListMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUserListMutation,
    DeleteUserListMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteUserListMutation,
    DeleteUserListMutationVariables
  >(DeleteUserListDocument, options);
}
export type DeleteUserListMutationHookResult = ReturnType<
  typeof useDeleteUserListMutation
>;
export type DeleteUserListMutationResult =
  Apollo.MutationResult<DeleteUserListMutation>;
export type DeleteUserListMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserListMutation,
  DeleteUserListMutationVariables
>;
export const AddMovieToListDocument = gql`
  mutation AddMovieToList($movieId: Int!, $listId: String!) {
    userListAddMovie(movieId: $movieId, listId: $listId) {
      movie {
        originalTitle
      }
    }
  }
`;
export type AddMovieToListMutationFn = Apollo.MutationFunction<
  AddMovieToListMutation,
  AddMovieToListMutationVariables
>;

/**
 * __useAddMovieToListMutation__
 *
 * To run a mutation, you first call `useAddMovieToListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMovieToListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMovieToListMutation, { data, loading, error }] = useAddMovieToListMutation({
 *   variables: {
 *      movieId: // value for 'movieId'
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useAddMovieToListMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddMovieToListMutation,
    AddMovieToListMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddMovieToListMutation,
    AddMovieToListMutationVariables
  >(AddMovieToListDocument, options);
}
export type AddMovieToListMutationHookResult = ReturnType<
  typeof useAddMovieToListMutation
>;
export type AddMovieToListMutationResult =
  Apollo.MutationResult<AddMovieToListMutation>;
export type AddMovieToListMutationOptions = Apollo.BaseMutationOptions<
  AddMovieToListMutation,
  AddMovieToListMutationVariables
>;
export const RemoveMovieFromListDocument = gql`
  mutation RemoveMovieFromList($movieId: Int!, $listId: String!) {
    userListRemoveMovie(movieId: $movieId, listId: $listId)
  }
`;
export type RemoveMovieFromListMutationFn = Apollo.MutationFunction<
  RemoveMovieFromListMutation,
  RemoveMovieFromListMutationVariables
>;

/**
 * __useRemoveMovieFromListMutation__
 *
 * To run a mutation, you first call `useRemoveMovieFromListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMovieFromListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMovieFromListMutation, { data, loading, error }] = useRemoveMovieFromListMutation({
 *   variables: {
 *      movieId: // value for 'movieId'
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useRemoveMovieFromListMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveMovieFromListMutation,
    RemoveMovieFromListMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RemoveMovieFromListMutation,
    RemoveMovieFromListMutationVariables
  >(RemoveMovieFromListDocument, options);
}
export type RemoveMovieFromListMutationHookResult = ReturnType<
  typeof useRemoveMovieFromListMutation
>;
export type RemoveMovieFromListMutationResult =
  Apollo.MutationResult<RemoveMovieFromListMutation>;
export type RemoveMovieFromListMutationOptions = Apollo.BaseMutationOptions<
  RemoveMovieFromListMutation,
  RemoveMovieFromListMutationVariables
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
        crew {
          id
          popularity
          department
          originalName
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
  query SearchMovie($searchTerm: String!, $page: Int) {
    searchMovie(searchTerm: $searchTerm, page: $page) {
      page
      totalResults
      totalPages
      results {
        id
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
 *      page: // value for 'page'
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
export const FindTrendingMoviesDocument = gql`
  query FindTrendingMovies($page: Int!) {
    trendingMovies(page: $page) @connection(key: "trendingMovies") {
      page
      results {
        id
        originalTitle
        posterUrl
      }
    }
  }
`;

/**
 * __useFindTrendingMoviesQuery__
 *
 * To run a query within a React component, call `useFindTrendingMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindTrendingMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindTrendingMoviesQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useFindTrendingMoviesQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindTrendingMoviesQuery,
    FindTrendingMoviesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindTrendingMoviesQuery,
    FindTrendingMoviesQueryVariables
  >(FindTrendingMoviesDocument, options);
}
export function useFindTrendingMoviesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindTrendingMoviesQuery,
    FindTrendingMoviesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindTrendingMoviesQuery,
    FindTrendingMoviesQueryVariables
  >(FindTrendingMoviesDocument, options);
}
export type FindTrendingMoviesQueryHookResult = ReturnType<
  typeof useFindTrendingMoviesQuery
>;
export type FindTrendingMoviesLazyQueryHookResult = ReturnType<
  typeof useFindTrendingMoviesLazyQuery
>;
export type FindTrendingMoviesQueryResult = Apollo.QueryResult<
  FindTrendingMoviesQuery,
  FindTrendingMoviesQueryVariables
>;
export const FindMovieRecommendationsDocument = gql`
  query FindMovieRecommendations($movieId: Int!) {
    movieRecommendations(movieId: $movieId) {
      id
      originalTitle
      posterUrl
    }
  }
`;

/**
 * __useFindMovieRecommendationsQuery__
 *
 * To run a query within a React component, call `useFindMovieRecommendationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMovieRecommendationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMovieRecommendationsQuery({
 *   variables: {
 *      movieId: // value for 'movieId'
 *   },
 * });
 */
export function useFindMovieRecommendationsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindMovieRecommendationsQuery,
    FindMovieRecommendationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindMovieRecommendationsQuery,
    FindMovieRecommendationsQueryVariables
  >(FindMovieRecommendationsDocument, options);
}
export function useFindMovieRecommendationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindMovieRecommendationsQuery,
    FindMovieRecommendationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindMovieRecommendationsQuery,
    FindMovieRecommendationsQueryVariables
  >(FindMovieRecommendationsDocument, options);
}
export type FindMovieRecommendationsQueryHookResult = ReturnType<
  typeof useFindMovieRecommendationsQuery
>;
export type FindMovieRecommendationsLazyQueryHookResult = ReturnType<
  typeof useFindMovieRecommendationsLazyQuery
>;
export type FindMovieRecommendationsQueryResult = Apollo.QueryResult<
  FindMovieRecommendationsQuery,
  FindMovieRecommendationsQueryVariables
>;
export const FindMoviesDocument = gql`
  query FindMovies($page: Int, $sort: MovieSortInput) {
    movies(page: $page, sort: $sort) {
      page
      totalPages
      totalResults
      results {
        id
        originalTitle
        posterUrl
      }
    }
  }
`;

/**
 * __useFindMoviesQuery__
 *
 * To run a query within a React component, call `useFindMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMoviesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useFindMoviesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FindMoviesQuery,
    FindMoviesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindMoviesQuery, FindMoviesQueryVariables>(
    FindMoviesDocument,
    options,
  );
}
export function useFindMoviesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindMoviesQuery,
    FindMoviesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindMoviesQuery, FindMoviesQueryVariables>(
    FindMoviesDocument,
    options,
  );
}
export type FindMoviesQueryHookResult = ReturnType<typeof useFindMoviesQuery>;
export type FindMoviesLazyQueryHookResult = ReturnType<
  typeof useFindMoviesLazyQuery
>;
export type FindMoviesQueryResult = Apollo.QueryResult<
  FindMoviesQuery,
  FindMoviesQueryVariables
>;
export const AddMovieToPreMadeListDocument = gql`
  mutation AddMovieToPreMadeList($listType: PreMadeListType!, $movieId: Int!) {
    userPreMadeListAddMovie(listType: $listType, movieId: $movieId) {
      movie {
        id
        originalTitle
        posterUrl
      }
    }
  }
`;
export type AddMovieToPreMadeListMutationFn = Apollo.MutationFunction<
  AddMovieToPreMadeListMutation,
  AddMovieToPreMadeListMutationVariables
>;

/**
 * __useAddMovieToPreMadeListMutation__
 *
 * To run a mutation, you first call `useAddMovieToPreMadeListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMovieToPreMadeListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMovieToPreMadeListMutation, { data, loading, error }] = useAddMovieToPreMadeListMutation({
 *   variables: {
 *      listType: // value for 'listType'
 *      movieId: // value for 'movieId'
 *   },
 * });
 */
export function useAddMovieToPreMadeListMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddMovieToPreMadeListMutation,
    AddMovieToPreMadeListMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddMovieToPreMadeListMutation,
    AddMovieToPreMadeListMutationVariables
  >(AddMovieToPreMadeListDocument, options);
}
export type AddMovieToPreMadeListMutationHookResult = ReturnType<
  typeof useAddMovieToPreMadeListMutation
>;
export type AddMovieToPreMadeListMutationResult =
  Apollo.MutationResult<AddMovieToPreMadeListMutation>;
export type AddMovieToPreMadeListMutationOptions = Apollo.BaseMutationOptions<
  AddMovieToPreMadeListMutation,
  AddMovieToPreMadeListMutationVariables
>;
export const RemoveMovieFromPreMadeListDocument = gql`
  mutation RemoveMovieFromPreMadeList(
    $listType: PreMadeListType!
    $movieId: Int!
  ) {
    userPreMadeListRemoveMovie(listType: $listType, movieId: $movieId)
  }
`;
export type RemoveMovieFromPreMadeListMutationFn = Apollo.MutationFunction<
  RemoveMovieFromPreMadeListMutation,
  RemoveMovieFromPreMadeListMutationVariables
>;

/**
 * __useRemoveMovieFromPreMadeListMutation__
 *
 * To run a mutation, you first call `useRemoveMovieFromPreMadeListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMovieFromPreMadeListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMovieFromPreMadeListMutation, { data, loading, error }] = useRemoveMovieFromPreMadeListMutation({
 *   variables: {
 *      listType: // value for 'listType'
 *      movieId: // value for 'movieId'
 *   },
 * });
 */
export function useRemoveMovieFromPreMadeListMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveMovieFromPreMadeListMutation,
    RemoveMovieFromPreMadeListMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RemoveMovieFromPreMadeListMutation,
    RemoveMovieFromPreMadeListMutationVariables
  >(RemoveMovieFromPreMadeListDocument, options);
}
export type RemoveMovieFromPreMadeListMutationHookResult = ReturnType<
  typeof useRemoveMovieFromPreMadeListMutation
>;
export type RemoveMovieFromPreMadeListMutationResult =
  Apollo.MutationResult<RemoveMovieFromPreMadeListMutation>;
export type RemoveMovieFromPreMadeListMutationOptions =
  Apollo.BaseMutationOptions<
    RemoveMovieFromPreMadeListMutation,
    RemoveMovieFromPreMadeListMutationVariables
  >;
export const FindUserProfileStatsDocument = gql`
  query FindUserProfileStats($userId: String!) {
    userProfileStats(userId: $userId) {
      followerCount
      followingCount
      listCount
      moviesWatchedCount
      moviesWatchedThisYearCount
    }
  }
`;

/**
 * __useFindUserProfileStatsQuery__
 *
 * To run a query within a React component, call `useFindUserProfileStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserProfileStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserProfileStatsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFindUserProfileStatsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindUserProfileStatsQuery,
    FindUserProfileStatsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindUserProfileStatsQuery,
    FindUserProfileStatsQueryVariables
  >(FindUserProfileStatsDocument, options);
}
export function useFindUserProfileStatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindUserProfileStatsQuery,
    FindUserProfileStatsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindUserProfileStatsQuery,
    FindUserProfileStatsQueryVariables
  >(FindUserProfileStatsDocument, options);
}
export type FindUserProfileStatsQueryHookResult = ReturnType<
  typeof useFindUserProfileStatsQuery
>;
export type FindUserProfileStatsLazyQueryHookResult = ReturnType<
  typeof useFindUserProfileStatsLazyQuery
>;
export type FindUserProfileStatsQueryResult = Apollo.QueryResult<
  FindUserProfileStatsQuery,
  FindUserProfileStatsQueryVariables
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
export const FindReviewDocument = gql`
  query FindReview($postId: Int!) {
    review(postId: $postId) {
      id
      isPinned
      user {
        username
        profilePictureUrl
      }
      post {
        id
        body
        createdAt
      }
      movie {
        id
        originalTitle
        runtime
        posterUrl
        backdropUrl
        releaseDate
        credits {
          crew {
            department
            originalName
          }
        }
      }
    }
  }
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
 *      postId: // value for 'postId'
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
export const FindUserRecentReviewsDocument = gql`
  query FindUserRecentReviews($userId: String!) {
    reviewsUserRecent(userId: $userId) {
      ...BasicReviewFields
    }
  }
  ${BasicReviewFieldsFragmentDoc}
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
export const FindUserPopularReviewsDocument = gql`
  query FindUserPopularReviews($userId: String!) {
    reviewsUserPopular(userId: $userId) {
      ...BasicReviewFields
    }
  }
  ${BasicReviewFieldsFragmentDoc}
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
export const FindUserPinnedReviewsDocument = gql`
  query FindUserPinnedReviews($userId: String!) {
    reviewsUserPinned(userId: $userId) {
      ...BasicReviewFields
      isPinned
    }
  }
  ${BasicReviewFieldsFragmentDoc}
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
export const FindUserReviewsDocument = gql`
  query FindUserReviews($userId: String!, $sort: ReviewSortInput) {
    reviewsUser(userId: $userId, sort: $sort) {
      ...BasicReviewFields
      isPinned
      movie {
        releaseDate
      }
    }
  }
  ${BasicReviewFieldsFragmentDoc}
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
 *      sort: // value for 'sort'
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
export const FindRecentReviewsDocument = gql`
  query FindRecentReviews {
    reviewsRecent {
      ...BasicReviewFields
    }
  }
  ${BasicReviewFieldsFragmentDoc}
`;

/**
 * __useFindRecentReviewsQuery__
 *
 * To run a query within a React component, call `useFindRecentReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindRecentReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindRecentReviewsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindRecentReviewsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FindRecentReviewsQuery,
    FindRecentReviewsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindRecentReviewsQuery,
    FindRecentReviewsQueryVariables
  >(FindRecentReviewsDocument, options);
}
export function useFindRecentReviewsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindRecentReviewsQuery,
    FindRecentReviewsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindRecentReviewsQuery,
    FindRecentReviewsQueryVariables
  >(FindRecentReviewsDocument, options);
}
export type FindRecentReviewsQueryHookResult = ReturnType<
  typeof useFindRecentReviewsQuery
>;
export type FindRecentReviewsLazyQueryHookResult = ReturnType<
  typeof useFindRecentReviewsLazyQuery
>;
export type FindRecentReviewsQueryResult = Apollo.QueryResult<
  FindRecentReviewsQuery,
  FindRecentReviewsQueryVariables
>;
export const FindPopularReviewsFromMovieDocument = gql`
  query FindPopularReviewsFromMovie($movieId: Int!) {
    reviewsPopularFromMovie(movieId: $movieId) {
      ...BasicReviewFields
    }
  }
  ${BasicReviewFieldsFragmentDoc}
`;

/**
 * __useFindPopularReviewsFromMovieQuery__
 *
 * To run a query within a React component, call `useFindPopularReviewsFromMovieQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPopularReviewsFromMovieQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPopularReviewsFromMovieQuery({
 *   variables: {
 *      movieId: // value for 'movieId'
 *   },
 * });
 */
export function useFindPopularReviewsFromMovieQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindPopularReviewsFromMovieQuery,
    FindPopularReviewsFromMovieQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindPopularReviewsFromMovieQuery,
    FindPopularReviewsFromMovieQueryVariables
  >(FindPopularReviewsFromMovieDocument, options);
}
export function useFindPopularReviewsFromMovieLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindPopularReviewsFromMovieQuery,
    FindPopularReviewsFromMovieQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindPopularReviewsFromMovieQuery,
    FindPopularReviewsFromMovieQueryVariables
  >(FindPopularReviewsFromMovieDocument, options);
}
export type FindPopularReviewsFromMovieQueryHookResult = ReturnType<
  typeof useFindPopularReviewsFromMovieQuery
>;
export type FindPopularReviewsFromMovieLazyQueryHookResult = ReturnType<
  typeof useFindPopularReviewsFromMovieLazyQuery
>;
export type FindPopularReviewsFromMovieQueryResult = Apollo.QueryResult<
  FindPopularReviewsFromMovieQuery,
  FindPopularReviewsFromMovieQueryVariables
>;
export const FindMovieRecentReviewsDocument = gql`
  query FindMovieRecentReviews($movieId: Int!) {
    reviewsRecentFromMovie(movieId: $movieId) {
      ...BasicReviewFields
    }
  }
  ${BasicReviewFieldsFragmentDoc}
`;

/**
 * __useFindMovieRecentReviewsQuery__
 *
 * To run a query within a React component, call `useFindMovieRecentReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMovieRecentReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMovieRecentReviewsQuery({
 *   variables: {
 *      movieId: // value for 'movieId'
 *   },
 * });
 */
export function useFindMovieRecentReviewsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindMovieRecentReviewsQuery,
    FindMovieRecentReviewsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindMovieRecentReviewsQuery,
    FindMovieRecentReviewsQueryVariables
  >(FindMovieRecentReviewsDocument, options);
}
export function useFindMovieRecentReviewsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindMovieRecentReviewsQuery,
    FindMovieRecentReviewsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindMovieRecentReviewsQuery,
    FindMovieRecentReviewsQueryVariables
  >(FindMovieRecentReviewsDocument, options);
}
export type FindMovieRecentReviewsQueryHookResult = ReturnType<
  typeof useFindMovieRecentReviewsQuery
>;
export type FindMovieRecentReviewsLazyQueryHookResult = ReturnType<
  typeof useFindMovieRecentReviewsLazyQuery
>;
export type FindMovieRecentReviewsQueryResult = Apollo.QueryResult<
  FindMovieRecentReviewsQuery,
  FindMovieRecentReviewsQueryVariables
>;
export const FindPopularReviewsWeekDocument = gql`
  query FindPopularReviewsWeek {
    reviewsPopularWeek {
      ...BasicReviewFields
    }
  }
  ${BasicReviewFieldsFragmentDoc}
`;

/**
 * __useFindPopularReviewsWeekQuery__
 *
 * To run a query within a React component, call `useFindPopularReviewsWeekQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPopularReviewsWeekQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPopularReviewsWeekQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindPopularReviewsWeekQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FindPopularReviewsWeekQuery,
    FindPopularReviewsWeekQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindPopularReviewsWeekQuery,
    FindPopularReviewsWeekQueryVariables
  >(FindPopularReviewsWeekDocument, options);
}
export function useFindPopularReviewsWeekLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindPopularReviewsWeekQuery,
    FindPopularReviewsWeekQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindPopularReviewsWeekQuery,
    FindPopularReviewsWeekQueryVariables
  >(FindPopularReviewsWeekDocument, options);
}
export type FindPopularReviewsWeekQueryHookResult = ReturnType<
  typeof useFindPopularReviewsWeekQuery
>;
export type FindPopularReviewsWeekLazyQueryHookResult = ReturnType<
  typeof useFindPopularReviewsWeekLazyQuery
>;
export type FindPopularReviewsWeekQueryResult = Apollo.QueryResult<
  FindPopularReviewsWeekQuery,
  FindPopularReviewsWeekQueryVariables
>;
export const CreateReviewDocument = gql`
  mutation CreateReview($body: String!, $movieId: Int!) {
    reviewCreate(body: $body, movieId: $movieId) {
      post {
        id
      }
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
export const PinReviewDocument = gql`
  mutation PinReview($postId: Int!) {
    reviewPin(postId: $postId) {
      ...BasicReviewFields
      isPinned
    }
  }
  ${BasicReviewFieldsFragmentDoc}
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
 *      postId: // value for 'postId'
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
export const UnpinReviewDocument = gql`
  mutation UnpinReview($postId: Int!) {
    reviewUnpin(postId: $postId) {
      ...BasicReviewFields
      isPinned
    }
  }
  ${BasicReviewFieldsFragmentDoc}
`;
export type UnpinReviewMutationFn = Apollo.MutationFunction<
  UnpinReviewMutation,
  UnpinReviewMutationVariables
>;

/**
 * __useUnpinReviewMutation__
 *
 * To run a mutation, you first call `useUnpinReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnpinReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unpinReviewMutation, { data, loading, error }] = useUnpinReviewMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useUnpinReviewMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UnpinReviewMutation,
    UnpinReviewMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UnpinReviewMutation, UnpinReviewMutationVariables>(
    UnpinReviewDocument,
    options,
  );
}
export type UnpinReviewMutationHookResult = ReturnType<
  typeof useUnpinReviewMutation
>;
export type UnpinReviewMutationResult =
  Apollo.MutationResult<UnpinReviewMutation>;
export type UnpinReviewMutationOptions = Apollo.BaseMutationOptions<
  UnpinReviewMutation,
  UnpinReviewMutationVariables
>;
export const FindStreamProvidersDocument = gql`
  query FindStreamProviders {
    streamProviders {
      id
      name
    }
  }
`;

/**
 * __useFindStreamProvidersQuery__
 *
 * To run a query within a React component, call `useFindStreamProvidersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindStreamProvidersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindStreamProvidersQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindStreamProvidersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FindStreamProvidersQuery,
    FindStreamProvidersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindStreamProvidersQuery,
    FindStreamProvidersQueryVariables
  >(FindStreamProvidersDocument, options);
}
export function useFindStreamProvidersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindStreamProvidersQuery,
    FindStreamProvidersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindStreamProvidersQuery,
    FindStreamProvidersQueryVariables
  >(FindStreamProvidersDocument, options);
}
export type FindStreamProvidersQueryHookResult = ReturnType<
  typeof useFindStreamProvidersQuery
>;
export type FindStreamProvidersLazyQueryHookResult = ReturnType<
  typeof useFindStreamProvidersLazyQuery
>;
export type FindStreamProvidersQueryResult = Apollo.QueryResult<
  FindStreamProvidersQuery,
  FindStreamProvidersQueryVariables
>;
export const FindUserDocument = gql`
  query FindUser($username: String!) {
    user(username: $username) {
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
 *      username: // value for 'username'
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
export const FindUserByProviderDocument = gql`
  query FindUserByProvider($providerId: String!, $provider: String!) {
    userByProvider(providerId: $providerId, provider: $provider) {
      id
      username
      realName
      profilePictureUrl
    }
  }
`;

/**
 * __useFindUserByProviderQuery__
 *
 * To run a query within a React component, call `useFindUserByProviderQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserByProviderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserByProviderQuery({
 *   variables: {
 *      providerId: // value for 'providerId'
 *      provider: // value for 'provider'
 *   },
 * });
 */
export function useFindUserByProviderQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindUserByProviderQuery,
    FindUserByProviderQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindUserByProviderQuery,
    FindUserByProviderQueryVariables
  >(FindUserByProviderDocument, options);
}
export function useFindUserByProviderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindUserByProviderQuery,
    FindUserByProviderQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindUserByProviderQuery,
    FindUserByProviderQueryVariables
  >(FindUserByProviderDocument, options);
}
export type FindUserByProviderQueryHookResult = ReturnType<
  typeof useFindUserByProviderQuery
>;
export type FindUserByProviderLazyQueryHookResult = ReturnType<
  typeof useFindUserByProviderLazyQuery
>;
export type FindUserByProviderQueryResult = Apollo.QueryResult<
  FindUserByProviderQuery,
  FindUserByProviderQueryVariables
>;
export const UserRegisterDocument = gql`
  mutation UserRegister($githubId: String!) {
    register(githubId: $githubId)
  }
`;
export type UserRegisterMutationFn = Apollo.MutationFunction<
  UserRegisterMutation,
  UserRegisterMutationVariables
>;

/**
 * __useUserRegisterMutation__
 *
 * To run a mutation, you first call `useUserRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userRegisterMutation, { data, loading, error }] = useUserRegisterMutation({
 *   variables: {
 *      githubId: // value for 'githubId'
 *   },
 * });
 */
export function useUserRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UserRegisterMutation,
    UserRegisterMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UserRegisterMutation,
    UserRegisterMutationVariables
  >(UserRegisterDocument, options);
}
export type UserRegisterMutationHookResult = ReturnType<
  typeof useUserRegisterMutation
>;
export type UserRegisterMutationResult =
  Apollo.MutationResult<UserRegisterMutation>;
export type UserRegisterMutationOptions = Apollo.BaseMutationOptions<
  UserRegisterMutation,
  UserRegisterMutationVariables
>;
