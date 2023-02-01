import { Layout } from "components/Layout/Layout";
import { AppProps } from "next/app";
import "styles/root.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
