import React from 'react';

import Image from 'next/image';

import { movieList } from '../../../data/fakeData';

import Link from '../../../components/Link';

import SvgIcon from '../../../components/SvgIcon';

import ListItem from '../../../components/ListItem';

import LikeAndComment from '../../../components/LikeAndComment';

interface UserMovieListProps {
  preview?: boolean;
}

const UserMovieList: React.FC<UserMovieListProps> = ({ preview = true }) => (
  <ListItem multiple={preview}>
    <Link href="/">
      <ul className="flex relative w-full h-40">
        {movieList.map((movie, index) => (
          <li
            className="relative min-w-0 flex-grow basis-1/3 rounded-lg float-left border border-grey-700 overflow-hidden"
            key={movie.id}
            style={{
              zIndex: 999 - index,
              marginRight: `-12.5%`,
            }}
          >
            <Image layout="fill" objectFit="fill" src={movie.coverUrl} />
          </li>
        ))}
      </ul>

      <h1 className="text-grey-100 font-semibold ">what is reality?</h1>
    </Link>

    <div className="flex items-center">
      <div className="relative w-5 h-5 border border-grey-700 rounded-full overflow-hidden">
        <Image
          layout="fill"
          objectFit="cover"
          src="https://a.ltrbxd.com/resized/avatar/twitter/4/9/0/4/5/7/shard/http___pbs.twimg.com_profile_images_1001935353740177414_9ZQ0Noe4-0-80-0-80-crop.jpg?k=9c800e12d6"
        />
      </div>

      <Link className="group" href="/">
        <span className="ml-1 text-gray-100 font-semibold group-hover:text-grey-200">
          karsten
        </span>
      </Link>

      <div className="flex items-center ml-auto">
        <span className="mr-0.5 text-grey-200 font-semibold">1,327</span>

        <SvgIcon className="text-grey-300" iconType="MdMovie" size={22} />
      </div>
    </div>

    <p className="text-grey-200">
      meditations, ruminations, and explorations on the nature of reality and
      existence. comprised most of projects ive watched, and some watchlist
      entries. organized by color. ฅ^•ﻌ•^ฅ
    </p>

    <LikeAndComment likes={14758} commentaries={138} onLike={() => ({})} />
  </ListItem>
);

export default UserMovieList;
