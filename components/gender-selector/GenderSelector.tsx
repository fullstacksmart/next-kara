import { TFunction } from 'next-i18next';
import { Gender, Talent } from '../../lib/types';
import OptionsSelector, {
  OptionsSelectorProps,
} from '../options-selector/OptionsSelector';

interface GenderSelectorProps extends Partial<OptionsSelectorProps> {
  t: TFunction;
  updateFunction: React.Dispatch<React.SetStateAction<Partial<Talent>>>;
  value?: Gender;
}

export const GenderSelector = ({
  t,
  value = 'OTHER',
  updateFunction,
  ...props
}: GenderSelectorProps): React.ReactElement => {
  const handleChange = (value: string): void => {
    const gender: Gender = value as Gender;
    updateFunction((oldValues) => ({
      ...oldValues,
      gender,
    }));
  };
  const options = [
    {
      value: 'OTHER',
      label: t('gender.OTHER'),
    },
    {
      value: 'FEMALE',
      label: t('gender.FEMALE'),
    },
    {
      value: 'MALE',
      label: t('gender.MALE'),
    },
  ];
  return (
    <OptionsSelector
      {...props}
      options={options}
      setUpdate={handleChange}
      value={value}
      inputLabelId="gender"
      inputLabel={t('components.genderSelector.label')}
    />
  );
};
