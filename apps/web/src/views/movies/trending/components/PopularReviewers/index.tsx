import { useAuth } from '../../../../../hooks/useAuth';

import Card from '../../../../../components/Card';

import Link from '../../../../../components/Link';

import SvgIcon from '../../../../../components/SvgIcon';

import ListItem from '../../../../../components/ListItem';

import Typography from '../../../../../components/Typography';

import QueryState from '../../../../../components/QueryState';

import ProfilePicture from '../../../../../components/ProfilePicture';

const PopularReviewers: React.FC = () => {
  const { user } = useAuth();

  return (
    <Card title="Popular reviewers" noPadding>
      <QueryState loading={false} error={undefined}>
        {user && (
          <ul className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <ListItem
                className="flex items-center gap-2"
                key={`popular-reviewer-${user.id + index}`}
              >
                <ProfilePicture src={user.profilePictureUrl} imageSize="md" />

                <div className="w-full">
                  <Link
                    href={{
                      pathname: '/users/[username]',
                      query: { username: user.username },
                    }}
                  >
                    <Typography
                      className="font-semibold hover:text-grey-200"
                      component="h3"
                      color="primary"
                    >
                      {user.username}
                    </Typography>
                  </Link>

                  <Link
                    href={{
                      pathname: '/users/[username]',
                      query: { username: user.username },
                    }}
                  >
                    <Typography
                      className="hover:text-grey-300"
                      component="small"
                      size="sm"
                    >
                      1,660 movies
                    </Typography>
                  </Link>

                  <Typography className="mx-1" component="span">
                    |
                  </Typography>

                  <Link
                    href={{
                      pathname: '/users/[username]',
                      query: { username: user.username },
                    }}
                  >
                    <Typography
                      className="hover:text-grey-300"
                      component="small"
                      size="sm"
                    >
                      1,259 reviews
                    </Typography>
                  </Link>
                </div>

                <button className="bg-grey-300 p-2 rounded-full" type="button">
                  <SvgIcon className="text-grey-100" iconType="BsPlusLg" />
                </button>
              </ListItem>
            ))}
          </ul>
        )}
      </QueryState>
    </Card>
  );
};

export default PopularReviewers;
