import React from 'react';
import { Typography } from '@material-ui/core';

type StandardErrorProps = {
  errorMsg: string;
};

const StandardError = ({
  errorMsg,
}: StandardErrorProps): React.ReactElement => {
  console.log('standard error');
  return <Typography>{errorMsg}</Typography>;
};

export default StandardError;
