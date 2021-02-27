import { TFunction } from 'next-i18next';
import { ApprobationStatus } from '../../lib/types';
import { computeNestedValue, getPropArray } from '../../lib/utils/arrays';
import OptionsSelector, {
  OptionsSelectorProps,
} from '../options-selector/OptionsSelector';

interface StateSelectorProps extends Partial<OptionsSelectorProps> {
  t: TFunction;
  updateFunction: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  value?: ApprobationStatus;
  propName: string | string[];
}

export const ApprobationStatusSelector = ({
  t,
  value = ApprobationStatus.IN_PREPARATION,
  updateFunction,
  propName,
  ...props
}: StateSelectorProps): React.ReactElement => {
  const handleChange = (value: string): void => {
    const [propArray] = getPropArray(propName);
    updateFunction((oldValues) => {
      return {
        ...oldValues,
        ...computeNestedValue(oldValues, propArray, value),
      };
    });
  };

  const statusStrings = Object.keys(ApprobationStatus).filter(
    (item) => !Number.isNaN(parseInt(item)),
  ) as (keyof typeof ApprobationStatus)[];

  const options = statusStrings.map((key) => ({
    value: key,
    label: t(`approbation.status.${ApprobationStatus[key]}`),
  }));

  return (
    <OptionsSelector
      {...props}
      options={options}
      setUpdate={handleChange}
      value={value}
      inputLabelId="status"
      inputLabel={t('components.statusSelector.label')}
    />
  );
};
