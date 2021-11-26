import "../src/styles/sass/base.scss";
import "tailwindcss/tailwind.css";
import { ThemeProvider } from "next-themes";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
    //  value={{ light: "light" }}
      attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
