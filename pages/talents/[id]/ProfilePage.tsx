import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { Grid, Hidden } from '@material-ui/core';
import {
  Approbation,
  ApprobationStatus,
  DbApprobation,
  DbExperience,
  DbSkill,
  Experience,
  FederalState,
  Gender,
  ModalType,
  PageProps,
  Profession,
  Qualification,
  Skill,
  SkillLevel,
} from 'lib/types';
import { withTranslation } from 'i18n.config';
import { useState, useEffect } from 'react';
import {
  BasicInfo,
  BasicInfoEdit,
  ExperienceSection,
  ExperienceEdit,
  QualificationSection,
  QualificationEdit,
  OtherSkillsSection,
  LanguageSection,
  LanguagesEdit,
  OtherSkillsEdit,
  ApprobationsSection,
  ApprobationsEdit,
  ProgressIndicator,
  Loader,
} from 'components';
import useStyles from './ProfilePage.styles';
import { getTitleString } from 'lib/utils/strings';
import { layoutTitleVar, layoutHeadingVar } from 'apollo/cache';
import withAuthorization from 'hocs/withAuthorization';

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

const ProfilePage = ({
  t,
  editable,
}: PageProps & { editable: boolean }): React.ReactElement => {
  const classes = useStyles();
  const id = useRouter().query.id;
  const { data, loading, error } = useQuery(GET_ALL_INFO, {
    variables: {
      id,
    },
  });
  const [modal, setModal] = useState<{ type: ModalType; id?: string }>({
    type: ModalType.NONE,
  });
  console.log(editable); // eslint-disable-line

  useEffect(() => {
    if (data) {
      const title = getTitleString(
        `profile | ${data.getTalentById.basicInfo.fullName}`,
      );
      const heading = `${t('pages.profile.greeting')}, ${
        data.getTalentById.basicInfo.name.firstName
      }!`;
      layoutTitleVar(title);
      layoutHeadingVar(heading);
    }
    return () => {
      layoutTitleVar('');
      layoutHeadingVar('');
    };
  }, [data, t]);

  if (loading) return <Loader />;
  if (error) {
    if (error.message.startsWith('404')) return <h1>insert 404 page here</h1>;
    return <h1>Error: {error.message}</h1>;
  }

  const dbBasicInfo = data?.getTalentById.basicInfo;
  const basicInfo = {
    ...dbBasicInfo,
    profession: Profession[dbBasicInfo.profession as keyof typeof Profession],
    gender: Gender[dbBasicInfo.gender as keyof typeof Gender],
  };

  const experiences: Experience[] = data.getTalentById.experiences.map(
    (experience: DbExperience) => ({
      ...experience,
      lineOfWork: Profession[experience.lineOfWork],
    }),
  );
  const qualifications: Qualification[] = data.getTalentById.qualifications;
  const languages: Skill[] = data.getTalentById.languages.map(
    (language: DbSkill) => {
      return { ...language, level: SkillLevel[language.level] };
    },
  );
  const otherSkills: Skill[] = data.getTalentById.otherSkills.map(
    (otherSkill: DbSkill) => {
      return { ...otherSkill, level: SkillLevel[otherSkill.level] };
    },
  );
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
    <>
      <Grid container spacing={3} className={classes.OuterContainer}>
        <Grid item md={7} xs={12}>
          <BasicInfo
            t={t}
            basicInfo={basicInfo}
            handleEdit={() => setModal({ type: ModalType.BASIC_INFO })}
          />
          <ExperienceSection
            t={t}
            gender={basicInfo.gender}
            experiences={experiences}
            handleEdit={(id?: string) => {
              setModal({ type: ModalType.EXPERIENCE, id });
            }}
          />
          <QualificationSection
            t={t}
            qualifications={qualifications}
            handleEdit={(id?: string) => {
              setModal({ type: ModalType.QUALIFICATION, id });
            }}
          />
        </Grid>
        <Grid item md={5} xs={12}>
          <Hidden xsDown>
            <ProgressIndicator progress={progress} />
          </Hidden>
          <LanguageSection
            t={t}
            languages={languages}
            handleEdit={() => setModal({ type: ModalType.LANGUAGE })}
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
          <Hidden mdUp>
            <ProgressIndicator progress={progress} />
          </Hidden>
        </Grid>
      </Grid>
      <BasicInfoEdit
        t={t}
        basicInfo={basicInfo}
        open={modal.type === ModalType.BASIC_INFO}
        onClose={handleModalClose}
      />
      <ExperienceEdit
        t={t}
        talent={basicInfo}
        id={modal.type === ModalType.EXPERIENCE ? modal.id : ''}
        experiences={experiences}
        onClose={handleModalClose}
        open={modal.type === ModalType.EXPERIENCE}
      />
      <QualificationEdit
        t={t}
        talent={basicInfo}
        id={modal.type === ModalType.QUALIFICATION ? modal.id : ''}
        qualifications={qualifications}
        onClose={handleModalClose}
        open={modal.type === ModalType.QUALIFICATION}
      />
      <LanguagesEdit
        t={t}
        languages={languages}
        onClose={handleModalClose}
        open={modal.type === ModalType.LANGUAGE}
        talentId={basicInfo.id}
      />
      <ApprobationsEdit
        t={t}
        approbations={approbations}
        onClose={handleModalClose}
        open={modal.type === ModalType.APPROBATION}
        talentId={basicInfo.id}
      />
    </>
  );
};

export default withTranslation('common')(withAuthorization(ProfilePage));
