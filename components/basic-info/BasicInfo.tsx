import { Typography } from '@material-ui/core';
import { SectionItem } from '../section-item/SectionItem';
import { Section } from '../section/Section';
import { CheckedTitle } from '../checked-title/CheckedTitle';
import styles from './BasicInfo.module.css';
import { Talent } from '../../lib/types';
import { TFunction } from 'next-i18next';
import { displayAddress } from '../../lib/utils/strings';

interface BasicInfoProps {
  basicInfo: Partial<Talent>;
  done: boolean;
  handleEdit: () => void;
  t: TFunction;
}

export const BasicInfo = ({
  t,
  basicInfo,
  done,
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
              <CheckedTitle title={basicInfo.fullName} done={done} />
              <Typography variant="h4">
                {t(`profession.${basicInfo.profession}-${basicInfo.gender}`)}
              </Typography>
              <Typography variant="h4">
                {displayAddress(basicInfo.address, t)}
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
