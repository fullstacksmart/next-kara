// Goes into sections. Has Edit buttons that align with section's add button.
// Supply edit button mutation

import { Edit } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import styles from './SectionItem.module.css';

interface SectionItemProps {
  handleEdit?: () => void;
  children: React.ReactNode;
}

export const SectionItem = ({
  handleEdit,
  children,
}: SectionItemProps): React.ReactElement => {
  return (
    <div className={styles.SectionItem}>
      <div className={styles.ButtonContainer}>
        {handleEdit && (
          <IconButton onClick={handleEdit}>
            <Edit />
          </IconButton>
        )}
      </div>
      <div className={styles.ContentContainer}>{children}</div>
    </div>
  );
};
