import { EditPopup } from '../edit-popup/EditPopup';
import { TFunction } from 'next-i18next';
import { Experience, Gender } from '../../lib/types';
import { DialogProps } from '@material-ui/core';
import { Dispatch, SetStateAction, useState } from 'react';
import InputField from '../input-field/InputField';
import { ProfessionRadio } from '../profession-radio/ProfessionRadio';

interface ExperienceEditProps extends DialogProps {
  t: TFunction;
  gender: Gender;
  experience?: Experience;
  onClose: () => void;
}

export const ExperienceEdit = ({
  experience,
  t,
  gender,
  ...props
}: ExperienceEditProps): React.ReactElement => {
  const [updatedExperience, setUpdatedExperience] = useState(experience);
  console.log(updatedExperience, experience);
  return (
    <EditPopup
      t={t}
      title={t('components.experienceEdit.title')}
      formId="experienceForm"
      reset={() => setUpdatedExperience(experience)}
      {...props}
    >
      <ProfessionRadio
        t={t}
        input={experience?.lineOfWork}
        updateFunction={
          setUpdatedExperience as Dispatch<SetStateAction<object>> // eslint-disable-line @typescript-eslint/ban-types
        }
        gender={gender}
        isExtended={true}
        propName="lineOfWork"
      />
      <InputField
        label={t('labels.position')}
        id="position"
        value={experience?.lineOfWork}
      />
    </EditPopup>
  );
};
