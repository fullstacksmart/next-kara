import { parseWithOptions } from 'date-fns/fp';
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
      types: [
        { value: 'KRAKENHAUS', label: 'KRAKENHAUS' },
        { value: 'PFLEGEHEIM', label: 'PFLEGEHEIM' },
        { value: 'AMBULANTER PFLEGEDIENST', label: 'AMBULANTER_PFLEGEDIENST' },
        { value: 'REHA', label: 'REHA' },
        { value: 'PRAXIS', label: 'PRAXIS' },
      ],
    },
    {
      value: 'MEDICINE',
      label: t('MEDICINE'),
      types: [
        { value: 'KRAKENHAUS', label: 'KRAKENHAUS' },
        { value: 'ARZTPRAXIS', label: 'ARZTPRAXIS' },
        {
          value: 'MEDIZINISCHES FORSCHUNGSINSTITUT',
          label: 'MEDIZINISCHES FORSCHUNGSINSTITUT',
        },
        { value: 'SANATORIUM', label: 'SANATORIUM' },
      ],
    },
    {
      value: 'PERSONNEL_CONSULTING',
      label: t('PERSONNEL CONSULTING'),
      types: [
        { value: 'PERSONALVERMITTLUNG', label: 'SANATORIUM' },
        { value: 'SPRACHSCHULE', label: 'SPRACHSCHULE' },
        { value: 'MIGRATIONSRECH', label: 'MIGRATIONSRECH' },
        { value: 'ARBEITSRECHT', label: 'ARBEITSRECHT' },
        { value: 'SONSTIGE', label: 'SONSTIGE' },
      ],
    },
    {
      value: 'TECHNOLOGY',
      label: t('TECHNOLGY'),
      types: [{ value: 'SONSTIGE', label: 'SONSITEGE' }],
    },
  ];

  const typesList = options.map((item) => item.types);
  console.log(typesList);
  console.log(options);

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
        {...props}
        options={typesList}
        setUpdate={handleChange}
        value={value}
        inputLabelId="type"
        inputLabel={t('components.typeSelector.label')}
      />
    </div>
  );
};
