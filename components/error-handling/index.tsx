import React from 'react';
import { FirebaseError } from 'lib/types/auth';
import { TFunction } from 'next-i18next';
import ErrorMsg from './error-msg';
import errorMap from 'lib/utils/error-maps';
import { withTranslation } from 'i18n.config';

type ErrorProps = {
  t: TFunction;
  error: FirebaseError;
};

const Error = ({ t, error }: ErrorProps): React.ReactElement => {
  const { code, message } = error;

  const specificErrorMsg = errorMap.get(code);

  const errorMsg = specificErrorMsg ? t(specificErrorMsg) : message;

  return <ErrorMsg errorMsg={errorMsg} />;
};

export default withTranslation('common')(Error);
