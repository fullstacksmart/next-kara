import { TFunction } from 'next-i18next';
import {
  OptionsRadio,
  OptionsRadioOption,
  OptionsRadioProps,
} from '../options-radio/OptionsRadio';
import { Gender, Profession, Talent } from '../../lib/types';

export interface GenderRadioProps extends Partial<OptionsRadioProps> {
  updateFunction: React.Dispatch<React.SetStateAction<Partial<Talent>>>;
  t: TFunction;
  input?: Profession;
  gender?: Gender;
}

export const ProfessionRadio = ({
  t,
  updateFunction,
  input,
  gender = 'OTHER',
}: GenderRadioProps): React.ReactElement => {
  const options: OptionsRadioOption[] = [
    {
      value: 'NURSE',
      label: t(`profession.NURSE-${gender}`),
      labelPlacement: 'top',
    },
    {
      value: 'DOCTOR',
      label: t(`profession.DOCTOR-${gender}`),
      labelPlacement: 'top',
    },
    {
      value: 'OTHER_MEDICAL',
      label: t(`profession.OTHER_MEDICAL-${gender}`),
      labelPlacement: 'top',
    },
  ];
  return (
    <OptionsRadio
      row
      options={options}
      label=""
      ariaLabel="gender"
      name="gender"
      defaultValue={input}
      setUpdate={(value) => {
        const profession = value as Profession;
        updateFunction((oldValues) => {
          return { ...oldValues, profession } as Partial<Talent>;
        });
      }}
    />
  );
};
