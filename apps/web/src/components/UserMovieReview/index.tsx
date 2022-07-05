import React, { useState } from 'react';

import clsx from 'clsx';
import Link from '../Link';
import Star from '../Star';

import LikeAndComment from '../LikeAndComment';

import UserProfilePicture from '../UserProfilePicture';
import { TextShorter } from '../TextShorter';

interface UserMovieReviewProps {
  preview?: boolean;
}

const UserMovieReview: React.FC<UserMovieReviewProps> = ({ preview }) => {
  const [hasUserLike, setUserLike] = useState<boolean>(false);

  const rating = 10;

  const userProfilePictureUrl =
    'https://a.ltrbxd.com/resized/avatar/twitter/4/9/0/4/5/7/shard/http___pbs.twimg.com_profile_images_1001935353740177414_9ZQ0Noe4-0-80-0-80-crop.jpg?k=9c800e12d6';

  return (
    <>
      <div
        className={clsx('py-4 border-b border-b-grey-300 first:pt-0', {
          'mt-4': !preview,
          'last:border-0 last:pb-0': preview,
        })}
      >
        <div className="flex flex-col gap-2">
          {!preview && (
            <div className="flex mb-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(st => (
                <Star key={st} isChecked={rating >= st} />
              ))}
            </div>
          )}

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
              <div className="flex items-center ml-auto">
                <span className="mr-0.5 text-grey-200 font-semibold">3.5</span>

                <Star size={20} isChecked />
              </div>
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
      </div>

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
