import { gql, useQuery } from '@apollo/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Button } from '../../../components/buttons';
import { Layout } from '../../../containers/layout';
import { PageProps } from '../../../lib/types';
import { BasicInfo } from '../../../components/basic-info/BasicInfo';

export interface ProfilePageProps extends PageProps {
  id: string;
}

const GET_TALENT = gql`
  query GetTalent($id: String!) {
    getTalentById(id: $id) {
      id
      name {
        firstName
        lastName
      }
      fullName
      profilePic
      profession
      address {
        city
        isoCode
      }
      description
      experiences {
        id
        title
        lineOfWork
        employer {
          id
          name
          address {
            city
            isoCode
          }
        }
        duration {
          from {
            timeStamp
          }
          to {
            timeStamp
          }
        }
        description
      }
      qualifications {
        institution {
          name
        }
      }
      approbations {
        id
      }
      documents {
        id
      }
      languages {
        language
      }
      otherSkills {
        name
      }
    }
  }
`;

const ProfilePage = ({ id }: ProfilePageProps): React.ReactElement => {
  const { data, loading, error } = useQuery(GET_TALENT, {
    variables: {
      id,
    },
  });
  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error: {error.message}</h1>;
  const {
    name,
    fullName,
    profilePic,
    profession,
    address,
    description,
  } = data?.getTalentById;
  console.log(profilePic);
  return (
    <Layout title={['profile', `Talent ${id}`]}>
      <h1>Profile Page for Talent {name.firstName + ' ' + name.lastName}</h1>
      <BasicInfo
        fullName={fullName}
        profilePicUrl={profilePic}
        profession={profession}
        address={address.city}
        description={description}
        done={true}
        handleEdit={() => console.log('edit')}
      />
      <Button href={`/talents/${id}/settings`}>To Settings</Button>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          id: 'yasbiuycdbucoiuscboiucsiousc!@',
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
