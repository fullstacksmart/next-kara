import { Typography } from '@material-ui/core';
import { Section, SectionItem, CheckedTitle } from '../';
import styles from './BasicInfo.module.css';
import { Gender, Profession, Talent } from '../../lib/types';
import { TFunction } from 'next-i18next';
import { getDisplayAddress } from '../../lib/utils/strings';
import { defaultProfession } from 'lib/defaults/talent';
import { defaultGender } from 'lib/defaults/common';

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
        <SectionItem onClick={handleEdit}>
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
                {t(
                  `profession.${
                    Profession[basicInfo.profession || defaultProfession]
                  }-${Gender[basicInfo.gender || defaultGender]}`,
                )}
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
