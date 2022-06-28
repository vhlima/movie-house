import React from 'react';

import { useRouter } from 'next/router';

import Image from 'next/image';
import { fakeUsers } from '../../data/fakeData';

import Layout from '../../Layout';
import Link from '../../components/Link';
import UserProfileNumber from '../../pageComponents/users/components/UserProfileNumber';
import Card from '../../components/Card';
import MovieReview from '../../components/MovieReview';
import Button from '../../components/Button';
import UserReviewPreview from '../../components/UserReviewPreview';

const UserProfile: React.FC = () => {
  const router = useRouter();

  const { userId } = router.query;

  const user = fakeUsers.find(u => u.id === userId);

  if (!user) {
    return (
      <Layout>
        <h1 className="text-red-500">User not found</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex">
        <div className="w-full h-44 absolute z-0">
          <Image
            layout="fill"
            objectFit="fill"
            src="https://a.ltrbxd.com/resized/sm/upload/cb/ch/lf/md/oslo-august-31-1200-1200-675-675-crop-000000.jpg?k=04db1306d5"
          />

          <div className="absolute bottom-0 h-20 w-full z-10 bg-gradient-to-t from-grey-900" />
        </div>

        <div className="p-3 mt-32 z-10">
          <div className="flex items-center gap-2">
            <div className="relative w-16 h-16 rounded-full border border-grey-700 overflow-hidden">
              <Image layout="fill" src={user.profilePictureUrl} />
            </div>

            <h1 className="text-grey-100 text-2xl font-semibold">
              {user.username}
            </h1>

            <div className="bg-movieHouse-mid rounded-md px-1">
              <span className="text-white text-sm">Patron</span>
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <Button buttonStyle="secondary" buttonSize="xs">
              Follow
            </Button>

            <Button buttonStyle="secondary" buttonSize="xs">
              Message
            </Button>
          </div>

          <div className="mt-2">
            <div className="flex flex-wrap justify-center gap-2">
              <UserProfileNumber
                link={{ href: '/' }}
                number={1595}
                text="movies"
              />

              <UserProfileNumber
                link={{ href: '/' }}
                number={118}
                text="This year"
              />

              <UserProfileNumber
                link={{ href: '/' }}
                number={48}
                text="Lists"
              />

              <div className="flex">
                <UserProfileNumber
                  link={{ href: '/' }}
                  number={138}
                  text="Following"
                />

                <UserProfileNumber
                  link={{ href: '/' }}
                  number={116943}
                  text="Followers"
                />
              </div>
            </div>

            <Card title="About me">
              <p className="text-grey-200">
                guy on youtube (karsten runquist) // guy on podcast (karstcast)
                <br />
                •
                <br />
                <br />
                top 4 favorites are not actual top favorites, just films Im
                really into each month.
              </p>
            </Card>

            <Card title="Pinned reviews">
              <UserReviewPreview />
            </Card>

            <Card title="Recent reviews">
              <UserReviewPreview />
            </Card>

            <Card title="Popular reviews">
              <UserReviewPreview />
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
