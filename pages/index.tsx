import { Button } from '../components/buttons';
import { Layout } from '../containers/layout';

export default function Home(): React.ReactNode {
  return (
    <Layout title="Home" home>
      <Button href="/signin" color="primary" variant="contained">
        sign in / register
      </Button>
    </Layout>
    // <div className={styles.container}>
    //   <Head>
    //     <title>Kara | Home</title>
    //     <link rel="icon" href="/favicon.ico" />
    //   </Head>
    //   <main className={styles.main}></main>
    //   <Button href="/signin" color="primary" variant="contained">
    //     sign in / register
    //   </Button>
    //   <footer className={styles.footer}></footer>
    // </div>
  );
}
