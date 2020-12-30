import {
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  FormControl,
} from '@material-ui/core';
import { TFunction } from 'next-i18next';
import { ChangeEvent, useState } from 'react';
import { IsoCode, Talent } from '../../lib/types';

export interface CountrySelectorProps extends SelectProps {
  t: TFunction;
  value?: IsoCode | null;
  updateFunction: React.Dispatch<React.SetStateAction<Partial<Talent>>>;
}

const CountrySelector = ({
  t,
  value = '',
  updateFunction,
  ...props
}: CountrySelectorProps): React.ReactElement => {
  const [country, setCountry] = useState(value);
  const isoCodes: IsoCode[] = ['SRB', 'AUT', 'DEU', 'CRO', 'POL'];

  const handleChange = (
    e: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ): void => {
    setCountry(e.target.value as IsoCode);
    if (e.target.value !== undefined) {
      const newAddress =
        e.target.value !== '' ? (e.target.value as IsoCode) : null;
      updateFunction((oldValues) => {
        const address = {
          ...oldValues.address,
          isoCode: newAddress,
        };
        return { ...oldValues, address };
      });
    }
  };

  const menuItems = isoCodes.map((code) => {
    return (
      <MenuItem key={code} value={code}>
        {t(`iso.${code}`)}
      </MenuItem>
    );
  });
  return (
    <FormControl variant="standard" margin="normal">
      <InputLabel id="country-select-label">
        {t('components.countrySelector.label')}
      </InputLabel>
      <Select
        {...props}
        labelId="country-select-label"
        value={country}
        onChange={handleChange}
      >
        <MenuItem key="NONE" value="">
          {''}
        </MenuItem>
        {menuItems}
      </Select>
    </FormControl>
  );
};

export default CountrySelector;
