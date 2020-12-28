import { Typography } from '@material-ui/core';
import { SectionItem } from '../section-item/SectionItem';
import { Section } from '../section/Section';
import { CheckedTitle } from '../checked-title/CheckedTitle';
import styles from './BasicInfo.module.css';
import { BasicInfoInput } from '../../lib/types';

interface BasicInfoProps {
  basicInfo: BasicInfoInput;
  done: boolean;
  handleEdit: () => void;
}

export const BasicInfo = ({
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
              <Typography variant="h4">{basicInfo.profession}</Typography>
              <Typography variant="h4">{basicInfo.displayAddress}</Typography>
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
