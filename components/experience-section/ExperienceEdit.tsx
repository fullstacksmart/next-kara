import { Dialog, DialogProps } from '@material-ui/core';
import { TFunction } from 'next-i18next';
import { Experience } from '../../lib/types';

interface ExperienceEditProps extends DialogProps {
  t: TFunction;
  experience?: Experience;
}

export const ExperienceEdit = ({
  experience,
  id,
  ...props
}: ExperienceEditProps): React.ReactElement => {
  return (
    <Dialog {...props}>{experience ? experience.id : 'new experience'}</Dialog>
  );
};
