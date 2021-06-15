import Unauthorized from 'components/PageComponents/Unauthorized';
import { useAuth } from 'hooks/useAuth';
import { UserGroup } from 'lib/types';
import { ContextUserType } from 'lib/types/auth';
import { useRouter } from 'next/router';
import { Loader } from 'components';

const editorIds = ['Kx00tfTGy6ei8olseVTJc988f992'];

const isAuthorizedToView = (user: ContextUserType, id: string): boolean => {
  return (
    user.id === id ||
    user.group === UserGroup.Editor ||
    user.group === UserGroup.Admin ||
    editorIds.includes(user.id)
  );
};

const isAuthorizedToEdit = (user: ContextUserType, id: string): boolean => {
  return (
    isAuthorizedToView(user, id) &&
    (user.id === id ||
      user.group === UserGroup.Admin ||
      editorIds.includes(user.id))
  );
};

const withAuthorization = <Props extends object>( //eslint-disable-line
  Page: React.ComponentType<Props & { editable: boolean }>,
): React.ComponentType<Props> =>
  function PageWithAuthorization(props) {
    const { user, authStateChangeFinished } = useAuth();
    const id = useRouter().query.id as string;

    if (!authStateChangeFinished) return <Loader />;

    if (!user || !user.id) {
      return <Unauthorized />;
    }

    if (!isAuthorizedToView(user, id)) {
      return <Unauthorized />;
    }

    if (isAuthorizedToEdit(user, id)) {
      return <Page editable={true} {...props} />;
    }

    // user is logged in, authorized to view, but not authorized to edit
    return <Page editable={false} {...props} />;
  };

export default withAuthorization;
