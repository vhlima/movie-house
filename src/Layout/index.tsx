import React, { PropsWithChildren } from 'react';

import Navbar from './components/Navbar';

import Footer from './components/Footer';

const Layout: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="relative w-screen h-screen overflow-x-hidden overflow-y-auto font-sans bg-background">
    <div id="modalPortal" />

    <div className="flex flex-col">
      <Navbar />

      <div>{children}</div>

      <Footer />
    </div>
  </div>
);

export default Layout;
