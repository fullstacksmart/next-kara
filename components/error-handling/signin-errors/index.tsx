import React from 'react';
import { FirebaseError } from 'lib/types/auth';
import { TFunction } from 'next-i18next';
import { Typography } from '@material-ui/core';
import StandardError from '../standard-error';
import UserNotFound from './user-not-found';
import { withTranslation } from 'i18n.config';

type SigninErrorsProps = {
  t: TFunction;
  error: FirebaseError;
};

// const errorMap = new Map([
//   ['auth/user-not-found', t('errors.auth/user-not-found')],
// ]);

const SigninErrors = ({ t, error }: SigninErrorsProps): React.ReactElement => {
  const specificErrorsMap = new Map();
  specificErrorsMap.set('auth/user-not-found', <UserNotFound t={t} />);

  const { code, message } = error;

  const specificError = specificErrorsMap.get(code);

  return specificError ? specificError : <StandardError errorMsg={message} />;
};

export default withTranslation('common')(SigninErrors);
