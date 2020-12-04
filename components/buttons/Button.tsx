import {
  ButtonProps as MuiButtonProps,
  Button as MuiButton,
} from '@material-ui/core';

export type ButtonProps = MuiButtonProps;

const Button = (props: ButtonProps): React.ReactElement => {
  return <MuiButton {...props}>{props.children}</MuiButton>;
};

export default Button;
