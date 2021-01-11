import { Typography } from '@material-ui/core';
import { SectionItem } from '../section-item/SectionItem';
import { Section } from '../section/Section';
import { CheckedTitle } from '../checked-title/CheckedTitle';
import styles from './BasicInfo.module.css';
import { Talent, Employer } from '../../lib/types';
import { TFunction } from 'next-i18next';
import { getDisplayAddress } from '../../lib/utils/strings';

interface BasicProps {
  handleEdit: () => void;
  t: TFunction;
}

interface BasicInfoTalent extends BasicProps {
  basicInfo: Partial<Talent>;
}

interface BasicInfoEmployer extends BasicProps {
  basicInfoEmployer: Partial<Employer>;
}

type BasicInfoProps = BasicInfoTalent | BasicInfoEmployer;

export const BasicInfo = ({
  t,
  basicInfo,
  basicInfoEmployer,
  handleEdit,
}: BasicInfoProps): React.ReactElement => {
  let basicInfoComponent;
  if (basicInfo) {
    basicInfoComponent = (
      <SectionItem handleEdit={handleEdit}>
        <div className={styles.HeaderContainer}>
          {basicInfo.profilePic && (
            <img
              className={styles.ProfilePic}
              src={basicInfo.profilePic}
              alt={basicInfo.fullName}
            />
          )}
          <div className={styles.Details}>
            <CheckedTitle
              title={basicInfo.fullName}
              done={basicInfo.isBasicInfoComplete}
            />
            <Typography variant="h4">
              {t(`profession.${basicInfo.profession}-${basicInfo.gender}`)}
            </Typography>
            <Typography variant="h4">
              {getDisplayAddress(basicInfo.address, t)}
            </Typography>
          </div>
        </div>
        <div className={styles.Description}>
          <Typography variant="body1">{basicInfo.description}</Typography>
        </div>
      </SectionItem>
    );
  } else if (basicInfoEmployer) {
    basicInfoComponent = (
      <SectionItem handleEdit={handleEdit}>
        <div className={styles.HeaderContainer}>
          {basicInfoEmployer.profilePic && (
            <img
              className={styles.ProfilePic}
              src={basicInfoEmployer.profilePic}
              alt={basicInfoEmployer.companyName}
            />
          )}
          <div className={styles.Details}>
            <CheckedTitle
              title={basicInfoEmployer.companyName}
              done={basicInfoEmployer.isBasicInfoComplete}
            />
            <Typography variant="h4">
              {getDisplayAddress(basicInfoEmployer.address)}
            </Typography>
            <Typography variant="h6">{basicInfoEmployer.website}</Typography>
            <Typography variant="h6">
              Representative - {basicInfoEmployer.fullName}
            </Typography>
          </div>
        </div>
        <div className={styles.Description}>
          <Typography variant="body1">
            {basicInfoEmployer.description}
          </Typography>
        </div>
      </SectionItem>
    );
  }

  return (
    <div className={styles.BasicInfo}>
      <Section>{basicInfoComponent}</Section>
    </div>
  );
};
