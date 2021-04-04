// Goes into sections. Has Edit buttons that align with section's add button.
// Supply edit button mutation

import { Edit } from '@material-ui/icons';
import { Box, IconButton } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import useStyles from './SectionItem.styles';
import { ButtonIcon, SectionItemProps } from './SectionItem.types';

export const SectionItem = ({
  onClick,
  icon = ButtonIcon.edit,
  children,
}: SectionItemProps): React.ReactElement => {
  const classes = useStyles();
  const button = (
    <IconButton onClick={onClick}>
      {icon === ButtonIcon.edit ? (
        <Edit />
      ) : icon === ButtonIcon.add ? (
        <AddCircleOutlineIcon />
      ) : null}
    </IconButton>
  );
  return (
    <Box className={classes.SectionItem}>
      <Box className={classes.ContentContainer}>{children}</Box>
      <Box className={classes.ButtonContainer}>{button}</Box>
    </Box>
  );
};

export default SectionItem;
