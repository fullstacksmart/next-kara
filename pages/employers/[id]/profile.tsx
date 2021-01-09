import { gql, useQuery } from '@apollo/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ModalType, PageProps } from '../../../lib/types';
import { BasicInfo, BasicInfoEdit } from '../../../components/basic-info';
import { Button } from '../../../components/buttons';
import { Layout } from '../../../containers/layout';
import { useState } from 'react';

export interface ProfilePageProps {
  //extends PageProps

  id: string;
}

const GET_BASIC_INFO = gql`
  query GetEmployer($id: String!) {
    getEmployerById(id: $id) {
      id
      company
      address {
        street
        streetNo
        city
        postalCode
      }
      profilePic
      description
      website
      name {
        firstName
        middleName
        lastName
      }
      gender
      fullName
    }
  }
`;

const ProfilePage = ({ id, t }: ProfilePageProps): React.ReactElement => {
  const { data, loading, error } = useQuery(GET_BASIC_INFO, {
    variables: {
      id,
    },
  });

  const [modal, setModal] = useState<ModalType>(ModalType.NONE);
  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  const basicInfoEmployer = data?.getEmployerById;

  return (
    <Layout title={['profile', `Employer ${id}`]}>
      <h1>Profile Page for {basicInfoEmployer.company}</h1>
      <BasicInfo
        t={t}
        basicInfoEmployer={basicInfoEmployer}
        handleEdit={() => setModal(ModalType.BASIC_INFO)}
      />
      <Button href={`/employers/${id}/settings`}>To Settings</Button>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          id: 'EA1',
        },
      },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      id: params?.id,
    },
  };
};

export default ProfilePage;
