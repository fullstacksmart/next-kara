import Carousel from 'react-material-ui-carousel';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    animationContainer: {
      borderRadius: '150px 0px 0px 150px',
      boxShadow: 'none',
    },
    imgDimensions: {
      width: '600px',
      height: '350px',
    },
  }),
);

const slides = [
  { id: 0, src: '/medical001.jpg' },
  { id: 1, src: '/medical002.jpg' },
  { id: 2, src: '/medical003.jpg' },
  { id: 3, src: '/medical004.jpg' },
];

const AnimatedPics = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <Carousel
      interval={5000}
      indicators={false}
      timeout={400}
      navButtonsAlwaysInvisible
    >
      {slides.map((item) => {
        return (
          <Card key={item.id} className={classes.animationContainer}>
            <CardMedia
              component="div"
              image={item.src}
              className={classes.imgDimensions}
            />
          </Card>
        );
      })}
    </Carousel>
  );
};

export default AnimatedPics;
