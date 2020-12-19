import { TextField, TextFieldProps } from '@material-ui/core';
import { SetStateAction } from 'react';
import { UserInput } from '../../lib/types';

type InputFieldProps = TextFieldProps & {
  setValue?: React.Dispatch<SetStateAction<UserInput>>;
};

const InputField = ({
  label,
  setValue,
  id,
  ...props
}: InputFieldProps): React.ReactElement => {
  const labelText = label?.toString();
  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    if (setValue)
      setValue((oldValues) => ({
        ...oldValues,
        [id as string]: event.target.value,
      }));
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

export default InputField;
