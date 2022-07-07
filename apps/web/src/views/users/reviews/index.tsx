import React, { useState } from 'react';

import { movieList } from '../../../data/fakeData';

import Link from '../../../components/Link';

import ListItem from '../../../components/ListItem';

import TextShorter from '../../../components/TextShorter';

import LikeAndComment from '../../../components/LikeAndComment';

import UserProfilePicture from '../components/ProfilePicture';

import MovieCover from '../../movies/components/Cover';

import MovieRatingStar from '../../movies/components/RatingStar';

interface UserMovieReviewProps {
  preview?: boolean;
}

const UserMovieReview: React.FC<UserMovieReviewProps> = ({ preview }) => {
  const [hasUserLike, setUserLike] = useState<boolean>(false);

  const movie = movieList[0];

  const userProfilePictureUrl =
    'https://a.ltrbxd.com/resized/avatar/twitter/4/9/0/4/5/7/shard/http___pbs.twimg.com_profile_images_1001935353740177414_9ZQ0Noe4-0-80-0-80-crop.jpg?k=9c800e12d6';

  return (
    <>
      <ListItem multiple={preview}>
        {preview && (
          <div className="flex gap-2">
            <MovieCover coverUrl={movie.coverUrl} />

            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <Link
                  className="text-grey-100 text-xl font-semibold hover:text-grey-300"
                  href="/"
                >
                  {movie.name}
                </Link>

                <span className="text-grey-200">
                  ({movie.releaseDate.year})
                </span>
              </div>

              <MovieRatingStar color="yellow" rating={movie.rating} checked />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          {/* {!preview && (
            <div className="flex mb-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(st => (
                <MovieRatingStar
                  key={st}
                  color={rating >= st ? 'blue' : 'grey'}
                  checked={rating >= st}
                  size={24}
                />
              ))}
            </div>
          )} */}

          <div className="flex items-center gap-1">
            <UserProfilePicture imageSize="sm" src={userProfilePictureUrl} />

            <Link className="group" href="/">
              {preview && (
                <span className="text-gray-200 group-hover:text-grey-300 mr-1">
                  Reviewed by
                </span>
              )}

              <span className="text-gray-100 font-semibold group-hover:text-grey-200">
                karsten
              </span>
            </Link>

            {!preview ? (
              <span className="text-grey-200">reviewed in Aug 28, 2019</span>
            ) : (
              <MovieRatingStar
                color="blue"
                rating={3.5}
                marginAuto
                reverse
                checked
              />
            )}
          </div>

          <TextShorter
            className="text-grey-200"
            maxCharacters={120}
            text="
              Pretty similar to how I feel about the Brockhampton documentary. As
              a Travis Scott fan, I dug it, but thats only really because Im
              familiar with him, his performances, his music, and this is just a
              closer look at all of that. If youre going into this knowing
              nothing, youll come away knowing about the same and probably even a
              little turned off by how up his own ass Travis comes across through
              this. Unlike Brockhamptons doc, this had barely any structure to it
              and doesnt really give you anything to get hooked on. Which sucks
              because it makes it pretty clear that Travis is a pretty interesting
              guy with an interesting story but it just kinda...doesnt do anything
              with that. Cant believe I just wrote a serious review for a Travis
              Scott Netflix documentary lol.
            "
          />

          <LikeAndComment
            likes={2928}
            commentaries={2928}
            liked={hasUserLike}
            onLike={() => setUserLike(prev => !prev)}
          />
        </div>
      </ListItem>

      {!preview && (
        <div className="flex flex-col gap-2 py-4">
          <div className="flex items-center">
            <UserProfilePicture imageSize="sm" src={userProfilePictureUrl} />

            <Link className="group ml-1" href="/">
              <span className="text-gray-100 font-semibold group-hover:text-grey-200">
                karsten
              </span>
            </Link>

            <span className="text-grey-200 text-sm ml-auto">3hrs ago</span>
          </div>

          <p className="text-grey-200">
            im older than travis scott by 18 days seeing matrix 20 yr
            anniversary tomorrow in dolby, pretty stoked
          </p>

          <LikeAndComment
            reply
            likes={2928}
            commentaries={2928}
            liked={hasUserLike}
            onLike={() => setUserLike(prev => !prev)}
          />
        </div>
      )}
    </>
  );
};

export default UserMovieReview;