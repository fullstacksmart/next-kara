import Carousel from 'react-material-ui-carousel';
import { Card, CardMedia } from '@material-ui/core';
import useStyles from './AnimatedPicsStyles';

const AnimatedPics = (): React.ReactElement => {
  const classes = useStyles();

  const slides = [
    { id: 0, src: '/medical001.jpg' },
    { id: 1, src: '/medical002.jpg' },
    { id: 2, src: '/medical003.jpg' },
    { id: 3, src: '/medical004.jpg' },
  ];

  return (
    <Carousel
      interval={5000}
      indicators={false}
      timeout={{ exit: 700 }}
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
