import Unauthorized from 'components/PageComponents/Unauthorized';
import { useAuth } from 'hooks/useAuth';
import { UserGroup } from 'lib/types';
import { ContextUserType } from 'lib/types/auth';
import { useRouter } from 'next/router';
import React from 'react';

const isAuthorizedToView = (user: ContextUserType, id: string): boolean => {
  return (
    user.id === id ||
    user.group === UserGroup.Editor ||
    user.group === UserGroup.Admin
  );
};

const isAuthorizedToEdit = (user: ContextUserType, id: string): boolean => {
  return (
    isAuthorizedToView(user, id) &&
    (user.id === id || user.group === UserGroup.Admin)
  );
};

const withAuthorization = <Props extends object>( //eslint-disable-line
  Page: React.ComponentType<Props & { editable: boolean }>,
): React.ComponentType<Props> =>
  function PageWithAuthorization(props) {
    const { user } = useAuth();
    const id = useRouter().query.id as string;

    if (!id) return null;

    if (!user || !isAuthorizedToView(user, id)) {
      return <Unauthorized />;
    }

    if (isAuthorizedToEdit(user, id)) {
      return <Page editable={true} {...props} />;
    }

    // user is logged in, authorized to view, but not authorized to edit
    return <Page editable={false} {...props} />;
  };

export default withAuthorization;
