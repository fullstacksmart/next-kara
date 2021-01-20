import { TFunction } from 'next-i18next';
import { Employer, Industry } from '../../lib/types';
import OptionsSelector, {
  OptionsSelectorProps,
} from '../options-selector/OptionsSelector';

interface IndustrySelectorProps extends Partial<OptionsSelectorProps> {
  t: TFunction;
  updateFunction: React.Dispatch<React.SetStateAction<Partial<Employer>>>;
  value?: Industry;
}

export const IndustrySelector = ({
  t,
  value = 'CARE',
  updateFunction,
  ...props
}: IndustrySelectorProps): React.ReactElement => {
  const handleChange = (value: string): void => {
    const industry: Industry = value as Industry;
    updateFunction((oldValues) => ({
      ...oldValues,
      industry,
    }));
  };
  const options = [
    {
      value: 'CARE',
      label: t('CARE'),
    },
    {
      value: 'MEDICINE',
      label: t('MEDICINE'),
    },
    {
      value: 'PERSONNEL_CONSULTING',
      label: t('PERSONNEL_CONSULTING'),
    },
    {
      value: 'TECHNOLOGY',
      label: t('TECHNOLGY'),
    },
  ];
  return (
    <OptionsSelector
      {...props}
      options={options}
      setUpdate={handleChange}
      value={value}
      inputLabelId="industry"
      inputLabel={t('components.industrySelector.label')}
    />
  );
};
