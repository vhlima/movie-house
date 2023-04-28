import { User } from '@/gql';
import { faker } from '@faker-js/faker';

export function mockUser(): User {
  const createdAt = faker.date.past();

  return {
    id: faker.datatype.uuid(),
    username: faker.internet.userName(),
    profilePictureUrl: faker.internet.avatar(),
    createdAt: createdAt.getTime(),
    updatedAt: faker.date.between(createdAt, new Date()).getTime(),
  };
}
