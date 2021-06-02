import { FC, FormEventHandler, useState } from 'react';
import { TextField, Button, makeStyles, Box } from '@material-ui/core';

const correctPassword = process.env.NEXT_PUBLIC_PRODUCTION_PASSWORD;

const useStyles = makeStyles({
  formButton: {
    marginLeft: '5rem',
  },
});

const PasswordDialog: FC = () => {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const handleSubmit: FormEventHandler = () => {
    if (value === correctPassword) {
      window.sessionStorage.setItem('canVisit', 'true');
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    setValue(event.target.value);
  };
  return (
    <>
      <h1>This page is not live</h1>
      <h2>You need to enter a password to see this page</h2>
      <form onSubmit={handleSubmit}>
        <Box display="flex">
          <TextField
            id="password"
            label="Password"
            onChange={handleChange}
            type="password"
          ></TextField>
          <Button
            variant="contained"
            className={classes.formButton}
            disabled={!value}
            type="submit"
          >
            submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default PasswordDialog;
