import OptionsSelector, {
  OptionsSelectorProps,
} from '../options-selector/OptionsSelector';
import { TFunction } from 'next-i18next';
import { IsoCode, Talent } from '../../lib/types';
import { computeNestedValue } from '../../lib/utils/arrays';

export interface CountrySelectorProps extends Partial<OptionsSelectorProps> {
  t: TFunction;
  propName?: string | string[];
  value?: IsoCode | null;
  updateFunction: React.Dispatch<React.SetStateAction<Partial<Talent>>>;
}

const CountrySelector = ({
  t,
  value = null,
  updateFunction,
  propName = ['address', 'isoCode'],
  ...props
}: CountrySelectorProps): React.ReactElement => {
  const isoCodes: IsoCode[] = ['SRB', 'AUT', 'DEU', 'CRO', 'POL'];
  const propNameArray = Array.isArray(propName) ? propName : [propName];

  const handleChange = (value: string | undefined): void => {
    if (value !== undefined) {
      const newAddress: IsoCode | null =
        value !== '' ? (value as IsoCode) : null;
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
      value={value}
      options={enrichedOptions}
      setUpdate={handleChange}
      inputLabelId="country-selector-label"
      inputLabel={t('components.countrySelector.label')}
    />
  );
};

export default CountrySelector;
