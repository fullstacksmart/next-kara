import { UserType } from 'lib/types/common';
import { useRouter } from 'next/router';

type UseRedirectToProfileType = ({
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

const useRedirectToProfile: UseRedirectToProfileType = ({ userType, id }) => {
  const router = useRouter();

  const profileBasePath = userTypeToProfilePathMap.get(userType);

  const path = `${profileBasePath}/${id}`;

  router.push(path);
};

export default useRedirectToProfile;
