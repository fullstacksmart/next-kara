import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
// import { GetStaticPaths, GetStaticProps } from 'next';
import { ModalType, PageProps } from '../../../lib/types';
import {
  BasicInfo,
  BasicInfoEditEmployer,
} from '../../../components/basic-info';
import { Button } from '../../../components/buttons';
import { Layout } from '../../../containers/layout';
import { withTranslation } from '../../../i18n';
import { useState } from 'react';

// export interface ProfilePageProps {
//   //extends PageProps
//   id: string;
// }

const GET_ALL_INFO = gql`
  query GetEmployerById($id: String!) {
    getEmployerById(id: $id) {
      id
      basicInfoEmployer {
        id
        companyName
        industry
        address {
          street
          streetNo
          city
          postalCode
        }
        name {
          firstName
          middleName
          lastName
        }
        profilePic
        description
        website
        gender
        fullName
      }
    }
  }
`;

const ProfilePage = ({ t }: PageProps): React.ReactElement => {
  const id = useRouter().query.id;
  const { data, loading, error } = useQuery(GET_ALL_INFO, {
    variables: {
      id,
    },
  });

  const [modal, setModal] = useState<{ type: ModalType; id?: string }>({
    type: ModalType.NONE,
  });

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error: {error.message}</h1>;
  const basicInfo = data?.getEmployerById.basicInfoEmployer;

  const handleModalClose = (): void => {
    setModal({ type: ModalType.NONE });
  };

  return (
    <Layout title={['profile', `Employer ${id}`]}>
      <h1>Profile Page for {basicInfo.companyName}</h1>
      <BasicInfo
        t={t}
        basicInfoEmployer={basicInfo}
        handleEdit={() => setModal({ type: ModalType.BASIC_INFO })}
      />
      <BasicInfoEditEmployer
        t={t}
        basicInfoEmployer={basicInfo}
        open={modal.type === ModalType.BASIC_INFO}
        onClose={handleModalClose}
      />
      <Button href={`/employers/${id}/settings`}>To Settings</Button>
    </Layout>
  );
};

ProfilePage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [
//       {
//         params: {
//           id: 'EA1',
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

export default withTranslation('common')(ProfilePage);
