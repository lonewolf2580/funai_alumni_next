import '../styles/globals.css';
import { Global } from '@emotion/react';
import GlobalStyles from '../styles/globalStyles';

function MyApp({ Component, pageProps }) {
  return( 
    <>
      <Global styles={GlobalStyles} />
      <Component {...pageProps} />
    </>
    
  )
}

export default MyApp
