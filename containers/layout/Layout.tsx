import { Button } from '../../components/buttons';
import Head from 'next/head';
import { getTitleString } from '../../lib/utils/strings';
import text from '../../lib/text';
import styles from '../../styles/Layout.module.css';

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
      </Head>
      <header className={styles.header}>
        {!home && (
          <Button href="/">{text.components.layout.backHome.german}</Button>
        )}
      </header>
      <main className={styles.main}>{children}</main>
      <footer></footer>
    </div>
  );
};

export default Layout;
