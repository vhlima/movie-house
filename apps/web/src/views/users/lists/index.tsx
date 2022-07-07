import React from 'react';

import Image from 'next/image';

import { movieList } from '../../../data/fakeData';

import Link from '../../../components/Link';

import SvgIcon from '../../../components/SvgIcon';

import ListItem from '../../../components/ListItem';

import Post from '../components/Post';

const UserMovieList: React.FC = () => (
  <ListItem>
    <Link href="/lists/abc">
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

      <h1 className="text-grey-100 font-semibold text-lg my-2 hover:text-grey-200">
        what is reality?
      </h1>
    </Link>

    <Post
      text="meditations, ruminations, and explorations on the nature of reality and
      existence. comprised most of projects ive watched, and some watchlist
      entries. organized by color. ฅ^•ﻌ•^ฅ"
      textShort
    >
      <Link className="group" href="/">
        <span className="ml-1 text-gray-100 font-semibold group-hover:text-grey-200">
          karsten
        </span>
      </Link>

      <div className="flex items-center ml-auto">
        <span className="mr-0.5 text-grey-200 font-semibold">1,327</span>

        <SvgIcon className="text-grey-300" iconType="MdMovie" size={22} />
      </div>
    </Post>
  </ListItem>
);

export default UserMovieList;
