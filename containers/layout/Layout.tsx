import { Button } from '../../components/buttons';
import Head from 'next/head';
import { getTitleString } from '../../lib/utils/strings';
import text from '../../lib/text';
import styles from '../../styles/Layout.module.css';

const currentText = text.GERMAN;

export interface LayoutProps {
  home?: boolean;
  title?: string | string[];
  children?: React.ReactNode;
}

const Layout = ({
  home = false,
  children,
  title,
}: LayoutProps): React.ReactElement => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{getTitleString(title)}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#00aba9" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&amp;family=Open+Sans:wght@300;400;700&amp;display=swap"
          rel="stylesheet"
        />
      </Head>
      <header className={styles.header}>
        {!home && (
          <Button href="/">{currentText.components.layout.backHome}</Button>
        )}
      </header>
      <main className={styles.main}>{children}</main>
      <footer></footer>
    </div>
  );
};

export default Layout;
