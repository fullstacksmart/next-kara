// import { GetStaticPaths, GetStaticProps } from 'next';
import { Button } from '../../../components/buttons';
import { PageProps } from '../../../lib/types';

export interface ProfilePageProps extends PageProps {
  id: string;
}

const ProfilePage = ({ id, t }: ProfilePageProps): React.ReactElement => {
  return (
    <>
      <h1>Profile Page for Employer {id}</h1>
      <Button href={`/employers/${id}/settings`}>To Settings</Button>
    </>
  );
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [
//       {
//         params: {
//           id: '1',
//         },
//       },
//     ],
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   return {
//     props: {
//       id: params?.id,
//     },
//   };
// };

export default ProfilePage;
