import { EditPopup } from '../edit-popup/EditPopup';
import { TFunction } from 'next-i18next';
import { Experience } from '../../lib/types';
import { DialogProps } from '@material-ui/core';
import { useState } from 'react';

interface ExperienceEditProps extends DialogProps {
  t: TFunction;
  experience?: Experience;
  onClose: () => void;
}

export const ExperienceEdit = ({
  experience,
  t,
  ...props
}: ExperienceEditProps): React.ReactElement => {
  const [updatedExperience, setUpdatedExperience] = useState(experience);
  return (
    <EditPopup
      t={t}
      title={t('components.experienceEdit.title')}
      formId="experienceForm"
      reset={() => setUpdatedExperience(experience)}
      {...props}
    ></EditPopup>
  );
};
