import OptionsSelector, {
  OptionsSelectorProps,
} from '../options-selector/OptionsSelector';
import { TFunction } from 'next-i18next';
import { IsoCode, Talent } from '../../lib/types';
import { computeNestedValue } from '../../lib/utils/arrays';

export interface CountrySelectorProps extends Partial<OptionsSelectorProps> {
  t: TFunction;
  propName?: string | string[];
  defaultValue?: IsoCode | 'NONE';
  updateFunction: React.Dispatch<React.SetStateAction<Partial<Talent>>>;
}

const CountrySelector = ({
  t,
  defaultValue = 'NONE',
  updateFunction,
  propName = ['address', 'isoCode'],
  ...props
}: CountrySelectorProps): React.ReactElement => {
  const isoCodes: IsoCode[] = ['SRB', 'AUT', 'DEU', 'CRO', 'POL'];
  const propNameArray = Array.isArray(propName) ? propName : [propName];

  const handleChange = (value: string | undefined): void => {
    if (value !== undefined) {
      const newAddress: IsoCode | 'NONE' =
        value !== '' ? (value as IsoCode) : 'NONE';
      updateFunction((oldValues) => {
        return {
          ...oldValues,
          ...computeNestedValue(oldValues, propNameArray, newAddress),
        };
      });
    }
  };

  const options = isoCodes.map((code) => {
    return {
      value: code,
      label: t(`iso.${code}`),
    };
  });

  const enrichedOptions = [{ value: 'NONE', label: '' }, ...options];

  return (
    <OptionsSelector
      {...props}
      defaultValue={defaultValue}
      options={enrichedOptions}
      setUpdate={handleChange}
      inputLabelId="country-selector-label"
      inputLabel={t('components.countrySelector.label')}
    />
  );
};

export default CountrySelector;
