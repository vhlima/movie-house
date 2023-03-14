import { Review } from '../../domain/entities';

import { CreateReview, CreateReviewHandleProps } from '../../domain/usecases';

import {
  IPostRepository,
  IReviewRepository,
  IMovieReferenceRepository,
  IMovieRepository,
} from '../contracts';

import {
  AuthenticationError,
  AlreadyExistsError,
  MovieNotFoundError,
  ReviewNotFoundError,
} from '../../domain/errors';

export class CreateReviewService implements CreateReview {
  constructor(
    private readonly reviewRepository: IReviewRepository,
    private readonly postRepository: IPostRepository,
    private readonly movieReferenceRepository: IMovieReferenceRepository,
    private readonly movieRepository: IMovieRepository,
  ) {}

  async handle({
    session,
    movieId,
    content,
  }: CreateReviewHandleProps): Promise<Review> {
    if (!session) {
      throw new AuthenticationError();
    }

    const reviewExists = await this.reviewRepository.getUserReviewByMovieId(
      session.id,
      movieId,
    );

    if (reviewExists) {
      throw new AlreadyExistsError(
        'You already created a review about this movie.',
      );
    }

    const movie = await this.movieRepository.getMovieById(movieId);

    if (!movie) {
      throw new MovieNotFoundError();
    }

    const post = await this.postRepository.createPost(session.id, content);

    const review = await this.reviewRepository.createReview(post.id, movieId);

    await this.movieReferenceRepository.createMovieReference(review.id, movie);

    const updatedReview = await this.reviewRepository.getReviewById(review.id);

    if (!updatedReview) {
      throw new ReviewNotFoundError();
    }

    return updatedReview;
  }
}
