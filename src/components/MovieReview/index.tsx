import React from 'react';

import Image from 'next/image';

import Link from '../Link';

import Star from '../Star';

import LikeAndComment from '../LikeAndComment';

const MovieReview: React.FC = () => {
  const hasUserLike = false;

  return (
    <div className="flex flex-col gap-2 py-4 border-b border-b-grey-300 first:pt-0 last:pb-0 last:border-0">
      <div className="flex items-center gap-1">
        <div className="relative w-5 h-5 border border-grey-700 rounded-full overflow-hidden">
          <Image
            layout="fill"
            objectFit="cover"
            src="https://a.ltrbxd.com/resized/avatar/twitter/4/9/0/4/5/7/shard/http___pbs.twimg.com_profile_images_1001935353740177414_9ZQ0Noe4-0-80-0-80-crop.jpg?k=9c800e12d6"
          />
        </div>

        <Link className="group" href="/">
          <span className="text-gray-200 group-hover:text-grey-300">
            Reviewed by
          </span>

          <span className="ml-1 text-gray-100 font-semibold group-hover:text-grey-200">
            karsten
          </span>
        </Link>

        <div className="flex items-center ml-auto">
          <span className="mr-0.5 text-grey-200 font-semibold">3.5</span>

          <Star size={20} isChecked />
        </div>
      </div>

      <p className="text-grey-200">
        People will complain about the Marvel template and the predictability of
        the origin story plot. And theyd be right. Its all there. A fact that
        obviously isnt that strange as it is both a Marvel film and an origin
        story.
      </p>

      <LikeAndComment likes={2928} commentaries={2928} liked={hasUserLike} />
    </div>
  );
};

export default MovieReview;
