import {
  InputLabel,
  Select,
  SelectProps,
  FormControl,
  MenuItemProps,
  MenuItem,
} from '@material-ui/core';
import { ChangeEvent, useState } from 'react';

export interface OptionsSelectorOption extends Partial<MenuItemProps> {
  value: string;
  label?: React.ReactNode;
}

export interface OptionsSelectorProps extends SelectProps {
  options: OptionsSelectorOption[];
  setUpdate: (value: string) => void;
  inputLabelId?: string;
  inputLabel: string;
}

const OptionsSelector = ({
  defaultValue,
  setUpdate,
  inputLabel,
  inputLabelId = inputLabel,
  options,
  ...props
}: OptionsSelectorProps): React.ReactElement => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const handleChange = (
    e: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ): void => {
    setSelectedOption(e.target.value);
    setUpdate(e.target.value as string);
  };
  const menuItems = options.map((option) => {
    return (
      <MenuItem key={option.value} value={option.value}>
        {option.label === undefined ? option.value : option.label}
      </MenuItem>
    );
  });

  return (
    <FormControl variant="standard" margin="normal">
      <InputLabel id={inputLabelId}>{inputLabel}</InputLabel>
      <Select
        {...props}
        labelId={inputLabelId}
        value={selectedOption}
        onChange={handleChange}
      >
        {menuItems}
      </Select>
    </FormControl>
  );
};

export default OptionsSelector;
