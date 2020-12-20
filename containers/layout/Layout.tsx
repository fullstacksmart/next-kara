import { Button } from '../../components/buttons';
import Head from 'next/head';
import { getTitleString } from '../../lib/utils/strings';
import text from '../../lib/text';
import styles from '../../styles/Layout.module.css';

const currentText = text.german;

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
