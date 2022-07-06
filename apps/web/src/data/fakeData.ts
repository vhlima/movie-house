/* eslint-disable import/no-extraneous-dependencies */
import { faker } from '@faker-js/faker';

import { UserData, MovieCategory, MovieCrewData, MovieData } from '../types';

/* eslint-disable import/prefer-default-export */

export interface ActorProps {
  id: string;
  name: string;
  photoUrl: string;
}

const movieCategories: MovieCategory[] = [
  {
    id: '666894be-9a07-41d8-8b86-a0723304914f',
    name: 'Action',
  },
  {
    id: '611d2223-239f-47d7-9eaf-a8abe087ee84',
    name: 'Adventure',
  },
  {
    id: '19210e59-71e9-4a7c-a5fe-4274bb8cbe91',
    name: 'Fantasy',
  },
  {
    id: 'sci-fi',
    name: 'Sci-Fi',
  },
];

const movieActorRole = [
  'Stephen Strange / Doctor Strange',
  'Karl Mordo',
  'Dr. Christine Palmer',
  'Wong',
  'Kaecilius',
  'The Ancient One',
  'Dr. Nicodemus West',
  'Jonathan Pangborn',
  'Lucian / Strong Zealot',
];

export const actorList: ActorProps[] = [
  {
    id: 'e62609e1-6b46-4309-ab35-5e2fc8f138e4',
    name: 'Benedict Cumberbatch',
    photoUrl:
      'https://www.themoviedb.org/t/p/w138_and_h175_face/fBEucxECxGLKVHBznO0qHtCGiMO.jpg',
  },
  {
    id: 'a8a67a68-63e8-4c47-b927-b3aea99a34d7',
    name: 'Chiwetel Ejiofor',
    photoUrl:
      'https://www.themoviedb.org/t/p/w138_and_h175_face/kq5DDnqqofoRI0t6ddtRlsJnNPT.jpg',
  },
  {
    id: 'fb7b4bd4-b97b-47cf-96f5-a314daad2ba5',
    name: 'Rachel McAdams',
    photoUrl:
      'https://www.themoviedb.org/t/p/w138_and_h175_face/2RVyvc8YVqtfN0taqpYliaUoBem.jpg',
  },
  {
    id: '7988af6f-d506-4cea-bc32-5a6f4a1d38bb',
    name: 'Benedict Wong',
    photoUrl:
      'https://www.themoviedb.org/t/p/w138_and_h175_face/ukmfsl59Isvn9odgzMWBidA3cmt.jpg',
  },
  {
    id: '0a71fc58-8b15-42c8-90bd-2093578ee91c',
    name: 'Mads Mikkelsen',
    photoUrl:
      'https://www.themoviedb.org/t/p/w138_and_h175_face/ntwPvV4GKGGHO3I7LcHMwhXfsw9.jpg',
  },
  {
    id: 'a3ba6365-5831-4789-b369-04bd996fbca3',
    name: 'Tilda Swinton',
    photoUrl:
      'https://www.themoviedb.org/t/p/w138_and_h175_face/gWbX3a7V2MgRMRzekfITNcb27xV.jpg',
  },
  {
    id: 'd9841542-176c-404e-b893-c64e1ad8db0c',
    name: 'Michael Stuhlbarg',
    photoUrl:
      'https://www.themoviedb.org/t/p/w138_and_h175_face/seBk12MUK51aUoYX4OW1itfOpJ6.jpg',
  },
  {
    id: '7f74d5b8-c0e9-4b88-89a0-ea7d3d650d78',
    name: 'Benjamin Bratt',
    photoUrl:
      'https://www.themoviedb.org/t/p/w138_and_h175_face/hBenHPT4iJEG2kt5z2TOGnkRZwh.jpg',
  },
];

const copyPasta = {
  duration: '1h 55m',
  backgroundUrl:
    'https://a.ltrbxd.com/resized/sm/upload/h8/gd/di/02/doctor-strange-1200-1200-675-675-crop-000000.jpg',
  spoiler:
    'After his career is destroyed, a brilliant but arrogant surgeon gets a new lease on life when a sorcerer takes him under her wing and trains him to defend the world against evil.',
  ageRestriction: 12,
  releaseDate: {
    day: '02',
    month: '11',
    year: '2016',
  },
  categories: movieCategories,
  cast: actorList.map((actor, index) => ({
    role: movieActorRole[index],
    ...actor,
  })),
  crew: [
    {
      id: '576f60b3-c5c2-4b23-b52c-d03dc29342c1',
      name: 'Scott Derrickson',
      role: ['Director', 'Writer'],
    },
    {
      id: '8ec7adbb-c21c-4190-9c8f-2c12e11c08fe',
      name: 'Jon Spaihts',
      role: ['Writer'],
    },
    {
      id: '5c3edbbf-87d0-447d-b3a8-d56ff044542b',
      name: 'C. Robert Cargill',
      role: ['Writer'],
    },
  ] as MovieCrewData[],
};

export const fakeUser = (): UserData => ({
  _id: faker.datatype.uuid(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
  realName: faker.name.findName(),
  followers: [],
  following: [],
  profilePicture:
    'https://a.ltrbxd.com/resized/avatar/twitter/4/9/0/4/5/7/shard/http___pbs.twimg.com_profile_images_1001935353740177414_9ZQ0Noe4-0-80-0-80-crop.jpg?k=9c800e12d6',
});

export const fakeUsers: UserData[] = [
  fakeUser(),
  fakeUser(),
  fakeUser(),
  fakeUser(),
  fakeUser(),
];

export const movieList: MovieData[] = [
  {
    id: '6e943d50-4b1e-48b1-b6aa-32223ffb136f',
    name: 'Doctor Strange',
    rating: 8.1,
    coverUrl:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/iM1hlVGZ5Qwn3gO6ewTszY7OrLY.jpg',
    ...copyPasta,
  },
  {
    id: '99bd34b3-1c85-4110-8fbb-ad6bc4bbadca',
    name: 'The Simpsons',
    rating: 7.6,
    coverUrl:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/ARIEA8fMTk8HLy8AyLbKyUjsqC.jpg',
    ...copyPasta,
  },
  {
    id: 'f7d98891-48dc-48b3-bb1f-1332b2d52ab0',
    name: 'Megalodon',
    rating: 6.4,
    coverUrl:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/hES2eVAbVt08JJTqgu3jmI34Yxx.jpg',
    ...copyPasta,
  },
  {
    id: '44847fb8-ccc3-4a33-83f4-7d678a6f566e',
    name: 'Virus Zona de Contenção',
    rating: 4.9,
    coverUrl:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/sOIQ8YlLzOeBXtiXhrZwt7nrdi4.jpg',
    ...copyPasta,
  },
  {
    id: 'movie',
    name: 'Animais Fantásticos: Os Segredos de Dumbledore',
    rating: 6.8,
    coverUrl:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/gopGghuMtmdMviBcl9G0JfVB2RZ.jpg',
    ...copyPasta,
  },
];
