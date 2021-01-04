import { TextField, TextFieldProps } from '@material-ui/core';
import { Dispatch, SetStateAction } from 'react';

// TODO make component reusable by generalizing types
type InputFieldProps = TextFieldProps & {
  setValue?: Dispatch<SetStateAction<Record<string, unknown>>>;
  nesting?: string;
  id: string;
};

const InputField = ({
  label,
  setValue,
  nesting,
  id,
  value,
  ...props
}: InputFieldProps): React.ReactElement => {
  const labelText = label?.toString();
  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    if (setValue)
      if (!nesting) {
        setValue((oldValues) => ({
          ...oldValues,
          [id]: event.target.value,
        }));
      } else {
        setValue((oldValues) => ({
          ...oldValues,
          [nesting]: {
            ...(oldValues[nesting] as Record<string, unknown>),
            [id]: event.target.value,
          },
        }));
      }
  };
  return (
    <TextField
      label={labelText}
      id={id}
      fullWidth
      margin="normal"
      value={value}
      onChange={handleChange}
      {...props}
    ></TextField>
  );
};

export default InputField;
