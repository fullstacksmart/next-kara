import OptionsSelector, {
  OptionsSelectorProps,
} from '../options-selector/OptionsSelector';
import { TFunction } from 'next-i18next';
import { IsoCode, Talent } from '../../lib/types';

export interface CountrySelectorProps extends Partial<OptionsSelectorProps> {
  t: TFunction;
  defaultValue?: IsoCode | 'NONE';
  updateFunction: React.Dispatch<React.SetStateAction<Partial<Talent>>>;
}

const CountrySelector = ({
  t,
  defaultValue = 'NONE',
  updateFunction,
  ...props
}: CountrySelectorProps): React.ReactElement => {
  const isoCodes: IsoCode[] = ['SRB', 'AUT', 'DEU', 'CRO', 'POL'];

  const handleChange = (value: string | undefined): void => {
    if (value !== undefined) {
      const newAddress: IsoCode | 'NONE' =
        value !== '' ? (value as IsoCode) : 'NONE';
      updateFunction((oldValues) => {
        const address = {
          ...oldValues.address,
          isoCode: newAddress,
        };
        return { ...oldValues, address };
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
