import type { NextPage } from 'next';

import Layout from '../Layout';

const Home: NextPage = () => (
  <Layout>
    <div className="bg-red-500">
      <h1 className="text-green-500">hello world</h1>
    </div>
  </Layout>
);

export default Home;
