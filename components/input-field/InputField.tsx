import { TextField, TextFieldProps } from '@material-ui/core';
import { Dispatch, SetStateAction } from 'react';
import { computeNestedValue } from '../../lib/utils/arrays';

type InputFieldProps = TextFieldProps & {
  setValue?: Dispatch<SetStateAction<Record<string, unknown>>>;
  propName: string | string[];
};

const InputField = ({
  label,
  setValue,
  propName,
  value,
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
        return {
          ...oldValues,
          ...computeNestedValue(oldValues, propArray, event.target.value),
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
