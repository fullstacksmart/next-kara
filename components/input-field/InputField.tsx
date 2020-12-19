import { TextField, TextFieldProps } from '@material-ui/core';

const InputField = ({
  label,
  ...props
}: TextFieldProps): React.ReactElement => {
  const labelText = label?.toString();
  return (
    <TextField
      label={labelText}
      id={labelText}
      fullWidth
      margin="normal"
      {...props}
    ></TextField>
  );
};

export default InputField;
