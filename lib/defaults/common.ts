import { Address, FullName, Gender, SignupFormValues } from 'lib/types';
import { UserType } from 'lib/types/common';

export const defaultNameInput: FullName = {
  lastName: '',
};

export const defaultAddress: Address = {};

export const defaultSignupFormValues: SignupFormValues = {
  name: {
    lastName: '',
  },
  gender: Gender.OTHER,
  email: '',
  password: '',
  type: UserType.TALENT,
};
