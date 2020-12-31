import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControlLabelProps,
  RadioProps,
  RadioGroupProps,
} from '@material-ui/core';
import { useState } from 'react';

export interface OptionsRadioOption extends Partial<FormControlLabelProps> {
  value: string;
  radioProps?: RadioProps;
}

export interface OptionsRadioProps extends RadioGroupProps {
  label?: string;
  ariaLabel?: string;
  setUpdate?: (value: string) => void;
  options: OptionsRadioOption[];
}
export const OptionsRadio = ({
  options,
  label,
  name = label,
  ariaLabel,
  defaultValue,
  setUpdate,
  ...props
}: OptionsRadioProps): React.ReactElement => {
  const firstOption = options.length > 0 ? options[0] : null;
  const [currentValue, setCurrentValue] = useState(
    defaultValue || firstOption?.value,
  );
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ): void => {
    setCurrentValue(value);
    setUpdate && setUpdate(value);
  };

  const radioButtons = options.map((option) => {
    return (
      <FormControlLabel
        {...option}
        key={option.value}
        control={<Radio {...option.radioProps} />}
        label={option.label || option.value}
      />
    );
  });
  return (
    <FormControl component="fieldset">
      {label && <FormLabel component="legend">{label}</FormLabel>}
      <RadioGroup
        {...props}
        aria-label={ariaLabel || label || name}
        name={name}
        value={currentValue}
        onChange={handleChange}
      >
        {radioButtons}
      </RadioGroup>
    </FormControl>
  );
};
