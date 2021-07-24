import React from 'react';
import { FirebaseError } from 'lib/types/auth';
import ErrorMsg from './error-msg';
import errorMap from 'lib/utils/error-maps';
import { useTranslation } from 'react-i18next';

type ErrorProps = {
  error: FirebaseError;
};

const Error = ({ error }: ErrorProps): React.ReactElement => {
  const { t } = useTranslation('common');

  const { code, message } = error;

  const specificErrorMsg = errorMap.get(code);

  const errorMsg = specificErrorMsg ? t(specificErrorMsg) : message;

  return <ErrorMsg errorMsg={errorMsg} />;
};

export default Error;
