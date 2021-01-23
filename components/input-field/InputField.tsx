import { TextField, TextFieldProps } from '@material-ui/core';
import { Dispatch, SetStateAction } from 'react';
import { computeNestedValue } from '../../lib/utils/arrays';

type InputFieldProps = Partial<TextFieldProps> & {
  setValue?: Dispatch<SetStateAction<Record<string, unknown>>>;
  propName: string | string[];
  trim?: boolean;
};

const InputField = ({
  label,
  setValue,
  propName,
  value,
  trim = false,
  ...props
}: InputFieldProps): React.ReactElement => {
  const labelText = label?.toString();
  let id: string;
  let propArray: string[];
  if (Array.isArray(propName)) {
    id = propName[propName.length - 1];
    propArray = propName;
  } else {
    id = propName;
    propArray = [propName];
  }
  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    if (setValue) {
      setValue((oldValues) => {
        const newValue = trim ? event.target.value.trim() : event.target.value;
        return {
          ...oldValues,
          ...computeNestedValue(oldValues, propArray, newValue),
        };
      });
    }
  };
  return (
    <TextField
      label={labelText}
      id={id}
      fullWidth
      margin="normal"
      value={value || ''}
      onChange={handleChange}
      {...props}
    ></TextField>
  );
};

export default InputField;
