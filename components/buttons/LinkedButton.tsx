import Button, { ButtonProps } from './Button';
import Link from 'next/link';
import { LinkProps } from 'next/link';

export type LinkedButtonProps = ButtonProps & LinkProps;

const LinkedButton = (props: LinkedButtonProps): React.ReactElement => {
  return (
    <Link href={props.href} passHref>
      <Button {...props}>{props.children}</Button>
    </Link>
  );
};

export default LinkedButton;
