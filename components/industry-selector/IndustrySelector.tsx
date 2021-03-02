import { useState } from 'react';
import { parseWithOptions } from 'date-fns/fp';
import { TFunction } from 'next-i18next';
import { Employer, Industry, Branch } from '../../lib/types';
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
  type = 'HOSPITAL',
  updateFunction,
  ...props
}: IndustrySelectorProps): React.ReactElement => {
  const [industryType, setIndustryType] = useState('CARE');

  const handleChange = (value: string): void => {
    const industry: Industry = value as Industry;
    const branch: Branch = type as Branch;
    setIndustryType(industry);
    updateFunction((oldValues) => ({
      ...oldValues,
      industry,
      branch,
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
      label: t('PERSONNEL CONSULTING'),
    },
    {
      value: 'TECHNOLOGY',
      label: t('TECHNOLGY'),
    },
  ];

  const branchList = {
    CARE: [
      { branch: 'HOSPITAL', label: 'HOSPITAL' },
      { branch: 'NURSING_HOME', label: 'NURSING HOME' },
      { branch: 'AMBULATORY_CARE_SERVICE', label: 'AMBULATORY CARE SERVICE' },
      { branch: 'REHAB', label: 'REHAB' },
      { branch: 'PRACTICE', label: 'PRACTICE' },
    ],
    MEDICINE: [
      { branch: 'HOSPITAL', label: 'HOSPITAL' },
      { branch: 'DOCTORS_OFICCE', label: 'DOCTORS OFICCE' },
      {
        branch: 'MEDICAL_RESEARCH_INSTITUTE',
        label: 'MEDICAL RESEARCH INSTITUTE',
      },
      { branch: 'SANATORIUM', label: 'SANATORIUM' },
    ],
    PERSONNEL_CONSULTING: [
      { branch: 'RECRUITMENT', label: 'RECRUITMENT' },
      { branch: 'LANGUAGE_SCHOOL', label: 'LANGUAGE SCHOOL' },
      { branch: 'MIGRATION_LAW', label: 'MIGRATION LAW' },
      { branch: 'EMPLOYMENT_LAW', label: 'EMPLOYMENT LAW' },
      { branch: 'OTHER', label: 'OTHER' },
    ],
    TECHNOLOGY: [{ branch: 'OTHER', label: 'OTHER' }],
  };

  return (
    <div>
      <OptionsSelector
        {...props}
        options={options}
        setUpdate={handleChange}
        value={value}
        inputLabelId="industry"
        inputLabel={t('components.industrySelector.label')}
      />
      <OptionsSelector
        options={branchList[industryType]}
        setUpdate={handleChange}
        value={value}
        inputLabelId="branch"
        inputLabel={t('components.branchSelector.label')}
      />
    </div>
  );
};
