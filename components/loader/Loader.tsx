import useStyles from './LoaderStyles';
import { Box, Container } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
// import k_gradient from '../../public/static/k_gradient.png';

const Loader = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <img className={classes.logo} src="/k_gradient.png" alt="k logo" />

      <CircularProgress className={classes.circularLoader} size={100} />
    </Box>
  );
};

export default Loader;
