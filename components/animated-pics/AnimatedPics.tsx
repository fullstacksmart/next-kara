import { useState, useEffect } from 'react';
import { useTransition, animated, config } from 'react-spring';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    animationContainer: {
      position: 'absolute',
      top: '12rem',
      right: '0',
      borderRadius: '150px 0px 0px 150px',
      width: '550px',
      height: '400px',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      willChange: 'opacity',
    },
  }),
);

const slides = [
  { id: 0, src: '/medical01.jpg' },
  { id: 1, src: '/medical02.jpg' },
  { id: 2, src: '/medical03.jpg' },
  { id: 3, src: '/medical04.jpg' },
];

const AnimatedPics = (): React.ReactElement => {
  const classes = useStyles();

  const [index, set] = useState(0);
  const transitions = useTransition(slides[index], (item) => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses,
  });
  useEffect(
    () => void setInterval(() => set((state) => (state + 1) % 4), 5000),
    [],
  );

  return (
    <>
      {transitions.map(({ item, props, key }) => (
        <animated.div
          key={key}
          className={classes.animationContainer}
          style={{
            ...props,
            backgroundImage: `url(${item.src})`,
          }}
        />
      ))}
    </>
  );
};

export default AnimatedPics;
