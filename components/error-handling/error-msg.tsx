import React from 'react';
import { Typography } from '@material-ui/core';

type StandardErrorProps = {
  errorMsg: string;
};

const ErrorMsg = ({ errorMsg }: StandardErrorProps): React.ReactElement => {
  return <Typography>{errorMsg}</Typography>;
};

export default ErrorMsg;
