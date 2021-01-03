import { TFunction } from 'next-i18next';
import {
  OptionsRadio,
  OptionsRadioOption,
  OptionsRadioProps,
} from '../options-radio/OptionsRadio';
import { Gender, Talent } from '../../lib/types';

export interface GenderRadioProps extends Partial<OptionsRadioProps> {
  updateFunction: React.Dispatch<React.SetStateAction<Partial<Talent>>>;
  t: TFunction;
  input?: Gender;
}

export const GenderRadio = ({
  t,
  updateFunction,
  input,
}: GenderRadioProps): React.ReactElement => {
  const options: OptionsRadioOption[] = [
    {
      value: 'FEMALE',
      label: t('gender.FEMALE'),
      labelPlacement: 'bottom',
    },
    {
      value: 'MALE',
      label: t('gender.MALE'),
      labelPlacement: 'bottom',
    },
    {
      value: 'OTHER',
      label: t('gender.OTHER'),
      labelPlacement: 'bottom',
    },
  ];
  return (
    <OptionsRadio
      row
      options={options}
      label=""
      ariaLabel="gender"
      name="gender"
      defaultValue={input || 'OTHER'}
      setUpdate={(value) => {
        const gender = value as Gender;
        updateFunction((oldValues) => {
          return { ...oldValues, gender } as Partial<Talent>;
        });
      }}
    />
  );
};
