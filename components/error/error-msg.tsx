import React from 'react';
import useStyles from './error-msg-styles';
import { Alert } from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

type StandardErrorProps = {
  errorMsg: string;
};

const ErrorMsg = ({ errorMsg }: StandardErrorProps): React.ReactElement => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {errorMsg}
        </Alert>
      </Collapse>
    </div>
  );
};

export default ErrorMsg;
