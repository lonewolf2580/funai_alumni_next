import '../styles/globals.css';
import { Global } from '@emotion/react';
import GlobalStyles from '../styles/globalStyles';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return( 
    <>
      <Head>
        <title>AE-FUNAI Alumni</title>
      </Head>
      <Global styles={GlobalStyles} />
      <Component {...pageProps} />
    </>
    
  )
}

export default MyApp
