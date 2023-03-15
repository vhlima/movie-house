import { Typography, SvgIcon } from '@/components';
import { MovieCover } from '@/components/movie';
import Table from '../../../../../components/Table';
import MovieLink from '../../../../../components/movie/MovieLink';

const DiaryTable: React.FC = () => {
  const a = 1;

  return (
    <Table>
      <Table.Head>
        <tr>
          <Table.Header>Month</Table.Header>
          <Table.Header>Day</Table.Header>
          <Table.Header className="text-left">Film</Table.Header>
          <Table.Header>Released</Table.Header>
          <Table.Header>Rating</Table.Header>
          <Table.Header>Like</Table.Header>
          <Table.Header>Review</Table.Header>
          <Table.Header>You</Table.Header>
        </tr>
      </Table.Head>

      <tbody>
        <Table.Row>
          <Table.Data>
            <div className="relative flex items-center w-fit border border-grey-700 bg-grey-800 rounded-md px-4 py-2 shadow-md">
              <div className="absolute -top-2 left-1 w-2 h-4 border bg-grey-900 border-grey-700 rounded-t-full rounded-b-full" />
              <div className="absolute -top-2 left-[45%] w-2 h-4 border bg-grey-900 border-grey-700 rounded-t-full rounded-b-full" />
              <div className="absolute -top-2 right-1 w-2 h-4 border bg-grey-900 border-grey-700 rounded-t-full rounded-b-full" />

              <div className="flex flex-col items-center mt-1">
                <Typography component="span" color="primary">
                  FEB
                </Typography>

                <Typography component="span">2023</Typography>
              </div>
            </div>
          </Table.Data>
          <Table.Data className="text-2xl text-center">01</Table.Data>
          <Table.Data>
            <MovieLink className="flex items-center gap-2" movieId={12155}>
              <MovieCover
                className="flex-shrink-0"
                width={40}
                height={40}
                link={false}
                movie={{
                  id: 12155,
                  originalTitle: 'Alice in Wonderland',
                  posterUrl:
                    'https://a.ltrbxd.com/resized/sm/upload/qp/te/tw/3j/alice-in-wonderland-original-0-230-0-345-crop.jpg?v=aeea07bfc9',
                }}
              />

              <Typography
                className="whitespace-nowrap font-bold hover:text-grey-200"
                component="h2"
                color="primary"
                size="lg"
              >
                Alice in Wonderland
              </Typography>
            </MovieLink>

            <MovieLink className="flex items-center gap-2" movieId={12155}>
              <MovieCover
                className="flex-shrink-0"
                width={40}
                height={40}
                link={false}
                movie={{
                  id: 12155,
                  originalTitle: 'Alice in Wonderland',
                  posterUrl:
                    'https://a.ltrbxd.com/resized/sm/upload/qp/te/tw/3j/alice-in-wonderland-original-0-230-0-345-crop.jpg?v=aeea07bfc9',
                }}
              />

              <Typography
                className="whitespace-nowrap font-bold hover:text-grey-200"
                component="h2"
                color="primary"
                size="lg"
              >
                Alice in Wonderland
              </Typography>
            </MovieLink>
          </Table.Data>
          <Table.Data>2010</Table.Data>
          <Table.Data>Rating Stars</Table.Data>
          <Table.Data>
            <SvgIcon iconType="AiFillHeart" />
          </Table.Data>
          <Table.Data>
            <SvgIcon iconType="VscPreview" />
          </Table.Data>

          <Table.Data>
            <SvgIcon iconType="AiFillEye" />
            <SvgIcon iconType="AiFillHeart" />
          </Table.Data>
        </Table.Row>
      </tbody>
    </Table>
  );
};

export default DiaryTable;
