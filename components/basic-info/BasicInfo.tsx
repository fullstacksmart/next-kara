import { Typography } from '@material-ui/core';
import { Section, SectionItem, CheckedTitle } from '../';
import styles from './BasicInfo.module.css';
import { Talent } from '../../lib/types';
import { TFunction } from 'next-i18next';
import { getDisplayAddress } from '../../lib/utils/strings';

interface BasicInfoProps {
  basicInfo: Partial<Talent>;
  handleEdit: () => void;
  t: TFunction;
}

export const BasicInfo = ({
  t,
  basicInfo,
  handleEdit,
}: BasicInfoProps): React.ReactElement => {
  return (
    <div className={styles.BasicInfo}>
      <Section>
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
      </Section>
    </div>
  );
};
