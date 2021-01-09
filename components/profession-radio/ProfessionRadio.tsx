import { TFunction } from 'next-i18next';
import {
  OptionsRadio,
  OptionsRadioOption,
  OptionsRadioProps,
} from '../options-radio/OptionsRadio';
import { Gender, Profession } from '../../lib/types';

export interface GenderRadioProps extends Partial<OptionsRadioProps> {
  updateFunction: React.Dispatch<React.SetStateAction<object>>; //eslint-disable-line @typescript-eslint/ban-types
  t: TFunction;
  input?: Profession;
  gender?: Gender;
  isExtended?: boolean;
  propName?: string;
}

export const ProfessionRadio = ({
  t,
  updateFunction,
  input,
  gender = 'OTHER',
  isExtended = false,
  propName = 'profession',
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
  if (isExtended) {
    options.push({
      value: 'OTHER_NON_MEDICAL',
      label: t(`profession.OTHER_NON_MEDICAL-${gender}`),
      labelPlacement: 'top',
    });
  }
  return (
    <OptionsRadio
      row
      options={options}
      label=""
      ariaLabel="gender"
      name="gender"
      defaultValue={input}
      setUpdate={(value) => {
        updateFunction((oldValues) => {
          return { ...oldValues, [propName]: value };
        });
      }}
    />
  );
};
