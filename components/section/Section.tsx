// Top level component for profile page
// supply addFItem mutation, e.g. ADD_EXPERIENCE

import {
  Card,
  CardContent,
  CardProps,
  IconButton,
  CardActions,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import styles from './Section.module.css';
interface SectionProps extends CardProps {
  handleAdd?: () => void;
  children: React.ReactNode;
}

export const Section = ({
  handleAdd,
  children,
}: SectionProps): React.ReactElement => {
  return (
    <Card className={styles.Card}>
      <CardContent className={styles.ContentContainer}>{children}</CardContent>
      {handleAdd && (
        <CardActions disableSpacing className={styles.AddButtonContainer}>
          <IconButton aria-label="add item" onClick={handleAdd}>
            <AddCircleOutlineIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};
