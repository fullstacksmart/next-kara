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
  addItem?: () => void;
  children: React.ReactNode;
}

export const Section = ({
  addItem,
  children,
}: SectionProps): React.ReactElement => {
  return (
    <Card>
      <CardContent>{children}</CardContent>
      {addItem && (
        <CardActions disableSpacing className={styles.AddButtonContainer}>
          <IconButton aria-label="add item" onClick={addItem}>
            <AddCircleOutlineIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};
