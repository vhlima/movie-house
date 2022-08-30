import { NextPage } from 'next';

import ErrorText from '../../components/ErrorText';

const NotFoundPage: NextPage = () => <ErrorText text="Page not found" />;

export default NotFoundPage;
