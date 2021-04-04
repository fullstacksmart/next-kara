import { PaperProps } from '@material-ui/core/Paper/Paper';

export interface SectionProps extends PaperProps {
  handleAdd?: () => void;
  children: React.ReactNode;
}

export interface StyleProps {
  withAddButton?: boolean;
}
