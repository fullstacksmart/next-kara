import { LinkedButton } from '../../components/buttons';
import Head from 'next/head';
import styles from '../../styles/Layout.module.css';

export interface LayoutProps {
  home?: boolean;
  title?: string | string[];
  children?: React.ReactNode;
}

const getTitleString = (title: string | string[]): string => {
  let titleString = 'Kara';
  if (title) {
    titleString += ' | ';
    if (Array.isArray(title)) {
      titleString += title.join(' | ');
    } else {
      titleString += title;
    }
  }
  return titleString;
};

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
      </Head>
      <header className={styles.header}>
        {!home && <LinkedButton href="/">take me back home</LinkedButton>}
      </header>
      <main className={styles.main}>{children}</main>
      <footer></footer>
    </div>
  );
};

export default Layout;
