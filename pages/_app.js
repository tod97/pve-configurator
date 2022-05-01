import { useState, useEffect } from 'react';
import FormProvider from '../context';
import '../styles/globals.css';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function MyApp({ Component, pageProps }) {
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) setSidebar(false);
    });
  });

  return (
    <FormProvider>
      <Navbar sidebar={sidebar} setSidebar={setSidebar} />

      <div className={`sidebar`}>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
      </div>

      <Component {...pageProps} />
    </FormProvider>
  );
}

export default MyApp;
