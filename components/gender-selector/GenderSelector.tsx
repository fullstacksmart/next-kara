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
  value = Gender.OTHER,
  updateFunction,
  ...props
}: GenderSelectorProps): React.ReactElement => {
  const handleChange = (value: string): void => {
    updateFunction((oldValues) => ({
      ...oldValues,
      gender: parseInt(value),
    }));
  };
  const options = [
    {
      value: Gender.OTHER.toString(),
      label: t('gender.OTHER'),
    },
    {
      value: Gender.FEMALE.toString(),
      label: t('gender.FEMALE'),
    },
    {
      value: Gender.MALE.toString(),
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
