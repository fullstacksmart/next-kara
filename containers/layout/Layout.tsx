import { Button } from '../../components/buttons';
import Head from 'next/head';
import { getTitleString } from '../../lib/utils/strings';
import text from '../../lib/text';
import styles from '../../styles/Layout.module.css';
import OptionToggler from '../../components/option-toggler/OptionToggler';
import { currentLanguageVar } from '../../apollo/client';
import { SupportedLanguage } from '../../lib/types';
import { useState } from 'react';

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
  const [currentText, setCurrentText] = useState(text[currentLanguageVar()]);
  const handleToggle = (option: string): void => {
    currentLanguageVar(option as SupportedLanguage);
    setCurrentText(text[option]);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>{getTitleString(title)}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        {!home && (
          <>
            <Button href="/">{currentText.components.layout.backHome}</Button>
            <OptionToggler
              size="small"
              options={[
                { display: 'de', value: 'GERMAN' },
                { value: 'ENGLISH', display: 'en' },
              ]}
              optionsLabel="language"
              setOption={handleToggle}
            />
          </>
        )}
      </header>
      <main className={styles.main}>{children}</main>
      <footer></footer>
    </div>
  );
};

export default Layout;
