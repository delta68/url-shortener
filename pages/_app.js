import "../styles/globals.css";
import "../styles/mystyles.css";
import Head from "next/dist/shared/lib/head";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
