import { Typography } from '@material-ui/core';
import { SectionItem } from '../section-item/SectionItem';
import { Section } from '../section/Section';
import { CheckedTitle } from '../checked-title/CheckedTitle';
import styles from './BasicInfo.module.css';

interface BasicInfoProps {
  profilePicUrl?: string;
  fullName: string;
  profession: string;
  address: string;
  description?: string;
  done: boolean;
  handleEdit: () => void;
}

export const BasicInfo = ({
  profilePicUrl,
  fullName,
  profession,
  address,
  description,
  done,
  handleEdit,
}: BasicInfoProps): React.ReactElement => {
  return (
    <div className={styles.BasicInfo}>
      <Section>
        <SectionItem handleEdit={handleEdit}>
          <div className={styles.HeaderContainer}>
            {profilePicUrl && (
              <img
                className={styles.ProfilePic}
                src={profilePicUrl}
                alt={fullName}
              />
            )}
            <div className={styles.Details}>
              <CheckedTitle title={fullName} done={done} />
              <Typography variant="h4">{profession}</Typography>
              <Typography variant="h4">{address}</Typography>
            </div>
          </div>
          <div className={styles.Description}>
            <Typography variant="body1">{description}</Typography>
          </div>
        </SectionItem>
      </Section>
    </div>
  );
};
