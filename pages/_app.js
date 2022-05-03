import { useState, useEffect } from 'react';
import FormProvider from '../context';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '../styles/globals.css';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function MyApp({ Component, pageProps }) {
  const [sidebar, setSidebar] = useState(false);
  const theme = createTheme({
    palette: {
      cyan: {
        main: '#22d3ee',
      },
    },
  });

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) setSidebar(false);
    });
  });

  return (
    <ThemeProvider theme={theme}>
      <FormProvider>
        <Navbar sidebar={sidebar} setSidebar={setSidebar} />

        <div className={`sidebar`}>
          <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        </div>

        <Component {...pageProps} />
      </FormProvider>
    </ThemeProvider>
  );
}

export default MyApp;
