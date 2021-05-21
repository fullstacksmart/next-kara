import { UserType } from 'lib/types/common';
import { useRouter } from 'next/router';

type RedirectToProfileType = ({
  userType,
  id,
}: {
  userType: UserType;
  id: string;
}) => void;

const userTypeToProfilePathMap = new Map();
userTypeToProfilePathMap.set(UserType.TALENT, '/talents');
userTypeToProfilePathMap.set(UserType.EMPLOYER, '/employers');
userTypeToProfilePathMap.set(UserType.AGENCY, '/agencies');

const useRedirectToProfile = (): {
  redirectToProfile: RedirectToProfileType;
} => {
  const router = useRouter();

  const redirectToProfile: RedirectToProfileType = ({ userType, id }) => {
    const profileBasePath = userTypeToProfilePathMap.get(userType);
    const path = `${profileBasePath}/${id}`;
    router.push(path);
  };

  return {
    redirectToProfile,
  };
};

export default useRedirectToProfile;
