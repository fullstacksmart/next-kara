import { EditPopup } from '../edit-popup/EditPopup';
import { TFunction } from 'next-i18next';
import { Experience, Talent } from '../../lib/types';
import { DialogProps, Box } from '@material-ui/core';
import { useState } from 'react';
import InputField from '../input-field/InputField';
import { ProfessionRadio } from '../profession-radio/ProfessionRadio';

interface ExperienceEditProps extends DialogProps {
  t: TFunction;
  experience?: Experience;
  talent: Talent;
  onClose: () => void;
}

export const ExperienceEdit = ({
  talent,
  experience = {
    id: '',
    talent,
    lineOfWork: 'NURSE',
    employer: {
      id: '',
      name: '',
      address: {
        city: '',
        isoCode: 'NONE',
      },
    },
    isComplete: false,
  },
  t,
  ...props
}: ExperienceEditProps): React.ReactElement => {
  const [updatedExperience, setUpdatedExperience] = useState<
    Partial<Experience>
  >(experience);
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
        updateFunction={setUpdatedExperience}
        gender={talent.gender}
        isExtended={true}
        propName="lineOfWork"
      />
      <InputField
        label={t('labels.employer')}
        value={updatedExperience?.employer?.name}
        propName={['employer', 'name']}
        setValue={setUpdatedExperience}
      />
      <Box component="div">
        <InputField
          label={t('address.city')}
          id="city"
          value={updatedExperience?.employer?.address.city}
          propName={['employer', 'address', 'city']}
          setValue={setUpdatedExperience}
        />
      </Box>
    </EditPopup>
  );
};
