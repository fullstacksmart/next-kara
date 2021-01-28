import { TFunction } from 'next-i18next';
import { FederalState } from '../../lib/types';
import { computeNestedValue, getPropArray } from '../../lib/utils/arrays';
import OptionsSelector, {
  OptionsSelectorProps,
} from '../options-selector/OptionsSelector';

interface StateSelectorProps extends Partial<OptionsSelectorProps> {
  t: TFunction;
  updateFunction: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  value?: FederalState;
  propName: string | string[];
}

export const StateSelector = ({
  t,
  value = FederalState.BW,
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

  const stateStrings = Object.keys(FederalState).filter((item) =>
    Number.isNaN(parseInt(item)),
  ) as (keyof typeof FederalState)[];

  const options = stateStrings.map((stateString) => ({
    value: stateString,
    label: t(`states.${stateString}`),
  }));

  return (
    <OptionsSelector
      {...props}
      options={options}
      setUpdate={handleChange}
      value={value}
      inputLabelId="state"
      inputLabel={t('components.stateSelector.label')}
    />
  );
};
