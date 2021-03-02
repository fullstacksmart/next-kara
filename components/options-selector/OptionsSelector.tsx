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
  value?: string;
  label?: React.ReactNode;
}

export interface OptionsSelectorProps extends SelectProps {
  options: OptionsSelectorOption[];
  setUpdate: (value: string) => void;
  inputLabelId?: string;
  inputLabel: string;
}

const OptionsSelector = ({
  value,
  setUpdate,
  inputLabel,
  inputLabelId = inputLabel,
  options,
  ...props
}: OptionsSelectorProps): React.ReactElement => {
  const [selectedOption, setSelectedOption] = useState(value);

  const handleChange = (
    e: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ): void => {
    setSelectedOption(e.target.value);
    setUpdate(e.target.value as string);
  };
  const menuItems =
    options &&
    options.map((option) => {
      return (
        <MenuItem key={option.value || 'null'} value={option.value}>
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
