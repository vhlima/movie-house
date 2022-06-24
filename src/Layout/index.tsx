import React, { PropsWithChildren } from 'react';

import Navbar from './components/Navbar';

import Footer from './components/Footer';

const Layout: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="flex flex-col w-screen h-screen font-sans bg-background">
    <Navbar />

    <div>{children}</div>

    <Footer />
  </div>
);

export default Layout;
