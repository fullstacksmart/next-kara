import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    cardsContainer: {
      justifyContent: 'space-evenly',
    },
    actionArea: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
    },
    card: {
      boxShadow: '15px 20px 24px rgba(0, 0, 0, 0.16)',
      borderRadius: '0px 0px 34px 34px',
      margin: '2rem',
      width: '300px',
      height: '300px',
    },
    imageContainer: {
      display: 'flex',
      width: '100%',
      justifyContent: 'flex-end',
    },
    cardImage: {
      width: '95%',
      height: '95px',
      borderRadius: '15px 0px 0px 15px',
    },
    cardTitle: {
      fontSize: '1rem',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    cardDescription: {
      fontSize: '1rem',
      textAlign: 'center',
    },
  }),
);

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

const LandingCards = (): React.ReactElement => {
  const classes = useStyles();

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
