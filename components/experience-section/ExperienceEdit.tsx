import { EditPopup } from '../edit-popup/EditPopup';
import { TFunction } from 'next-i18next';
import { Experience, Talent } from '../../lib/types';
import { DialogProps, Box } from '@material-ui/core';
import { useEffect, useState } from 'react';
import InputField from '../input-field/InputField';
import { ProfessionRadio } from '../profession-radio/ProfessionRadio';
import CountrySelector from '../country-selector/CountrySelector';

interface ExperienceEditProps extends DialogProps {
  t: TFunction;
  id?: string;
  experience?: Experience;
  talent: Talent;
  onClose: () => void;
}

export const ExperienceEdit = ({
  talent,
  id,
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
  // TODO find better solution
  useEffect(() => {
    setUpdatedExperience(() => experience);
  }, [id]);
  return (
    <EditPopup
      t={t}
      title={
        id
          ? t('components.experienceEdit.title.old')
          : t('components.experienceEdit.title.new')
      }
      formId="experienceForm"
      reset={() => setUpdatedExperience(experience)}
      onSave={() => console.log('saving', updatedExperience)}
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
        <CountrySelector
          t={t}
          defaultValue={updatedExperience.employer?.address.isoCode}
          updateFunction={setUpdatedExperience}
          propName={['employer', 'address', 'isoCode']}
        />
      </Box>
    </EditPopup>
  );
};
