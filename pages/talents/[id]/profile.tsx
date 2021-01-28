import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { Layout } from '../../../containers/layout';
import {
  Approbation,
  ApprobationStatus,
  DbApprobation,
  Experience,
  FederalState,
  ModalType,
  PageProps,
  Qualification,
  Skill,
} from '../../../lib/types';
import { withTranslation } from '../../../i18n';
import { useState } from 'react';
import {
  BasicInfo,
  BasicInfoEdit,
  ExperienceSection,
  ExperienceEdit,
  QualificationSection,
  QualificationEdit,
  Button,
  OtherSkillsSection,
  LanguageSection,
  LanguagesEdit,
  OtherSkillsEdit,
  ApprobationsSection,
  ApprobationsEdit,
  ProgressIndicator,
} from '../../../components';
import { getShortName } from '../../../lib/utils/strings';

// export interface ProfilePageProps extends PageProps {
//   id: string;
// }

// const GET_TALENT = gql`
//   query GetTalent($id: String!) {
//     getTalentById(id: $id) {
//       id
//       name {
//         firstName
//         middleName
//         lastName
//       }
//       gender
//       fullName
//       profilePic
//       profession
//       address {
//         city
//         isoCode
//       }
//       description
//       experiences {
//         id
//         title
//         lineOfWork
//         employer {
//           id
//           name
//           address {
//             city
//             isoCode
//           }
//         }
//         duration {
//           from {
//             timeStamp
//           }
//           to {
//             timeStamp
//           }
//         }
//         description
//       }
//       qualifications {
//         institution {
//           name
//         }
//       }
//       approbations {
//         id
//       }
//       documents {
//         id
//       }
//       languages {
//         language
//       }
//       otherSkills {
//         name
//       }
//     }
//   }
// `;

const GET_ALL_INFO = gql`
  query GetTalentById($id: String!) {
    getTalentById(id: $id) {
      id
      basicInfo {
        id
        name {
          firstName
          middleName
          lastName
        }
        fullName
        gender
        profilePic
        profession
        address {
          city
          isoCode
        }
        description
        isBasicInfoComplete
      }
      experiences {
        id
        talent {
          id
          gender
        }
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
        isComplete
      }
      qualifications {
        id
        talent {
          id
        }
        fieldOfEducation
        degree
        institution {
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
        isComplete
      }
      languages {
        id
        name
        level
      }
      otherSkills {
        id
        name
        level
        description
      }
      approbations {
        id
        state
        status
      }
      percentageComplete
    }
  }
`;

const ProfilePage = ({ t, i18n }: PageProps): React.ReactElement => {
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
  if (error) {
    if (error.message.startsWith('404')) return <h1>insert 404 page here</h1>;
    return <h1>Error: {error.message}</h1>;
  }

  const basicInfo = data?.getTalentById.basicInfo;
  const experiences: Experience[] = data.getTalentById.experiences;
  const qualifications: Qualification[] = data.getTalentById.qualifications;
  const languages: Skill[] = data.getTalentById.languages;
  const otherSkills: Skill[] = data.getTalentById.otherSkills;
  const approbations: Approbation[] = data.getTalentById.approbations.map(
    (approbation: DbApprobation) => ({
      ...approbation,
      state: FederalState[approbation.state],
      status: ApprobationStatus[approbation.status],
    }),
  );
  const progress = data.getTalentById.percentageComplete;

  const handleModalClose = (): void => {
    setModal({ type: ModalType.NONE });
  };

  return (
    <Layout
      t={t}
      title={['profile', getShortName(basicInfo.name)]}
      heading={
        t('pages.profile.greeting') +
        (basicInfo.name?.firstName ? ', ' + basicInfo.name.firstName : '') +
        '!'
      }
      i18n={i18n}
    >
      <BasicInfo
        t={t}
        basicInfo={basicInfo}
        handleEdit={() => setModal({ type: ModalType.BASIC_INFO })}
      />
      <BasicInfoEdit
        t={t}
        basicInfo={basicInfo}
        open={modal.type === ModalType.BASIC_INFO}
        onClose={handleModalClose}
      />
      <ExperienceSection
        t={t}
        gender={basicInfo.gender}
        experiences={experiences}
        handleEdit={(id?: string) => {
          setModal({ type: ModalType.EXPERIENCE, id });
        }}
      />
      <ExperienceEdit
        t={t}
        talent={basicInfo}
        id={modal.type === ModalType.EXPERIENCE ? modal.id : ''}
        experiences={experiences}
        onClose={handleModalClose}
        open={modal.type === ModalType.EXPERIENCE}
      />
      <QualificationSection
        t={t}
        qualifications={qualifications}
        handleEdit={(id?: string) => {
          setModal({ type: ModalType.QUALIFICATION, id });
        }}
      />
      <QualificationEdit
        t={t}
        talent={basicInfo}
        id={modal.type === ModalType.QUALIFICATION ? modal.id : ''}
        qualifications={qualifications}
        onClose={handleModalClose}
        open={modal.type === ModalType.QUALIFICATION}
      />
      <LanguageSection
        t={t}
        languages={languages}
        handleEdit={() => setModal({ type: ModalType.LANGUAGE })}
      />
      <LanguagesEdit
        t={t}
        languages={languages}
        onClose={handleModalClose}
        open={modal.type === ModalType.LANGUAGE}
        talentId={basicInfo.id}
      />
      <OtherSkillsSection
        t={t}
        otherSkills={otherSkills}
        handleEdit={() => setModal({ type: ModalType.OTHERSKILL })}
      />
      <OtherSkillsEdit
        t={t}
        otherSkills={otherSkills}
        onClose={handleModalClose}
        open={modal.type === ModalType.OTHERSKILL}
        talentId={basicInfo.id}
      />
      <ApprobationsSection
        t={t}
        approbations={approbations}
        handleEdit={() => setModal({ type: ModalType.APPROBATION })}
      />
      <ApprobationsEdit
        t={t}
        approbations={approbations}
        onClose={handleModalClose}
        open={modal.type === ModalType.APPROBATION}
        talentId={basicInfo.id}
      />
      <ProgressIndicator progress={progress} />
      <Button href={`/talents/${id}/settings`}>To Settings</Button>
    </Layout>
  );
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [
//       {
//         params: {
//           id: 'yasbiuycdbucoiuscboiucsiousc!@',
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

ProfilePage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(ProfilePage);
