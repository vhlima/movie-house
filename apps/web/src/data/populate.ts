/* eslint-disable import/no-extraneous-dependencies */
import { faker } from '@faker-js/faker';

import {
  ActorProps,
  MovieCategory,
  MovieCrewProps,
  MovieData,
  UserData,
} from '../types';
import { loop } from '../utils';

const fakeUser = (): UserData => ({
  id: faker.datatype.uuid(),
  username: faker.internet.userName(),
  fullName: faker.name.findName(),
  followers: [],
  following: [],
  profilePictureUrl:
    'https://a.ltrbxd.com/resized/avatar/twitter/4/9/0/4/5/7/shard/http___pbs.twimg.com_profile_images_1001935353740177414_9ZQ0Noe4-0-80-0-80-crop.jpg?k=9c800e12d6',
});

const fakeMovieCategories = () =>
  [
    {
      id: faker.datatype.uuid(),
      name: 'Action',
    },
    {
      id: faker.datatype.uuid(),
      name: 'Adventure',
    },
    {
      id: faker.datatype.uuid(),
      name: 'Fantasy',
    },
    {
      id: faker.datatype.uuid(),
      name: 'Sci-Fi',
    },
  ] as MovieCategory[];

const fakeMovieCrew = () =>
  [
    {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      role: ['Director', 'Writer'],
    },
    {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      role: ['Writer'],
    },
    {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      role: ['Writer'],
    },
  ] as MovieCrewProps[];

const fakeActor = () =>
  ({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    photoUrl: faker.image.people(),
  } as ActorProps);

const fakeActors = loop(10, fakeActor);

const fakeMovie = () =>
  ({
    id: faker.datatype.uuid(),
    name: faker.music.songName(),
    rating: faker.datatype.float({ min: 1, max: 10, precision: 0.1 }),
    coverUrl: faker.image.image(),
    duration: '1h 55m',
    backgroundUrl: faker.image.image(),
    spoiler: faker.lorem.lines(),
    ageRestriction: faker.datatype.number({ min: 6, max: 18 }),
    releaseDate: {
      day: faker.date.past().getDay().toString(10),
      month: faker.date.past().getMonth().toString(10),
      year: faker.date.past().getFullYear().toString(10),
    },
    categories: fakeMovieCategories(),
    cast: fakeActors.map(actor => ({
      ...actor,
      role: faker.word.noun(),
    })),
    crew: fakeMovieCrew(),
  } as MovieData);

/* eslint-disable import/prefer-default-export */
export const populateJSON = () => {
  const users = loop(10, fakeUser);

  const movies = loop(5, fakeMovie);

  console.log(JSON.stringify({ users, movies }));
};
