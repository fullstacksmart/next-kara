// Top level component for profile page
// supply addFItem mutation, e.g. ADD_EXPERIENCE

import { Paper, Box } from '@material-ui/core';
import SectionItem, { ButtonIcon } from 'components/SectionItem';
import useStyles from './Section.styles';
import { SectionProps } from './Section.types';

const Section = ({
  handleAdd,
  children,
  ...props
}: SectionProps): React.ReactElement => {
  const classes = useStyles({ withAddButton: Boolean(handleAdd) });
  const addButton = handleAdd ? (
    <SectionItem onClick={handleAdd} icon={ButtonIcon.add} />
  ) : null;
  return (
    <section>
      <Paper className={classes.Paper} elevation={3} {...props}>
        <Box className={classes.ContentBox}>
          {children}
          {addButton}
        </Box>
      </Paper>
    </section>
  );
};

export default Section;
