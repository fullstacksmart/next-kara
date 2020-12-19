import {
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
} from '@material-ui/lab';
import { useState } from 'react';

interface OptionTogglerProps extends ToggleButtonGroupProps {
  options: {
    display?: React.ReactNode;
    value: string;
  }[];
  setOption?: (option: string) => void;
  optionsLabel: string;
}

const OptionToggler = ({
  options,
  optionsLabel,
  setOption = () => {
    return;
  },
  ...props
}: OptionTogglerProps): React.ReactElement => {
  const firstOption = options.length > 0 ? options[0] : null;
  const [value, setValue] = useState(firstOption?.value);
  const handleChange = (e: React.MouseEvent, newValue: string): void => {
    setValue(newValue);
    setOption(newValue);
  };
  const buttons = options.map((option) => (
    <ToggleButton
      key={option.value}
      value={option.value}
      aria-label={option.value}
    >
      {option.display || option.value}
    </ToggleButton>
  ));
  return (
    <ToggleButtonGroup
      {...props}
      exclusive
      aria-label={optionsLabel}
      value={value}
      defaultValue={firstOption?.value}
      onChange={handleChange}
    >
      {buttons}
    </ToggleButtonGroup>
  );
};

export default OptionToggler;
