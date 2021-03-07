import { Profession, TalentInput } from 'lib/types/talent';
import { defaultAddress, defaultGender, defaultNameInput } from './common';

export const defaultProfession = Profession.NURSE;

export const defaultTalentInput: TalentInput = {
  id: '',
  email: '',
  gender: defaultGender,
  name: defaultNameInput,
  profilePic: '',
  profession: defaultProfession,
  address: defaultAddress,
  description: '',
  experiences: [],
  qualifications: [],
  approbations: [],
  documents: [],
  languages: [],
  otherSkills: [],
};
