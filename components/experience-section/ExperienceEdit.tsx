import { Dialog, DialogProps, DialogTitle } from '@material-ui/core';
import { TFunction } from 'next-i18next';
import { Experience } from '../../lib/types';

interface ExperienceEditProps extends DialogProps {
  t: TFunction;
  experience?: Experience;
}

export const ExperienceEdit = ({
  experience,
  t,
  ...props
}: ExperienceEditProps): React.ReactElement => {
  return (
    <Dialog {...props}>
      <DialogTitle>{t('components.experienceEdit.title')}</DialogTitle>
    </Dialog>
  );
};
