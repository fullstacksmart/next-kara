import { TextField, TextFieldProps } from '@material-ui/core';
import { SetStateAction } from 'react';
import { BasicInfoInput, UserInput } from '../../lib/types';

// TODO make component reusable by generalizing types
type InputFieldProps = TextFieldProps & {
  setValue?: React.Dispatch<SetStateAction<UserInput & BasicInfoInput>>;
  nesting?: keyof UserInput | keyof BasicInfoInput;
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
        setValue((oldValues: UserInput & BasicInfoInput) => ({
          ...oldValues,
          [id as string]: event.target.value,
        }));
      } else {
        setValue((oldValues: UserInput & BasicInfoInput) => ({
          ...oldValues,
          [nesting as string]: {
            ...(oldValues[nesting] as Record<string, unknown>),
            [id as string]: event.target.value,
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
