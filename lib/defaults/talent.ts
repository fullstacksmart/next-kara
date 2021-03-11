import { Gender } from 'lib/types';
import { Profession, TalentInput } from 'lib/types/talent';
import { defaultAddress, defaultNameInput } from './common';

export const defaultTalentInput: TalentInput = {
  id: '',
  email: '',
  gender: Gender.OTHER,
  name: defaultNameInput,
  profilePic: '',
  profession: Profession.NURSE,
  address: defaultAddress,
  description: '',
  experiences: [],
  qualifications: [],
  approbations: [],
  documents: [],
  languages: [],
  otherSkills: [],
};
