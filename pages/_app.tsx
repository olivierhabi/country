import "../src/styles/sass/base.scss";
import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "next-themes";
import { Provider as AuthProvider } from "next-auth/client";
import Provider from "../src/contexts/provider";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <AuthProvider session={pageProps.session}>
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
