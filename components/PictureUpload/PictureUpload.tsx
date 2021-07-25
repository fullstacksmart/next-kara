import { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
  },
  picture: {
    backgroundColor: 'rgb(255, 255, 255)',
    border: '2px solid rgba(211, 220, 225, 1)',
    borderRadius: '50%',
    height: '100%',
    width: '100%',
  },
});

const PictureUpload: FC = () => {
  const classes = useStyles();
  //   const [value, setValue] = useState('');

  return (
    <div className={classes.root}>
      <input
        type="image"
        id="profile-picture"
        alt="Profile Picture"
        src=""
        className={classes.picture}
      ></input>
    </div>
  );
};

export default PictureUpload;
