import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from '@material-ui/core';
import useStyles from './LandingCardsStyles';

const LandingCards = (): React.ReactElement => {
  const classes = useStyles();

  const content = [
    {
      id: 1,
      title: 'Arbeitgeber in Deutschland finden',
      image: '/card01.jpg',
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem inventore veritatis et quasi architecto beatae.',
    },
    {
      id: 2,
      title: 'Die anerkennung dein Ausbildung',
      image: '/card02.jpg',
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem inventore veritatis et quasi architecto beatae.',
    },
    {
      id: 3,
      title: 'Dein start in Deutschland',
      image: '/card03.jpg',
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem inventore veritatis et quasi architecto beatae.',
    },
  ];

  return (
    <Grid container className={classes.cardsContainer}>
      {content.map((el) => {
        return (
          <Grid key={el.id} item lg={3}>
            <Card className={classes.card}>
              <CardActionArea className={classes.actionArea}>
                <CardContent>
                  <Typography variant="h6" className={classes.cardTitle}>
                    {el.title}
                  </Typography>
                </CardContent>
                <div className={classes.imageContainer}>
                  <CardMedia className={classes.cardImage} image={el.image} />
                </div>
                <CardContent>
                  <Typography
                    variant="body1"
                    className={classes.cardDescription}
                  >
                    {el.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default LandingCards;
