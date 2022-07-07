import { NextPage } from 'next';
import UserMovieList from '../../views/users/lists';

const UserList: NextPage = () => <UserMovieList preview={false} />;

export default UserList;
