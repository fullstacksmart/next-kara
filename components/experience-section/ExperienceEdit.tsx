import { EditPopup } from '../edit-popup/EditPopup';
import { TFunction } from 'next-i18next';
import { Experience, Talent } from '../../lib/types';
import { DialogProps, Box } from '@material-ui/core';
import { useEffect, useState } from 'react';
import InputField from '../input-field/InputField';
import { ProfessionRadio } from '../profession-radio/ProfessionRadio';
import CountrySelector from '../country-selector/CountrySelector';
import { DatePicker } from '../date-picker/DatePicker';
import { gql, MutationFunction, useMutation } from '@apollo/client';

const UPDATE_EXPERIENCE = gql`
  mutation Update_Experience($input: ExperienceUpdate!) {
    updateExperience(input: $input) {
      id
      lineOfWork
      employer {
        name
        address {
          city
          isoCode
        }
      }
      duration {
        from {
          timeStamp
        }
        to {
          timeStamp
        }
      }
      description
    }
  }
`;

const ADD_EXPERIENCE = gql`
  mutation Add_Experience($input: NewExperience!) {
    addExperience(input: $input) {
      id
      employer {
        id
        name
        address {
          city
          isoCode
        }
      }
      duration {
        from {
          timeStamp
        }
        to {
          timeStamp
        }
      }
      description
    }
  }
`;

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
    duration: {
      from: {
        timeStamp: '',
      },
      to: {
        timeStamp: '',
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

  const [update] = useMutation(UPDATE_EXPERIENCE, {
    variables: {
      input: {
        id: updatedExperience.id,
        talent: updatedExperience.talent?.id,
        lineOfWork: updatedExperience.lineOfWork,
        employer: {
          name: updatedExperience.employer?.name,
          address: {
            city: updatedExperience.employer?.address.city,
            isoCode: updatedExperience.employer?.address.isoCode,
          },
        },
        duration: {
          from: {
            timeStamp: updatedExperience.duration?.from.timeStamp,
          },
          to: {
            timeStamp: updatedExperience.duration?.to.timeStamp,
          },
        },
        description: updatedExperience.description,
      },
    },
  });
  const [add] = useMutation(ADD_EXPERIENCE, {
    variables: {
      input: {
        talent: updatedExperience.talent?.id,
        lineOfWork: updatedExperience.lineOfWork,
        employer: {
          name: updatedExperience.employer?.name,
          address: {
            city: updatedExperience.employer?.address.city,
            isoCode: updatedExperience.employer?.address.isoCode,
          },
        },
        duration: {
          from: {
            timeStamp: updatedExperience.duration?.from.timeStamp,
          },
          to: {
            timeStamp: updatedExperience.duration?.to.timeStamp,
          },
        },
        description: updatedExperience.description,
      },
    },
  });

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
      mutate={(id ? update : add) as MutationFunction}
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
      <DatePicker
        label={t('labels.duration.from')}
        updateFunction={setUpdatedExperience}
        input={updatedExperience.duration?.from.timeStamp}
        required
      />
      {/* TODO Decide how to handle 'till present'*/}
      <DatePicker
        clearable
        label={t('labels.duration.to')}
        updateFunction={setUpdatedExperience}
        input={updatedExperience.duration?.to?.timeStamp}
        propName={['duration', 'to', 'timeStamp']}
      />
      <InputField
        label={t('labels.employer')}
        value={updatedExperience?.employer?.name}
        propName={['employer', 'name']}
        setValue={setUpdatedExperience}
        required
      />
      <Box component="div">
        <InputField
          label={t('address.city')}
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
      <InputField
        label={t('labels.experienceDescription')}
        propName="description"
        value={updatedExperience.description}
        setValue={setUpdatedExperience}
        multiline={true}
      />
    </EditPopup>
  );
};
