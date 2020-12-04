import { LinkedButton } from '../components/buttons';
import { Layout } from '../containers/layout';

export default function Home(): React.ReactNode {
  return (
    <Layout title="Home" home>
      <LinkedButton href="/signin" color="primary" variant="contained">
        sign in / register
      </LinkedButton>
    </Layout>
    // <div className={styles.container}>
    //   <Head>
    //     <title>Kara | Home</title>
    //     <link rel="icon" href="/favicon.ico" />
    //   </Head>
    //   <main className={styles.main}></main>
    //   <LinkedButton href="/signin" color="primary" variant="contained">
    //     sign in / register
    //   </LinkedButton>
    //   <footer className={styles.footer}></footer>
    // </div>
  );
}
