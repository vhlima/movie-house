import { NextPage } from 'next';

import { FaSadTear } from 'react-icons/fa';

import Typography from '../../components/Typography';

const NotFoundPage: NextPage = () => (
  <div className="flex flex-col items-center p-12">
    <FaSadTear className="text-grey-300" size={100} />

    <Typography
      className="font-bold text-center mt-6"
      component="h1"
      color="primary"
      size="3xl"
    >
      404 Page Not Found
    </Typography>

    <Typography className="mt-3 text-center" component="p">
      The page you are looking for doesn&apos;t exist or has been moved.
    </Typography>
  </div>
);

export default NotFoundPage;
