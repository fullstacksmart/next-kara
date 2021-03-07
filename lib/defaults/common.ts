import { Address, FullName, Gender, SignupFormValues } from 'lib/types';
import { UserType } from 'lib/types/common';

export const defaultNameInput: FullName = {
  lastName: '',
};
export const defaultGender = Gender.OTHER;

export const defaultUserType = UserType.TALENT;

export const defaultAddress: Address = {};

export const defaultSignupFormValues: SignupFormValues = {
  name: {
    lastName: '',
  },
  gender: defaultGender,
  email: '',
  password: '',
  type: defaultUserType,
};
