import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    animationContainer: {
      borderRadius: '150px 0px 0px 150px',
      boxShadow: 'none',
    },
    imgDimensions: {
      width: '600px',
      height: '330px',
    },
  }),
);

export default useStyles;
