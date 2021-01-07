import { Dialog, DialogProps } from '@material-ui/core';
import { TFunction } from 'next-i18next';
import { Experience } from '../../lib/types';

interface ExperienceEditProps extends DialogProps {
  t: TFunction;
  experiences: Experience[];
  id?: string;
}

export const ExperienceEdit = ({
  experiences,
  id,
  ...props
}: ExperienceEditProps): React.ReactElement => {
  return <Dialog {...props}>{id ? id : 'new experience'}</Dialog>;
};
