import React, { PropsWithChildren } from 'react';

import Navbar from './components/Navbar';

import Footer from './components/Footer';

const Layout: React.FC<PropsWithChildren> = ({ children }) => (
  <>
    <div id="modalPortal" />

    <div className="flex flex-col relative w-screen h-screen overflow-x-hidden overflow-y-auto font-sans bg-grey-900">
      <Navbar />

      <div className="relative flex-grow">{children}</div>

      <Footer />
    </div>
  </>
);

export default Layout;
