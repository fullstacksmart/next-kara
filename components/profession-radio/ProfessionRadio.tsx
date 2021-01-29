import { TFunction } from 'next-i18next';
import {
  OptionsRadio,
  OptionsRadioOption,
  OptionsRadioProps,
} from '../options-radio/OptionsRadio';
import { Gender, Profession } from '../../lib/types';
import { getIntKeys } from '../../lib/utils/objects';

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
  gender = Gender.OTHER,
  isExtended = false,
  propName = 'profession',
}: GenderRadioProps): React.ReactElement => {
  const professions = getIntKeys(Profession);
  const options: OptionsRadioOption[] = professions.map((key) => ({
    value: key.toString(),
    label: t(`profession.${Profession[key]}-${Gender[gender]}`),
    labelPlacement: 'top',
  }));
  if (!isExtended) options.pop();
  return (
    <OptionsRadio
      row
      options={options}
      label=""
      ariaLabel="profession"
      name="profession"
      defaultValue={input?.toString()}
      setUpdate={(value) => {
        updateFunction((oldValues) => {
          return { ...oldValues, [propName]: value };
        });
      }}
    />
  );
};
