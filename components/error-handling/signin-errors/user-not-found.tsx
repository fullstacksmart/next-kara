import React from 'react';
import { TFunction } from 'next-i18next';
import { withTranslation } from 'i18n.config';

type UserNotFoundProps = {
  t: TFunction;
};

const UserNotFound = ({ t }: UserNotFoundProps): React.ReactElement => {
  const errorMsg = t('errors.auth/user-not-found');
  console.log('user not found error');

  return (
    <div>
      <div>User not found error</div>
      <div>{errorMsg}</div>
    </div>
  );
};

export default withTranslation('common')(UserNotFound);
