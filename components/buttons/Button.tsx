import {
  ButtonProps as MuiButtonProps,
  Button as MuiButton,
} from '@material-ui/core';
import { LinkProps } from 'next/link';
import { Link } from '../../i18n.config';

type OptionalLinkProps =
  | {
      href?: URL;
    }
  | LinkProps;

export type ButtonProps = MuiButtonProps & OptionalLinkProps;

const Button = (props: ButtonProps): React.ReactElement => {
  if (!props.href) {
    return <MuiButton {...props}>{props.children}</MuiButton>;
  }
  return (
    <Link href={props.href} passHref>
      <MuiButton {...props}>{props.children}</MuiButton>
    </Link>
  );
};

export default Button;
