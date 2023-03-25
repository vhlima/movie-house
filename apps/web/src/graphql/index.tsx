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

export type Commentary = {
  __typename?: 'Commentary';
  content: Scalars['String'];
  createdAt: Scalars['Float'];
  id: Scalars['String'];
  postId: Scalars['String'];
  replyCount: Scalars['Int'];
  updatedAt: Scalars['Float'];
  user: User;
};

export type CommentaryEdge = {
  __typename?: 'CommentaryEdge';
  node: Commentary;
};

export type CommentaryPagination = {
  __typename?: 'CommentaryPagination';
  edges: Array<CommentaryEdge>;
  itemsPerPage: Scalars['Int'];
  pageInfo: PaginationInfo;
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type CommentarySortInput = {
  filter?: InputMaybe<Scalars['String']>;
  type: CommentarySortType;
};

/** Review sort type enum */
export enum CommentarySortType {
  Older = 'OLDER',
  Popular = 'POPULAR',
}

export type Company = {
  __typename?: 'Company';
  id: Scalars['String'];
  logoPath?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  originCountry: Scalars['String'];
};

export type Follow = {
  __typename?: 'Follow';
  createdAt: Scalars['Float'];
  followed: User;
  follower: User;
  id: Scalars['String'];
  updatedAt: Scalars['Float'];
};

export type FollowPagination = {
  __typename?: 'FollowPagination';
  edges: Array<FollowPaginationEdge>;
  itemsPerPage: Scalars['Int'];
  pageInfo: PaginationInfo;
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type FollowPaginationEdge = {
  __typename?: 'FollowPaginationEdge';
  node: Follow;
};

export type Language = {
  __typename?: 'Language';
  englishName: Scalars['String'];
  iso639: Scalars['String'];
  name: Scalars['String'];
};

/** Like type enum */
export enum LikeType {
  Commentary = 'COMMENTARY',
  Post = 'POST',
  Reply = 'REPLY',
}

export type List = {
  __typename?: 'List';
  backgroundImageUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['Float'];
  id: Scalars['String'];
  isPrivate?: Maybe<Scalars['Boolean']>;
  movieCount: Scalars['Int'];
  name: Scalars['String'];
  post: Post;
  postId: Scalars['String'];
  updatedAt: Scalars['Float'];
  user: User;
};

export type ListPagination = {
  __typename?: 'ListPagination';
  edges: Array<ListPreviewPaginationEdge>;
  itemsPerPage: Scalars['Int'];
  pageInfo: PaginationInfo;
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type ListPreview = {
  __typename?: 'ListPreview';
  backgroundImageUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['Float'];
  id: Scalars['String'];
  isPrivate?: Maybe<Scalars['Boolean']>;
  movieCount: Scalars['Int'];
  movies: Array<Movie>;
  name: Scalars['String'];
  post: Post;
  postId: Scalars['String'];
  updatedAt: Scalars['Float'];
  user: User;
};

export type ListPreviewPaginationEdge = {
  __typename?: 'ListPreviewPaginationEdge';
  node: ListPreview;
};

export type ListSimple = {
  __typename?: 'ListSimple';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type ListSortInput = {
  filter?: InputMaybe<Scalars['String']>;
  type: ListSortType;
};

/** List sort type enum */
export enum ListSortType {
  Name = 'NAME',
  Older = 'OLDER',
  Popularity = 'POPULARITY',
  Updated = 'UPDATED',
}

export type Movie = {
  __typename?: 'Movie';
  backdropUrl: Scalars['String'];
  genres: Array<MovieGenre>;
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

export type MovieCharacter = {
  __typename?: 'MovieCharacter';
  adult: Scalars['Boolean'];
  castId: Scalars['Int'];
  character: Scalars['String'];
  creditId: Scalars['String'];
  gender: Scalars['Float'];
  id: Scalars['Int'];
  knownForDepartment: Scalars['String'];
  name: Scalars['String'];
  order: Scalars['Int'];
  originalName: Scalars['String'];
  popularity: Scalars['Float'];
  profilePath?: Maybe<Scalars['String']>;
  profilePictureUrl: Scalars['String'];
};

export type MovieCredits = {
  __typename?: 'MovieCredits';
  cast: Array<MovieCharacter>;
  crew: Array<MovieCrewMember>;
};

export type MovieCrewMember = {
  __typename?: 'MovieCrewMember';
  adult: Scalars['Boolean'];
  creditId: Scalars['String'];
  department: Scalars['String'];
  gender: Scalars['Float'];
  id: Scalars['Int'];
  job: Scalars['Int'];
  knownForDepartment: Scalars['String'];
  name: Scalars['String'];
  originalName: Scalars['String'];
  popularity: Scalars['Float'];
  profilePath?: Maybe<Scalars['String']>;
  profilePictureUrl: Scalars['String'];
};

export type MovieGenre = {
  __typename?: 'MovieGenre';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type MoviePaginationEdge = {
  __typename?: 'MoviePaginationEdge';
  node: Movie;
};

export type MovieReferencePagination = {
  __typename?: 'MovieReferencePagination';
  edges: Array<MoviePaginationEdge>;
  itemsPerPage: Scalars['Int'];
  pageInfo: PaginationInfo;
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type MovieReferenceSortInput = {
  filter?: InputMaybe<Scalars['String']>;
  type: MovieReferenceSortType;
};

/** MovieReferenceSortType type enum */
export enum MovieReferenceSortType {
  Decade = 'DECADE',
  Genre = 'GENRE',
  ReleaseOlder = 'RELEASE_OLDER',
  ReleaseRecent = 'RELEASE_RECENT',
  Year = 'YEAR',
}

export type MovieWithCredits = {
  __typename?: 'MovieWithCredits';
  backdropUrl: Scalars['String'];
  credits: MovieCredits;
  genres: Array<MovieGenre>;
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

export type Mutation = {
  __typename?: 'Mutation';
  addMovieToList: Movie;
  addMovieToPreMadeList: Movie;
  createCommentary: Commentary;
  createList: ListSimple;
  createReply: Reply;
  createReview: Review;
  createUser: User;
  deleteCommentary: Scalars['Boolean'];
  deleteList: Scalars['Boolean'];
  deleteReply: Scalars['Boolean'];
  deleteReview: Scalars['Boolean'];
  follow: Scalars['Boolean'];
  likeOrDislike: Scalars['Boolean'];
  removeMovieFromList: Scalars['Boolean'];
  removeMovieFromPreMadeList: Scalars['Boolean'];
  signUp: Scalars['Boolean'];
  toggleReviewPin: Scalars['Boolean'];
  unfollow: Scalars['Boolean'];
};

export type MutationAddMovieToListArgs = {
  listId: Scalars['String'];
  movieId: Scalars['Int'];
};

export type MutationAddMovieToPreMadeListArgs = {
  listType: PreMadeListType;
  movieId: Scalars['Int'];
};

export type MutationCreateCommentaryArgs = {
  content: Scalars['String'];
  postId: Scalars['String'];
};

export type MutationCreateListArgs = {
  content?: InputMaybe<Scalars['String']>;
  listName: Scalars['String'];
};

export type MutationCreateReplyArgs = {
  commentaryId: Scalars['String'];
  content: Scalars['String'];
};

export type MutationCreateReviewArgs = {
  content: Scalars['String'];
  movieId: Scalars['Int'];
};

export type MutationCreateUserArgs = {
  githubId: Scalars['String'];
};

export type MutationDeleteCommentaryArgs = {
  commentaryId: Scalars['String'];
};

export type MutationDeleteListArgs = {
  listId: Scalars['String'];
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

export type MutationLikeOrDislikeArgs = {
  contentId: Scalars['String'];
  likeType: LikeType;
};

export type MutationRemoveMovieFromListArgs = {
  listId: Scalars['String'];
  movieId: Scalars['Int'];
};

export type MutationRemoveMovieFromPreMadeListArgs = {
  listType: PreMadeListType;
  movieId: Scalars['Int'];
};

export type MutationSignUpArgs = {
  githubId: Scalars['String'];
};

export type MutationToggleReviewPinArgs = {
  reviewId: Scalars['String'];
};

export type MutationUnfollowArgs = {
  userId: Scalars['String'];
};

export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  currentPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  commentaryCount: Scalars['Int'];
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['Float'];
  id: Scalars['String'];
  likeCount: Scalars['Int'];
  updatedAt: Scalars['Float'];
  user: User;
};

/** PreMadeList type enum */
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
  commentaries: CommentaryPagination;
  discoverMovies: TmDbMovieListPagination;
  followers: FollowPagination;
  followings: FollowPagination;
  isFollowing: Scalars['Boolean'];
  isMovieOnPreMadeList: Scalars['Boolean'];
  list: List;
  listMovies: MovieReferencePagination;
  lists: ListPagination;
  movie: Movie;
  movieGenres: Array<MovieGenre>;
  movieRecommendations: TmDbMovieListPagination;
  movieWithCredits: MovieWithCredits;
  preMadeListMovies: MovieReferencePagination;
  profileStats: ProfileStats;
  replies: ReplyPagination;
  review: Review;
  reviews: ReviewPagination;
  searchMovie: TmDbMovieListPagination;
  streamingProviders: Array<StreamingProvider>;
  trendingMovies: TmDbMovieListPagination;
  user: User;
  userByGithubId: User;
  userById: User;
  userListNames: Array<ListSimple>;
};

export type QueryCommentariesArgs = {
  page: Scalars['Int'];
  postId: Scalars['String'];
  sort?: InputMaybe<CommentarySortInput>;
};

export type QueryDiscoverMoviesArgs = {
  page: Scalars['Int'];
  sort?: InputMaybe<TmDbMovieSortInput>;
};

export type QueryFollowersArgs = {
  page: Scalars['Int'];
  userId: Scalars['String'];
};

export type QueryFollowingsArgs = {
  page: Scalars['Int'];
  userId: Scalars['String'];
};

export type QueryIsFollowingArgs = {
  userId: Scalars['String'];
};

export type QueryIsMovieOnPreMadeListArgs = {
  listType: PreMadeListType;
  movieId: Scalars['Int'];
};

export type QueryListArgs = {
  listId: Scalars['String'];
};

export type QueryListMoviesArgs = {
  listId: Scalars['String'];
  page: Scalars['Int'];
  sort?: InputMaybe<MovieReferenceSortInput>;
};

export type QueryListsArgs = {
  page: Scalars['Int'];
  sort?: InputMaybe<ListSortInput>;
  userId?: InputMaybe<Scalars['String']>;
};

export type QueryMovieArgs = {
  movieId: Scalars['Int'];
};

export type QueryMovieRecommendationsArgs = {
  movieId: Scalars['Int'];
  page: Scalars['Int'];
};

export type QueryMovieWithCreditsArgs = {
  movieId: Scalars['Int'];
};

export type QueryPreMadeListMoviesArgs = {
  listType: PreMadeListType;
  page: Scalars['Int'];
  sort?: InputMaybe<MovieReferenceSortInput>;
  userId: Scalars['String'];
};

export type QueryProfileStatsArgs = {
  userId: Scalars['String'];
};

export type QueryRepliesArgs = {
  commentaryId: Scalars['String'];
  page: Scalars['Int'];
  sort?: InputMaybe<ReplySortInput>;
};

export type QueryReviewArgs = {
  reviewId: Scalars['String'];
};

export type QueryReviewsArgs = {
  page?: Scalars['Int'];
  sort?: InputMaybe<ReviewSortInput>;
  userId?: InputMaybe<Scalars['String']>;
};

export type QuerySearchMovieArgs = {
  page: Scalars['Int'];
  searchTerm: Scalars['String'];
};

export type QueryTrendingMoviesArgs = {
  page: Scalars['Int'];
};

export type QueryUserArgs = {
  username: Scalars['String'];
};

export type QueryUserByGithubIdArgs = {
  githubId: Scalars['String'];
};

export type QueryUserByIdArgs = {
  userId: Scalars['String'];
};

export type QueryUserListNamesArgs = {
  userId: Scalars['String'];
};

export type Reply = {
  __typename?: 'Reply';
  commentaryId: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['Float'];
  id: Scalars['String'];
  updatedAt: Scalars['Float'];
  user: User;
};

export type ReplyEdge = {
  __typename?: 'ReplyEdge';
  node: Reply;
};

export type ReplyPagination = {
  __typename?: 'ReplyPagination';
  edges: Array<ReplyEdge>;
  itemsPerPage: Scalars['Int'];
  pageInfo: PaginationInfo;
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type ReplySortInput = {
  filter?: InputMaybe<Scalars['String']>;
  type: ReplySortType;
};

/** Reply sort type enum */
export enum ReplySortType {
  Older = 'OLDER',
  Popular = 'POPULAR',
}

export type Review = {
  __typename?: 'Review';
  id: Scalars['ID'];
  isPinned: Scalars['Boolean'];
  movie: Movie;
  post: Post;
  user: User;
};

export type ReviewEdge = {
  __typename?: 'ReviewEdge';
  node: Review;
};

export type ReviewPagination = {
  __typename?: 'ReviewPagination';
  edges: Array<ReviewEdge>;
  itemsPerPage: Scalars['Int'];
  pageInfo: PaginationInfo;
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type ReviewSortInput = {
  filter?: InputMaybe<Scalars['String']>;
  type: ReviewSortType;
};

/** Review sort type enum */
export enum ReviewSortType {
  Older = 'OLDER',
  Pinned = 'PINNED',
  Popular = 'POPULAR',
  PopularWeek = 'POPULAR_WEEK',
  Recent = 'RECENT',
  Year = 'YEAR',
}

export type StreamingProvider = {
  __typename?: 'StreamingProvider';
  displayPriority: Scalars['Int'];
  id: Scalars['Int'];
  logoPath: Scalars['String'];
  name: Scalars['String'];
};

export type TmdbMovieListEdge = {
  __typename?: 'TMDBMovieListEdge';
  node: Movie;
};

export type TmDbMovieListPagination = {
  __typename?: 'TmDBMovieListPagination';
  edges: Array<TmdbMovieListEdge>;
  itemsPerPage: Scalars['Int'];
  pageInfo: PaginationInfo;
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type TmDbMovieSortInput = {
  filter?: InputMaybe<Scalars['String']>;
  type: TmDbMovieSortType;
};

/** Tmdb sort type enum */
export enum TmDbMovieSortType {
  Decade = 'DECADE',
  Genre = 'GENRE',
  ReleaseOlder = 'RELEASE_OLDER',
  ReleaseRecent = 'RELEASE_RECENT',
  Service = 'SERVICE',
  Year = 'YEAR',
}

export type User = {
  __typename?: 'User';
  biography?: Maybe<Scalars['String']>;
  createdAt: Scalars['Float'];
  id: Scalars['String'];
  profilePictureUrl?: Maybe<Scalars['String']>;
  realName?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Float'];
  username: Scalars['String'];
};

export type FindCommentariesQueryVariables = Exact<{
  page: Scalars['Int'];
  postId: Scalars['String'];
}>;

export type FindCommentariesQuery = {
  __typename?: 'Query';
  commentaries: {
    __typename?: 'CommentaryPagination';
    totalCount: number;
    totalPages: number;
    pageInfo: {
      __typename?: 'PaginationInfo';
      currentPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: Array<{
      __typename?: 'CommentaryEdge';
      node: {
        __typename?: 'Commentary';
        id: string;
        content: string;
        replyCount: number;
        createdAt: number;
        updatedAt: number;
        user: {
          __typename?: 'User';
          username: string;
          profilePictureUrl?: string | null;
        };
      };
    }>;
  };
};

export type CreateCommentaryMutationVariables = Exact<{
  content: Scalars['String'];
  postId: Scalars['String'];
}>;

export type CreateCommentaryMutation = {
  __typename?: 'Mutation';
  createCommentary: {
    __typename?: 'Commentary';
    id: string;
    content: string;
    replyCount: number;
    createdAt: number;
    updatedAt: number;
    user: {
      __typename?: 'User';
      username: string;
      profilePictureUrl?: string | null;
    };
  };
};

export type DeleteCommentaryMutationVariables = Exact<{
  commentaryId: Scalars['String'];
}>;

export type DeleteCommentaryMutation = {
  __typename?: 'Mutation';
  deleteCommentary: boolean;
};

export type FollowMutationVariables = Exact<{
  userId: Scalars['String'];
}>;

export type FollowMutation = { __typename?: 'Mutation'; follow: boolean };

export type UnfollowMutationVariables = Exact<{
  userId: Scalars['String'];
}>;

export type UnfollowMutation = { __typename?: 'Mutation'; unfollow: boolean };

export type IsFollowingQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type IsFollowingQuery = { __typename?: 'Query'; isFollowing: boolean };

export type FindFollowingsQueryVariables = Exact<{
  page: Scalars['Int'];
  userId: Scalars['String'];
}>;

export type FindFollowingsQuery = {
  __typename?: 'Query';
  followings: {
    __typename?: 'FollowPagination';
    totalCount: number;
    totalPages: number;
    pageInfo: {
      __typename?: 'PaginationInfo';
      currentPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: Array<{
      __typename?: 'FollowPaginationEdge';
      node: {
        __typename?: 'Follow';
        followed: {
          __typename?: 'User';
          username: string;
          profilePictureUrl?: string | null;
        };
      };
    }>;
  };
};

export type FindFollowersQueryVariables = Exact<{
  page: Scalars['Int'];
  userId: Scalars['String'];
}>;

export type FindFollowersQuery = {
  __typename?: 'Query';
  followers: {
    __typename?: 'FollowPagination';
    totalCount: number;
    totalPages: number;
    pageInfo: {
      __typename?: 'PaginationInfo';
      currentPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: Array<{
      __typename?: 'FollowPaginationEdge';
      node: {
        __typename?: 'Follow';
        follower: {
          __typename?: 'User';
          username: string;
          profilePictureUrl?: string | null;
        };
      };
    }>;
  };
};

export type LikeOrDislikeMutationVariables = Exact<{
  likeType: LikeType;
  contentId: Scalars['String'];
}>;

export type LikeOrDislikeMutation = {
  __typename?: 'Mutation';
  likeOrDislike: boolean;
};

export type FindUserListsNamesQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type FindUserListsNamesQuery = {
  __typename?: 'Query';
  userListNames: Array<{ __typename?: 'ListSimple'; id: string; name: string }>;
};

export type FindListsQueryVariables = Exact<{
  page: Scalars['Int'];
  userId?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<ListSortInput>;
}>;

export type FindListsQuery = {
  __typename?: 'Query';
  lists: {
    __typename?: 'ListPagination';
    totalCount: number;
    totalPages: number;
    pageInfo: {
      __typename?: 'PaginationInfo';
      currentPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: Array<{
      __typename?: 'ListPreviewPaginationEdge';
      node: {
        __typename?: 'ListPreview';
        id: string;
        name: string;
        movieCount: number;
        isPrivate?: boolean | null;
        post: { __typename?: 'Post'; id: string; content?: string | null };
        user: {
          __typename?: 'User';
          username: string;
          profilePictureUrl?: string | null;
        };
        movies: Array<{
          __typename?: 'Movie';
          id: number;
          originalTitle: string;
          posterUrl: string;
        }>;
      };
    }>;
  };
};

export type FindListQueryVariables = Exact<{
  listId: Scalars['String'];
}>;

export type FindListQuery = {
  __typename?: 'Query';
  list: {
    __typename?: 'List';
    id: string;
    name: string;
    movieCount: number;
    backgroundImageUrl?: string | null;
    user: {
      __typename?: 'User';
      username: string;
      profilePictureUrl?: string | null;
    };
    post: {
      __typename?: 'Post';
      id: string;
      content?: string | null;
      createdAt: number;
    };
  };
};

export type FindListMoviesQueryVariables = Exact<{
  page: Scalars['Int'];
  listId: Scalars['String'];
  sort?: InputMaybe<MovieReferenceSortInput>;
}>;

export type FindListMoviesQuery = {
  __typename?: 'Query';
  listMovies: {
    __typename?: 'MovieReferencePagination';
    totalCount: number;
    totalPages: number;
    pageInfo: {
      __typename?: 'PaginationInfo';
      currentPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: Array<{
      __typename?: 'MoviePaginationEdge';
      node: {
        __typename?: 'Movie';
        id: number;
        originalTitle: string;
        posterUrl: string;
      };
    }>;
  };
};

export type CreateListMutationVariables = Exact<{
  listName: Scalars['String'];
  content?: InputMaybe<Scalars['String']>;
}>;

export type CreateListMutation = {
  __typename?: 'Mutation';
  createList: { __typename?: 'ListSimple'; id: string; name: string };
};

export type DeleteListMutationVariables = Exact<{
  listId: Scalars['String'];
}>;

export type DeleteListMutation = {
  __typename?: 'Mutation';
  deleteList: boolean;
};

export type AddMovieToListMutationVariables = Exact<{
  movieId: Scalars['Int'];
  listId: Scalars['String'];
}>;

export type AddMovieToListMutation = {
  __typename?: 'Mutation';
  addMovieToList: { __typename?: 'Movie'; originalTitle: string };
};

export type RemoveMovieFromListMutationVariables = Exact<{
  movieId: Scalars['Int'];
  listId: Scalars['String'];
}>;

export type RemoveMovieFromListMutation = {
  __typename?: 'Mutation';
  removeMovieFromList: boolean;
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
    genres: Array<{ __typename?: 'MovieGenre'; id: number; name: string }>;
    productionCompanies: Array<{
      __typename?: 'Company';
      id: string;
      name: string;
      logoPath?: string | null;
    }>;
    spokenLanguages: Array<{ __typename?: 'Language'; englishName: string }>;
  };
};

export type FindMovieWithCreditsQueryVariables = Exact<{
  movieId: Scalars['Int'];
}>;

export type FindMovieWithCreditsQuery = {
  __typename?: 'Query';
  movieWithCredits: {
    __typename?: 'MovieWithCredits';
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
    genres: Array<{ __typename?: 'MovieGenre'; id: number; name: string }>;
    productionCompanies: Array<{
      __typename?: 'Company';
      id: string;
      name: string;
      logoPath?: string | null;
    }>;
    spokenLanguages: Array<{ __typename?: 'Language'; englishName: string }>;
    credits: {
      __typename?: 'MovieCredits';
      cast: Array<{
        __typename?: 'MovieCharacter';
        id: number;
        character: string;
        originalName: string;
        profilePictureUrl: string;
      }>;
      crew: Array<{
        __typename?: 'MovieCrewMember';
        id: number;
        popularity: number;
        department: string;
        originalName: string;
      }>;
    };
  };
};

export type SearchMovieQueryVariables = Exact<{
  page: Scalars['Int'];
  searchTerm: Scalars['String'];
}>;

export type SearchMovieQuery = {
  __typename?: 'Query';
  searchMovie: {
    __typename?: 'TmDBMovieListPagination';
    totalCount: number;
    totalPages: number;
    pageInfo: {
      __typename?: 'PaginationInfo';
      currentPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: Array<{
      __typename?: 'TMDBMovieListEdge';
      node: {
        __typename?: 'Movie';
        id: number;
        originalTitle: string;
        releaseDate?: any | null;
        posterUrl: string;
      };
    }>;
  };
};

export type FindTrendingMoviesQueryVariables = Exact<{
  page: Scalars['Int'];
}>;

export type FindTrendingMoviesQuery = {
  __typename?: 'Query';
  trendingMovies: {
    __typename?: 'TmDBMovieListPagination';
    totalPages: number;
    pageInfo: {
      __typename?: 'PaginationInfo';
      currentPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: Array<{
      __typename?: 'TMDBMovieListEdge';
      node: {
        __typename?: 'Movie';
        id: number;
        originalTitle: string;
        posterUrl: string;
      };
    }>;
  };
};

export type FindMovieRecommendationsQueryVariables = Exact<{
  page: Scalars['Int'];
  movieId: Scalars['Int'];
}>;

export type FindMovieRecommendationsQuery = {
  __typename?: 'Query';
  movieRecommendations: {
    __typename?: 'TmDBMovieListPagination';
    edges: Array<{
      __typename?: 'TMDBMovieListEdge';
      node: {
        __typename?: 'Movie';
        id: number;
        originalTitle: string;
        posterUrl: string;
      };
    }>;
  };
};

export type DiscoverMoviesQueryVariables = Exact<{
  page: Scalars['Int'];
  sort?: InputMaybe<TmDbMovieSortInput>;
}>;

export type DiscoverMoviesQuery = {
  __typename?: 'Query';
  discoverMovies: {
    __typename?: 'TmDBMovieListPagination';
    totalCount: number;
    totalPages: number;
    pageInfo: {
      __typename?: 'PaginationInfo';
      currentPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: Array<{
      __typename?: 'TMDBMovieListEdge';
      node: {
        __typename?: 'Movie';
        id: number;
        originalTitle: string;
        posterUrl: string;
      };
    }>;
  };
};

export type FindPreMadeListMoviesQueryVariables = Exact<{
  page: Scalars['Int'];
  listType: PreMadeListType;
  userId: Scalars['String'];
  sort?: InputMaybe<MovieReferenceSortInput>;
}>;

export type FindPreMadeListMoviesQuery = {
  __typename?: 'Query';
  preMadeListMovies: {
    __typename?: 'MovieReferencePagination';
    totalCount: number;
    totalPages: number;
    itemsPerPage: number;
    pageInfo: {
      __typename?: 'PaginationInfo';
      currentPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: Array<{
      __typename?: 'MoviePaginationEdge';
      node: {
        __typename?: 'Movie';
        id: number;
        originalTitle: string;
        posterUrl: string;
      };
    }>;
  };
};

export type AddMovieToPreMadeListMutationVariables = Exact<{
  movieId: Scalars['Int'];
  listType: PreMadeListType;
}>;

export type AddMovieToPreMadeListMutation = {
  __typename?: 'Mutation';
  addMovieToPreMadeList: {
    __typename?: 'Movie';
    id: number;
    originalTitle: string;
    posterUrl: string;
  };
};

export type RemoveMovieFromPreMadeListMutationVariables = Exact<{
  movieId: Scalars['Int'];
  listType: PreMadeListType;
}>;

export type RemoveMovieFromPreMadeListMutation = {
  __typename?: 'Mutation';
  removeMovieFromPreMadeList: boolean;
};

export type IsMovieOnPreMadeListQueryVariables = Exact<{
  movieId: Scalars['Int'];
  listType: PreMadeListType;
}>;

export type IsMovieOnPreMadeListQuery = {
  __typename?: 'Query';
  isMovieOnPreMadeList: boolean;
};

export type FindRepliesQueryVariables = Exact<{
  page: Scalars['Int'];
  commentaryId: Scalars['String'];
}>;

export type FindRepliesQuery = {
  __typename?: 'Query';
  replies: {
    __typename?: 'ReplyPagination';
    totalCount: number;
    totalPages: number;
    pageInfo: {
      __typename?: 'PaginationInfo';
      currentPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: Array<{
      __typename?: 'ReplyEdge';
      node: {
        __typename?: 'Reply';
        id: string;
        commentaryId: string;
        content: string;
        createdAt: number;
        user: {
          __typename?: 'User';
          username: string;
          profilePictureUrl?: string | null;
        };
      };
    }>;
  };
};

export type CreateReplyMutationVariables = Exact<{
  content: Scalars['String'];
  commentaryId: Scalars['String'];
}>;

export type CreateReplyMutation = {
  __typename?: 'Mutation';
  createReply: {
    __typename?: 'Reply';
    id: string;
    commentaryId: string;
    content: string;
    createdAt: number;
    user: {
      __typename?: 'User';
      username: string;
      profilePictureUrl?: string | null;
    };
  };
};

export type DeleteReplyMutationVariables = Exact<{
  replyId: Scalars['String'];
}>;

export type DeleteReplyMutation = {
  __typename?: 'Mutation';
  deleteReply: boolean;
};

export type FindReviewQueryVariables = Exact<{
  reviewId: Scalars['String'];
}>;

export type FindReviewQuery = {
  __typename?: 'Query';
  review: {
    __typename?: 'Review';
    id: string;
    user: {
      __typename?: 'User';
      username: string;
      profilePictureUrl?: string | null;
    };
    post: {
      __typename?: 'Post';
      id: string;
      content?: string | null;
      createdAt: number;
    };
    movie: {
      __typename?: 'Movie';
      id: number;
      originalTitle: string;
      posterUrl: string;
      backdropUrl: string;
      releaseDate?: any | null;
    };
  };
};

export type FindReviewsQueryVariables = Exact<{
  sort?: InputMaybe<ReviewSortInput>;
  userId?: InputMaybe<Scalars['String']>;
  page: Scalars['Int'];
}>;

export type FindReviewsQuery = {
  __typename?: 'Query';
  reviews: {
    __typename?: 'ReviewPagination';
    totalCount: number;
    totalPages: number;
    itemsPerPage: number;
    pageInfo: {
      __typename?: 'PaginationInfo';
      currentPage: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    };
    edges: Array<{
      __typename?: 'ReviewEdge';
      node: {
        __typename?: 'Review';
        id: string;
        user: {
          __typename?: 'User';
          username: string;
          profilePictureUrl?: string | null;
        };
        post: {
          __typename?: 'Post';
          id: string;
          content?: string | null;
          createdAt: number;
        };
        movie: {
          __typename?: 'Movie';
          id: number;
          originalTitle: string;
          posterUrl: string;
          releaseDate?: any | null;
        };
      };
    }>;
  };
};

export type CreateReviewMutationVariables = Exact<{
  content: Scalars['String'];
  movieId: Scalars['Int'];
}>;

export type CreateReviewMutation = {
  __typename?: 'Mutation';
  createReview: { __typename?: 'Review'; id: string };
};

export type DeleteReviewMutationVariables = Exact<{
  reviewId: Scalars['String'];
}>;

export type DeleteReviewMutation = {
  __typename?: 'Mutation';
  deleteReview: boolean;
};

export type ToggleReviewPinMutationVariables = Exact<{
  reviewId: Scalars['String'];
}>;

export type ToggleReviewPinMutation = {
  __typename?: 'Mutation';
  toggleReviewPin: boolean;
};

export type FindStreamingProvidersQueryVariables = Exact<{
  [key: string]: never;
}>;

export type FindStreamingProvidersQuery = {
  __typename?: 'Query';
  streamingProviders: Array<{
    __typename?: 'StreamingProvider';
    id: number;
    name: string;
  }>;
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
    createdAt: number;
  };
};

export type FindUserByIdQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type FindUserByIdQuery = {
  __typename?: 'Query';
  userById: {
    __typename?: 'User';
    id: string;
    username: string;
    realName?: string | null;
    profilePictureUrl?: string | null;
    createdAt: number;
  };
};

export type FindUserByGithubIdQueryVariables = Exact<{
  githubId: Scalars['String'];
}>;

export type FindUserByGithubIdQuery = {
  __typename?: 'Query';
  userByGithubId: {
    __typename?: 'User';
    id: string;
    username: string;
    realName?: string | null;
    profilePictureUrl?: string | null;
    createdAt: number;
  };
};

export type SignUpMutationVariables = Exact<{
  githubId: Scalars['String'];
}>;

export type SignUpMutation = { __typename?: 'Mutation'; signUp: boolean };

export type FindProfileStatsQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type FindProfileStatsQuery = {
  __typename?: 'Query';
  profileStats: {
    __typename?: 'ProfileStats';
    followerCount: number;
    followingCount: number;
    listCount: number;
    moviesWatchedCount: number;
    moviesWatchedThisYearCount: number;
  };
};

export const FindCommentariesDocument = gql`
  query FindCommentaries($page: Int!, $postId: String!) {
    commentaries(page: $page, postId: $postId) {
      totalCount
      totalPages
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          content
          replyCount
          createdAt
          updatedAt
          user {
            username
            profilePictureUrl
          }
        }
      }
    }
  }
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
 *      page: // value for 'page'
 *      postId: // value for 'postId'
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
export const CreateCommentaryDocument = gql`
  mutation CreateCommentary($content: String!, $postId: String!) {
    createCommentary(content: $content, postId: $postId) {
      id
      content
      replyCount
      createdAt
      updatedAt
      user {
        username
        profilePictureUrl
      }
    }
  }
`;
export type CreateCommentaryMutationFn = Apollo.MutationFunction<
  CreateCommentaryMutation,
  CreateCommentaryMutationVariables
>;

/**
 * __useCreateCommentaryMutation__
 *
 * To run a mutation, you first call `useCreateCommentaryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentaryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentaryMutation, { data, loading, error }] = useCreateCommentaryMutation({
 *   variables: {
 *      content: // value for 'content'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCreateCommentaryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCommentaryMutation,
    CreateCommentaryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCommentaryMutation,
    CreateCommentaryMutationVariables
  >(CreateCommentaryDocument, options);
}
export type CreateCommentaryMutationHookResult = ReturnType<
  typeof useCreateCommentaryMutation
>;
export type CreateCommentaryMutationResult =
  Apollo.MutationResult<CreateCommentaryMutation>;
export type CreateCommentaryMutationOptions = Apollo.BaseMutationOptions<
  CreateCommentaryMutation,
  CreateCommentaryMutationVariables
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
export const UnfollowDocument = gql`
  mutation Unfollow($userId: String!) {
    unfollow(userId: $userId)
  }
`;
export type UnfollowMutationFn = Apollo.MutationFunction<
  UnfollowMutation,
  UnfollowMutationVariables
>;

/**
 * __useUnfollowMutation__
 *
 * To run a mutation, you first call `useUnfollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowMutation, { data, loading, error }] = useUnfollowMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUnfollowMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UnfollowMutation,
    UnfollowMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UnfollowMutation, UnfollowMutationVariables>(
    UnfollowDocument,
    options,
  );
}
export type UnfollowMutationHookResult = ReturnType<typeof useUnfollowMutation>;
export type UnfollowMutationResult = Apollo.MutationResult<UnfollowMutation>;
export type UnfollowMutationOptions = Apollo.BaseMutationOptions<
  UnfollowMutation,
  UnfollowMutationVariables
>;
export const IsFollowingDocument = gql`
  query IsFollowing($userId: String!) {
    isFollowing(userId: $userId)
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
export const FindFollowingsDocument = gql`
  query FindFollowings($page: Int!, $userId: String!) {
    followings(page: $page, userId: $userId) {
      totalCount
      totalPages
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          followed {
            username
            profilePictureUrl
          }
        }
      }
    }
  }
`;

/**
 * __useFindFollowingsQuery__
 *
 * To run a query within a React component, call `useFindFollowingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindFollowingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindFollowingsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFindFollowingsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindFollowingsQuery,
    FindFollowingsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindFollowingsQuery, FindFollowingsQueryVariables>(
    FindFollowingsDocument,
    options,
  );
}
export function useFindFollowingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindFollowingsQuery,
    FindFollowingsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindFollowingsQuery, FindFollowingsQueryVariables>(
    FindFollowingsDocument,
    options,
  );
}
export type FindFollowingsQueryHookResult = ReturnType<
  typeof useFindFollowingsQuery
>;
export type FindFollowingsLazyQueryHookResult = ReturnType<
  typeof useFindFollowingsLazyQuery
>;
export type FindFollowingsQueryResult = Apollo.QueryResult<
  FindFollowingsQuery,
  FindFollowingsQueryVariables
>;
export const FindFollowersDocument = gql`
  query FindFollowers($page: Int!, $userId: String!) {
    followers(page: $page, userId: $userId) {
      totalCount
      totalPages
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          follower {
            username
            profilePictureUrl
          }
        }
      }
    }
  }
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
 *      page: // value for 'page'
 *      userId: // value for 'userId'
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
export const LikeOrDislikeDocument = gql`
  mutation LikeOrDislike($likeType: LikeType!, $contentId: String!) {
    likeOrDislike(likeType: $likeType, contentId: $contentId)
  }
`;
export type LikeOrDislikeMutationFn = Apollo.MutationFunction<
  LikeOrDislikeMutation,
  LikeOrDislikeMutationVariables
>;

/**
 * __useLikeOrDislikeMutation__
 *
 * To run a mutation, you first call `useLikeOrDislikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeOrDislikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeOrDislikeMutation, { data, loading, error }] = useLikeOrDislikeMutation({
 *   variables: {
 *      likeType: // value for 'likeType'
 *      contentId: // value for 'contentId'
 *   },
 * });
 */
export function useLikeOrDislikeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LikeOrDislikeMutation,
    LikeOrDislikeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    LikeOrDislikeMutation,
    LikeOrDislikeMutationVariables
  >(LikeOrDislikeDocument, options);
}
export type LikeOrDislikeMutationHookResult = ReturnType<
  typeof useLikeOrDislikeMutation
>;
export type LikeOrDislikeMutationResult =
  Apollo.MutationResult<LikeOrDislikeMutation>;
export type LikeOrDislikeMutationOptions = Apollo.BaseMutationOptions<
  LikeOrDislikeMutation,
  LikeOrDislikeMutationVariables
>;
export const FindUserListsNamesDocument = gql`
  query FindUserListsNames($userId: String!) {
    userListNames(userId: $userId) {
      id
      name
    }
  }
`;

/**
 * __useFindUserListsNamesQuery__
 *
 * To run a query within a React component, call `useFindUserListsNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserListsNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserListsNamesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFindUserListsNamesQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindUserListsNamesQuery,
    FindUserListsNamesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindUserListsNamesQuery,
    FindUserListsNamesQueryVariables
  >(FindUserListsNamesDocument, options);
}
export function useFindUserListsNamesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindUserListsNamesQuery,
    FindUserListsNamesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindUserListsNamesQuery,
    FindUserListsNamesQueryVariables
  >(FindUserListsNamesDocument, options);
}
export type FindUserListsNamesQueryHookResult = ReturnType<
  typeof useFindUserListsNamesQuery
>;
export type FindUserListsNamesLazyQueryHookResult = ReturnType<
  typeof useFindUserListsNamesLazyQuery
>;
export type FindUserListsNamesQueryResult = Apollo.QueryResult<
  FindUserListsNamesQuery,
  FindUserListsNamesQueryVariables
>;
export const FindListsDocument = gql`
  query FindLists($page: Int!, $userId: String, $sort: ListSortInput) {
    lists(page: $page, userId: $userId, sort: $sort) {
      totalCount
      totalPages
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          name
          movieCount
          isPrivate
          post {
            id
            content
          }
          user {
            username
            profilePictureUrl
          }
          movies {
            id
            originalTitle
            posterUrl
          }
        }
      }
    }
  }
`;

/**
 * __useFindListsQuery__
 *
 * To run a query within a React component, call `useFindListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindListsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      userId: // value for 'userId'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useFindListsQuery(
  baseOptions: Apollo.QueryHookOptions<FindListsQuery, FindListsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindListsQuery, FindListsQueryVariables>(
    FindListsDocument,
    options,
  );
}
export function useFindListsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindListsQuery,
    FindListsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindListsQuery, FindListsQueryVariables>(
    FindListsDocument,
    options,
  );
}
export type FindListsQueryHookResult = ReturnType<typeof useFindListsQuery>;
export type FindListsLazyQueryHookResult = ReturnType<
  typeof useFindListsLazyQuery
>;
export type FindListsQueryResult = Apollo.QueryResult<
  FindListsQuery,
  FindListsQueryVariables
>;
export const FindListDocument = gql`
  query FindList($listId: String!) {
    list(listId: $listId) {
      id
      name
      movieCount
      backgroundImageUrl
      user {
        username
        profilePictureUrl
      }
      post {
        id
        content
        createdAt
      }
    }
  }
`;

/**
 * __useFindListQuery__
 *
 * To run a query within a React component, call `useFindListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindListQuery({
 *   variables: {
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useFindListQuery(
  baseOptions: Apollo.QueryHookOptions<FindListQuery, FindListQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindListQuery, FindListQueryVariables>(
    FindListDocument,
    options,
  );
}
export function useFindListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindListQuery,
    FindListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindListQuery, FindListQueryVariables>(
    FindListDocument,
    options,
  );
}
export type FindListQueryHookResult = ReturnType<typeof useFindListQuery>;
export type FindListLazyQueryHookResult = ReturnType<
  typeof useFindListLazyQuery
>;
export type FindListQueryResult = Apollo.QueryResult<
  FindListQuery,
  FindListQueryVariables
>;
export const FindListMoviesDocument = gql`
  query FindListMovies(
    $page: Int!
    $listId: String!
    $sort: MovieReferenceSortInput
  ) {
    listMovies(page: $page, listId: $listId, sort: $sort) {
      totalCount
      totalPages
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          originalTitle
          posterUrl
        }
      }
    }
  }
`;

/**
 * __useFindListMoviesQuery__
 *
 * To run a query within a React component, call `useFindListMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindListMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindListMoviesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      listId: // value for 'listId'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useFindListMoviesQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindListMoviesQuery,
    FindListMoviesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindListMoviesQuery, FindListMoviesQueryVariables>(
    FindListMoviesDocument,
    options,
  );
}
export function useFindListMoviesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindListMoviesQuery,
    FindListMoviesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindListMoviesQuery, FindListMoviesQueryVariables>(
    FindListMoviesDocument,
    options,
  );
}
export type FindListMoviesQueryHookResult = ReturnType<
  typeof useFindListMoviesQuery
>;
export type FindListMoviesLazyQueryHookResult = ReturnType<
  typeof useFindListMoviesLazyQuery
>;
export type FindListMoviesQueryResult = Apollo.QueryResult<
  FindListMoviesQuery,
  FindListMoviesQueryVariables
>;
export const CreateListDocument = gql`
  mutation CreateList($listName: String!, $content: String) {
    createList(listName: $listName, content: $content) {
      id
      name
    }
  }
`;
export type CreateListMutationFn = Apollo.MutationFunction<
  CreateListMutation,
  CreateListMutationVariables
>;

/**
 * __useCreateListMutation__
 *
 * To run a mutation, you first call `useCreateListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createListMutation, { data, loading, error }] = useCreateListMutation({
 *   variables: {
 *      listName: // value for 'listName'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateListMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateListMutation,
    CreateListMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateListMutation, CreateListMutationVariables>(
    CreateListDocument,
    options,
  );
}
export type CreateListMutationHookResult = ReturnType<
  typeof useCreateListMutation
>;
export type CreateListMutationResult =
  Apollo.MutationResult<CreateListMutation>;
export type CreateListMutationOptions = Apollo.BaseMutationOptions<
  CreateListMutation,
  CreateListMutationVariables
>;
export const DeleteListDocument = gql`
  mutation DeleteList($listId: String!) {
    deleteList(listId: $listId)
  }
`;
export type DeleteListMutationFn = Apollo.MutationFunction<
  DeleteListMutation,
  DeleteListMutationVariables
>;

/**
 * __useDeleteListMutation__
 *
 * To run a mutation, you first call `useDeleteListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteListMutation, { data, loading, error }] = useDeleteListMutation({
 *   variables: {
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useDeleteListMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteListMutation,
    DeleteListMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteListMutation, DeleteListMutationVariables>(
    DeleteListDocument,
    options,
  );
}
export type DeleteListMutationHookResult = ReturnType<
  typeof useDeleteListMutation
>;
export type DeleteListMutationResult =
  Apollo.MutationResult<DeleteListMutation>;
export type DeleteListMutationOptions = Apollo.BaseMutationOptions<
  DeleteListMutation,
  DeleteListMutationVariables
>;
export const AddMovieToListDocument = gql`
  mutation AddMovieToList($movieId: Int!, $listId: String!) {
    addMovieToList(movieId: $movieId, listId: $listId) {
      originalTitle
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
    removeMovieFromList(movieId: $movieId, listId: $listId)
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
      }
    }
  }
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
export const FindMovieWithCreditsDocument = gql`
  query FindMovieWithCredits($movieId: Int!) {
    movieWithCredits(movieId: $movieId) {
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
      }
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
`;

/**
 * __useFindMovieWithCreditsQuery__
 *
 * To run a query within a React component, call `useFindMovieWithCreditsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMovieWithCreditsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMovieWithCreditsQuery({
 *   variables: {
 *      movieId: // value for 'movieId'
 *   },
 * });
 */
export function useFindMovieWithCreditsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindMovieWithCreditsQuery,
    FindMovieWithCreditsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindMovieWithCreditsQuery,
    FindMovieWithCreditsQueryVariables
  >(FindMovieWithCreditsDocument, options);
}
export function useFindMovieWithCreditsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindMovieWithCreditsQuery,
    FindMovieWithCreditsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindMovieWithCreditsQuery,
    FindMovieWithCreditsQueryVariables
  >(FindMovieWithCreditsDocument, options);
}
export type FindMovieWithCreditsQueryHookResult = ReturnType<
  typeof useFindMovieWithCreditsQuery
>;
export type FindMovieWithCreditsLazyQueryHookResult = ReturnType<
  typeof useFindMovieWithCreditsLazyQuery
>;
export type FindMovieWithCreditsQueryResult = Apollo.QueryResult<
  FindMovieWithCreditsQuery,
  FindMovieWithCreditsQueryVariables
>;
export const SearchMovieDocument = gql`
  query SearchMovie($page: Int!, $searchTerm: String!) {
    searchMovie(page: $page, searchTerm: $searchTerm) {
      totalCount
      totalPages
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          originalTitle
          releaseDate
          posterUrl
        }
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
 *      page: // value for 'page'
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
export const FindTrendingMoviesDocument = gql`
  query FindTrendingMovies($page: Int!) {
    trendingMovies(page: $page) {
      totalPages
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          originalTitle
          posterUrl
        }
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
  query FindMovieRecommendations($page: Int!, $movieId: Int!) {
    movieRecommendations(page: $page, movieId: $movieId) {
      edges {
        node {
          id
          originalTitle
          posterUrl
        }
      }
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
 *      page: // value for 'page'
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
export const DiscoverMoviesDocument = gql`
  query DiscoverMovies($page: Int!, $sort: TmDBMovieSortInput) {
    discoverMovies(page: $page, sort: $sort) {
      totalCount
      totalPages
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          originalTitle
          posterUrl
        }
      }
    }
  }
`;

/**
 * __useDiscoverMoviesQuery__
 *
 * To run a query within a React component, call `useDiscoverMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDiscoverMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDiscoverMoviesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useDiscoverMoviesQuery(
  baseOptions: Apollo.QueryHookOptions<
    DiscoverMoviesQuery,
    DiscoverMoviesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DiscoverMoviesQuery, DiscoverMoviesQueryVariables>(
    DiscoverMoviesDocument,
    options,
  );
}
export function useDiscoverMoviesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    DiscoverMoviesQuery,
    DiscoverMoviesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DiscoverMoviesQuery, DiscoverMoviesQueryVariables>(
    DiscoverMoviesDocument,
    options,
  );
}
export type DiscoverMoviesQueryHookResult = ReturnType<
  typeof useDiscoverMoviesQuery
>;
export type DiscoverMoviesLazyQueryHookResult = ReturnType<
  typeof useDiscoverMoviesLazyQuery
>;
export type DiscoverMoviesQueryResult = Apollo.QueryResult<
  DiscoverMoviesQuery,
  DiscoverMoviesQueryVariables
>;
export const FindPreMadeListMoviesDocument = gql`
  query FindPreMadeListMovies(
    $page: Int!
    $listType: PreMadeListType!
    $userId: String!
    $sort: MovieReferenceSortInput
  ) {
    preMadeListMovies(
      page: $page
      listType: $listType
      userId: $userId
      sort: $sort
    ) {
      totalCount
      totalPages
      itemsPerPage
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          originalTitle
          posterUrl
        }
      }
    }
  }
`;

/**
 * __useFindPreMadeListMoviesQuery__
 *
 * To run a query within a React component, call `useFindPreMadeListMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPreMadeListMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPreMadeListMoviesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      listType: // value for 'listType'
 *      userId: // value for 'userId'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useFindPreMadeListMoviesQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindPreMadeListMoviesQuery,
    FindPreMadeListMoviesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindPreMadeListMoviesQuery,
    FindPreMadeListMoviesQueryVariables
  >(FindPreMadeListMoviesDocument, options);
}
export function useFindPreMadeListMoviesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindPreMadeListMoviesQuery,
    FindPreMadeListMoviesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindPreMadeListMoviesQuery,
    FindPreMadeListMoviesQueryVariables
  >(FindPreMadeListMoviesDocument, options);
}
export type FindPreMadeListMoviesQueryHookResult = ReturnType<
  typeof useFindPreMadeListMoviesQuery
>;
export type FindPreMadeListMoviesLazyQueryHookResult = ReturnType<
  typeof useFindPreMadeListMoviesLazyQuery
>;
export type FindPreMadeListMoviesQueryResult = Apollo.QueryResult<
  FindPreMadeListMoviesQuery,
  FindPreMadeListMoviesQueryVariables
>;
export const AddMovieToPreMadeListDocument = gql`
  mutation AddMovieToPreMadeList($movieId: Int!, $listType: PreMadeListType!) {
    addMovieToPreMadeList(movieId: $movieId, listType: $listType) {
      id
      originalTitle
      posterUrl
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
 *      movieId: // value for 'movieId'
 *      listType: // value for 'listType'
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
    $movieId: Int!
    $listType: PreMadeListType!
  ) {
    removeMovieFromPreMadeList(movieId: $movieId, listType: $listType)
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
 *      movieId: // value for 'movieId'
 *      listType: // value for 'listType'
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
export const IsMovieOnPreMadeListDocument = gql`
  query IsMovieOnPreMadeList($movieId: Int!, $listType: PreMadeListType!) {
    isMovieOnPreMadeList(movieId: $movieId, listType: $listType)
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
 *      movieId: // value for 'movieId'
 *      listType: // value for 'listType'
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
export const FindRepliesDocument = gql`
  query FindReplies($page: Int!, $commentaryId: String!) {
    replies(page: $page, commentaryId: $commentaryId) {
      totalCount
      totalPages
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          commentaryId
          content
          createdAt
          user {
            username
            profilePictureUrl
          }
        }
      }
    }
  }
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
 *      page: // value for 'page'
 *      commentaryId: // value for 'commentaryId'
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
export const CreateReplyDocument = gql`
  mutation CreateReply($content: String!, $commentaryId: String!) {
    createReply(content: $content, commentaryId: $commentaryId) {
      id
      commentaryId
      content
      createdAt
      user {
        username
        profilePictureUrl
      }
    }
  }
`;
export type CreateReplyMutationFn = Apollo.MutationFunction<
  CreateReplyMutation,
  CreateReplyMutationVariables
>;

/**
 * __useCreateReplyMutation__
 *
 * To run a mutation, you first call `useCreateReplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReplyMutation, { data, loading, error }] = useCreateReplyMutation({
 *   variables: {
 *      content: // value for 'content'
 *      commentaryId: // value for 'commentaryId'
 *   },
 * });
 */
export function useCreateReplyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateReplyMutation,
    CreateReplyMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateReplyMutation, CreateReplyMutationVariables>(
    CreateReplyDocument,
    options,
  );
}
export type CreateReplyMutationHookResult = ReturnType<
  typeof useCreateReplyMutation
>;
export type CreateReplyMutationResult =
  Apollo.MutationResult<CreateReplyMutation>;
export type CreateReplyMutationOptions = Apollo.BaseMutationOptions<
  CreateReplyMutation,
  CreateReplyMutationVariables
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
  query FindReview($reviewId: String!) {
    review(reviewId: $reviewId) {
      id
      user {
        username
        profilePictureUrl
      }
      post {
        id
        content
        createdAt
      }
      movie {
        id
        originalTitle
        posterUrl
        backdropUrl
        releaseDate
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
export const FindReviewsDocument = gql`
  query FindReviews($sort: ReviewSortInput, $userId: String, $page: Int!) {
    reviews(sort: $sort, userId: $userId, page: $page) {
      totalCount
      totalPages
      itemsPerPage
      pageInfo {
        currentPage
        hasPreviousPage
        hasNextPage
      }
      edges {
        node {
          id
          user {
            username
            profilePictureUrl
          }
          post {
            id
            content
            createdAt
          }
          movie {
            id
            originalTitle
            posterUrl
            releaseDate
          }
        }
      }
    }
  }
`;

/**
 * __useFindReviewsQuery__
 *
 * To run a query within a React component, call `useFindReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindReviewsQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      userId: // value for 'userId'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useFindReviewsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindReviewsQuery,
    FindReviewsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindReviewsQuery, FindReviewsQueryVariables>(
    FindReviewsDocument,
    options,
  );
}
export function useFindReviewsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindReviewsQuery,
    FindReviewsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindReviewsQuery, FindReviewsQueryVariables>(
    FindReviewsDocument,
    options,
  );
}
export type FindReviewsQueryHookResult = ReturnType<typeof useFindReviewsQuery>;
export type FindReviewsLazyQueryHookResult = ReturnType<
  typeof useFindReviewsLazyQuery
>;
export type FindReviewsQueryResult = Apollo.QueryResult<
  FindReviewsQuery,
  FindReviewsQueryVariables
>;
export const CreateReviewDocument = gql`
  mutation CreateReview($content: String!, $movieId: Int!) {
    createReview(content: $content, movieId: $movieId) {
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
 *      content: // value for 'content'
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
export const DeleteReviewDocument = gql`
  mutation DeleteReview($reviewId: String!) {
    deleteReview(reviewId: $reviewId)
  }
`;
export type DeleteReviewMutationFn = Apollo.MutationFunction<
  DeleteReviewMutation,
  DeleteReviewMutationVariables
>;

/**
 * __useDeleteReviewMutation__
 *
 * To run a mutation, you first call `useDeleteReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReviewMutation, { data, loading, error }] = useDeleteReviewMutation({
 *   variables: {
 *      reviewId: // value for 'reviewId'
 *   },
 * });
 */
export function useDeleteReviewMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteReviewMutation,
    DeleteReviewMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteReviewMutation,
    DeleteReviewMutationVariables
  >(DeleteReviewDocument, options);
}
export type DeleteReviewMutationHookResult = ReturnType<
  typeof useDeleteReviewMutation
>;
export type DeleteReviewMutationResult =
  Apollo.MutationResult<DeleteReviewMutation>;
export type DeleteReviewMutationOptions = Apollo.BaseMutationOptions<
  DeleteReviewMutation,
  DeleteReviewMutationVariables
>;
export const ToggleReviewPinDocument = gql`
  mutation ToggleReviewPin($reviewId: String!) {
    toggleReviewPin(reviewId: $reviewId)
  }
`;
export type ToggleReviewPinMutationFn = Apollo.MutationFunction<
  ToggleReviewPinMutation,
  ToggleReviewPinMutationVariables
>;

/**
 * __useToggleReviewPinMutation__
 *
 * To run a mutation, you first call `useToggleReviewPinMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleReviewPinMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleReviewPinMutation, { data, loading, error }] = useToggleReviewPinMutation({
 *   variables: {
 *      reviewId: // value for 'reviewId'
 *   },
 * });
 */
export function useToggleReviewPinMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ToggleReviewPinMutation,
    ToggleReviewPinMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ToggleReviewPinMutation,
    ToggleReviewPinMutationVariables
  >(ToggleReviewPinDocument, options);
}
export type ToggleReviewPinMutationHookResult = ReturnType<
  typeof useToggleReviewPinMutation
>;
export type ToggleReviewPinMutationResult =
  Apollo.MutationResult<ToggleReviewPinMutation>;
export type ToggleReviewPinMutationOptions = Apollo.BaseMutationOptions<
  ToggleReviewPinMutation,
  ToggleReviewPinMutationVariables
>;
export const FindStreamingProvidersDocument = gql`
  query FindStreamingProviders {
    streamingProviders {
      id
      name
    }
  }
`;

/**
 * __useFindStreamingProvidersQuery__
 *
 * To run a query within a React component, call `useFindStreamingProvidersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindStreamingProvidersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindStreamingProvidersQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindStreamingProvidersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FindStreamingProvidersQuery,
    FindStreamingProvidersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindStreamingProvidersQuery,
    FindStreamingProvidersQueryVariables
  >(FindStreamingProvidersDocument, options);
}
export function useFindStreamingProvidersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindStreamingProvidersQuery,
    FindStreamingProvidersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindStreamingProvidersQuery,
    FindStreamingProvidersQueryVariables
  >(FindStreamingProvidersDocument, options);
}
export type FindStreamingProvidersQueryHookResult = ReturnType<
  typeof useFindStreamingProvidersQuery
>;
export type FindStreamingProvidersLazyQueryHookResult = ReturnType<
  typeof useFindStreamingProvidersLazyQuery
>;
export type FindStreamingProvidersQueryResult = Apollo.QueryResult<
  FindStreamingProvidersQuery,
  FindStreamingProvidersQueryVariables
>;
export const FindUserDocument = gql`
  query FindUser($username: String!) {
    user(username: $username) {
      id
      username
      realName
      biography
      profilePictureUrl
      createdAt
    }
  }
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
export const FindUserByIdDocument = gql`
  query FindUserById($userId: String!) {
    userById(userId: $userId) {
      id
      username
      realName
      profilePictureUrl
      createdAt
    }
  }
`;

/**
 * __useFindUserByIdQuery__
 *
 * To run a query within a React component, call `useFindUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserByIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFindUserByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindUserByIdQuery,
    FindUserByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindUserByIdQuery, FindUserByIdQueryVariables>(
    FindUserByIdDocument,
    options,
  );
}
export function useFindUserByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindUserByIdQuery,
    FindUserByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindUserByIdQuery, FindUserByIdQueryVariables>(
    FindUserByIdDocument,
    options,
  );
}
export type FindUserByIdQueryHookResult = ReturnType<
  typeof useFindUserByIdQuery
>;
export type FindUserByIdLazyQueryHookResult = ReturnType<
  typeof useFindUserByIdLazyQuery
>;
export type FindUserByIdQueryResult = Apollo.QueryResult<
  FindUserByIdQuery,
  FindUserByIdQueryVariables
>;
export const FindUserByGithubIdDocument = gql`
  query FindUserByGithubId($githubId: String!) {
    userByGithubId(githubId: $githubId) {
      id
      username
      realName
      profilePictureUrl
      createdAt
    }
  }
`;

/**
 * __useFindUserByGithubIdQuery__
 *
 * To run a query within a React component, call `useFindUserByGithubIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserByGithubIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserByGithubIdQuery({
 *   variables: {
 *      githubId: // value for 'githubId'
 *   },
 * });
 */
export function useFindUserByGithubIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindUserByGithubIdQuery,
    FindUserByGithubIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindUserByGithubIdQuery,
    FindUserByGithubIdQueryVariables
  >(FindUserByGithubIdDocument, options);
}
export function useFindUserByGithubIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindUserByGithubIdQuery,
    FindUserByGithubIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindUserByGithubIdQuery,
    FindUserByGithubIdQueryVariables
  >(FindUserByGithubIdDocument, options);
}
export type FindUserByGithubIdQueryHookResult = ReturnType<
  typeof useFindUserByGithubIdQuery
>;
export type FindUserByGithubIdLazyQueryHookResult = ReturnType<
  typeof useFindUserByGithubIdLazyQuery
>;
export type FindUserByGithubIdQueryResult = Apollo.QueryResult<
  FindUserByGithubIdQuery,
  FindUserByGithubIdQueryVariables
>;
export const SignUpDocument = gql`
  mutation SignUp($githubId: String!) {
    signUp(githubId: $githubId)
  }
`;
export type SignUpMutationFn = Apollo.MutationFunction<
  SignUpMutation,
  SignUpMutationVariables
>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      githubId: // value for 'githubId'
 *   },
 * });
 */
export function useSignUpMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignUpMutation,
    SignUpMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(
    SignUpDocument,
    options,
  );
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<
  SignUpMutation,
  SignUpMutationVariables
>;
export const FindProfileStatsDocument = gql`
  query FindProfileStats($userId: String!) {
    profileStats(userId: $userId) {
      followerCount
      followingCount
      listCount
      moviesWatchedCount
      moviesWatchedThisYearCount
    }
  }
`;

/**
 * __useFindProfileStatsQuery__
 *
 * To run a query within a React component, call `useFindProfileStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProfileStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProfileStatsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFindProfileStatsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindProfileStatsQuery,
    FindProfileStatsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindProfileStatsQuery, FindProfileStatsQueryVariables>(
    FindProfileStatsDocument,
    options,
  );
}
export function useFindProfileStatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindProfileStatsQuery,
    FindProfileStatsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindProfileStatsQuery,
    FindProfileStatsQueryVariables
  >(FindProfileStatsDocument, options);
}
export type FindProfileStatsQueryHookResult = ReturnType<
  typeof useFindProfileStatsQuery
>;
export type FindProfileStatsLazyQueryHookResult = ReturnType<
  typeof useFindProfileStatsLazyQuery
>;
export type FindProfileStatsQueryResult = Apollo.QueryResult<
  FindProfileStatsQuery,
  FindProfileStatsQueryVariables
>;
