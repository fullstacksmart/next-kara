import styles from './CheckedTitle.module.css';
import { Typography, TypographyVariant } from '@material-ui/core';
import { DoneOutline } from '@material-ui/icons';

interface CheckedTitleProps {
  title?: string;
  variant?: TypographyVariant;
  done?: boolean;
}

export const CheckedTitle = ({
  title,
  variant = 'h3',
  done,
}: CheckedTitleProps): React.ReactElement => {
  return (
    <Typography variant={variant}>
      {title}
      {done && <DoneOutline className={styles.DoneIcon} />}
    </Typography>
  );
};
