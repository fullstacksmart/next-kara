import { Grid, IconButton, makeStyles } from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';

interface CompactListItemProps extends React.PropsWithChildren<unknown> {
  handleDelete?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}

const useStyles = makeStyles({
  deleteContainer: {
    paddingTop: '2rem',
  },
  button: {
    marginRight: '-2rem',
  },
});

export const CompactListItem = ({
  children,
  handleDelete,
}: CompactListItemProps): React.ReactElement => {
  const classes = useStyles();
  return (
    <Grid container alignItems="flex-start">
      <Grid xs={10} item>
        {children}
      </Grid>
      <Grid item xs={2}>
        <Grid container justify="flex-end" className={classes.deleteContainer}>
          <IconButton className={classes.button} onClick={handleDelete}>
            <DeleteOutline />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};
