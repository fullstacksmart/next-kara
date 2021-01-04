import { TextField, TextFieldProps } from '@material-ui/core';
import { SetStateAction } from 'react';
import { FullName, UserInput } from '../../lib/types';

// TODO make component reusable by generalizing types
type InputFieldProps = TextFieldProps & {
  setValue?: React.Dispatch<SetStateAction<UserInput>>;
  nesting?: keyof UserInput;
};

const InputField = ({
  label,
  setValue,
  nesting,
  id,
  ...props
}: InputFieldProps): React.ReactElement => {
  const labelText = label?.toString();
  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    if (setValue)
      if (!nesting) {
        setValue((oldValues: UserInput) => ({
          ...oldValues,
          [id as string]: event.target.value,
        }));
      } else {
        setValue((oldValues: UserInput) => ({
          ...oldValues,
          [nesting as string]: {
            ...(oldValues[nesting] as FullName),
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
      onChange={handleChange}
      {...props}
    ></TextField>
  );
};

export default InputField
