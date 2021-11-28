import "../src/styles/sass/base.scss";
import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "next-themes";
import { Provider as AuthProvider } from "next-auth/client";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider session={pageProps.session}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
