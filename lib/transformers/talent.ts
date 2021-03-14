import { defaultTalentInput } from 'lib/defaults/talent';
import { SignupFormValues, TalentInput } from 'lib/types';

export const transformSignupFormValuesToTalentInput = (
  newTalent: SignupFormValues,
): TalentInput => {
  const cleanInfo: Partial<SignupFormValues> = { ...newTalent };
  delete cleanInfo.password;
  delete cleanInfo.type;
  if ('company' in cleanInfo) delete cleanInfo.company;
  return {
    ...defaultTalentInput,
    ...cleanInfo,
  };
};
