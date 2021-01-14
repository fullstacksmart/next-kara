import { EditPopup, InputField, CountrySelector, DatePicker } from '../';
import { TFunction } from 'next-i18next';
import { Qualification, Talent } from '../../lib/types';
import { DialogProps, Box } from '@material-ui/core';
import { useEffect, useMemo, useState } from 'react';
import { gql, MutationFunction, useMutation } from '@apollo/client';
import { filterById } from '../../lib/utils/arrays';

const DELETE_QUALIFICATION = gql`
  mutation Delete_Qualification($input: DeleteQualification!) {
    deleteQualification(input: $input) {
      id
      qualifications {
        id
      }
    }
  }
`;

const UPDATE_QUALIFICATION = gql`
  mutation Update_Qualification($input: QualificationUpdate!) {
    updateQualification(input: $input) {
      id
      qualifications {
        id
        fieldOfEducation
        degree
        institution {
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
  }
`;

const ADD_QUALIFICATION = gql`
  mutation Add_Qualification($input: NewQualification!) {
    addQualification(input: $input) {
      id
      qualifications {
        id
        degree
        fieldOfEducation
        institution {
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
  }
`;

interface QualificationEditProps extends DialogProps {
  t: TFunction;
  id?: string;
  qualifications: Qualification[];
  talent: Talent;
  onClose: () => void;
}

export const QualificationEdit = ({
  talent,
  id = '',
  qualifications = [],
  t,
  ...props
}: QualificationEditProps): React.ReactElement => {
  const newQualification: Qualification = useMemo(
    () => ({
      id,
      fieldOfEducation: '',
      degree: '',
      talent,
      isComplete: false,
      duration: {
        from: {
          timeStamp: Date.now().toString(),
        },
        to: {
          timeStamp: '',
        },
      },
      description: '',
      institution: {
        id: '',
        name: '',
        address: {
          city: '',
          isoCode: '',
        },
      },
    }),
    [id, talent],
  );
  const [updatedQualification, setUpdatedQualification] = useState<
    Partial<Qualification>
  >(newQualification);

  const [update] = useMutation(UPDATE_QUALIFICATION, {
    variables: {
      input: {
        id: updatedQualification.id,
        talent: updatedQualification.talent?.id,
        fieldOfEducation: updatedQualification.fieldOfEducation,
        degree: updatedQualification.degree,
        institution: {
          name: updatedQualification.institution?.name,
          address: {
            city: updatedQualification.institution?.address.city,
            isoCode:
              updatedQualification.institution?.address?.isoCode !==
                undefined &&
              updatedQualification.institution?.address.isoCode !== ''
                ? updatedQualification.institution?.address.isoCode
                : null,
          },
        },
        duration: {
          from: {
            timeStamp: updatedQualification.duration?.from.timeStamp,
          },
          to: {
            timeStamp: updatedQualification.duration?.to.timeStamp,
          },
        },
        description: updatedQualification.description,
      },
    },
  });
  const [add] = useMutation(ADD_QUALIFICATION, {
    variables: {
      input: {
        talent: updatedQualification.talent?.id,
        fieldOfEducation: updatedQualification.fieldOfEducation,
        degree: updatedQualification.degree,
        institution: {
          name: updatedQualification.institution?.name,
          address: {
            city: updatedQualification.institution?.address.city,
            isoCode:
              updatedQualification.institution?.address?.isoCode !==
                undefined &&
              updatedQualification.institution?.address.isoCode !== ''
                ? updatedQualification.institution?.address.isoCode
                : null,
          },
        },
        duration: {
          from: {
            timeStamp: updatedQualification.duration?.from.timeStamp,
          },
          to: {
            timeStamp: updatedQualification.duration?.to.timeStamp,
          },
        },
        description: updatedQualification.description,
      },
    },
  });

  const [onDelete] = useMutation(DELETE_QUALIFICATION, {
    variables: {
      input: {
        talent: updatedQualification.talent?.id,
        id,
      },
    },
  });

  useEffect(() => {
    setUpdatedQualification(filterById(qualifications, id) || newQualification);
  }, [id, qualifications, newQualification]);
  const handleDelete = (): void => {
    console.log('delete', id, updatedQualification.talent?.id);
    onDelete();
  };
  return (
    <EditPopup
      t={t}
      title={
        id
          ? t('components.qualificationEdit.title.old')
          : t('components.qualificationEdit.title.new')
      }
      formId="experienceForm"
      reset={() =>
        setUpdatedQualification(
          filterById(qualifications, id) || newQualification,
        )
      }
      mutate={(id ? update : add) as MutationFunction}
      onDelete={onDelete as MutationFunction}
      {...props}
    >
      <InputField
        label={t('labels.fieldOfEducation')}
        value={updatedQualification?.fieldOfEducation}
        setValue={setUpdatedQualification}
        propName="fieldOfEducation"
      />
      <InputField
        label={t('labels.degree')}
        value={updatedQualification?.degree}
        setValue={setUpdatedQualification}
        propName="degree"
      />
      <DatePicker
        label={t('labels.duration.from')}
        updateFunction={setUpdatedQualification}
        input={updatedQualification.duration?.from.timeStamp}
        required
      />
      {/* TODO Decide how to handle 'till present'*/}
      <DatePicker
        clearable
        label={t('labels.duration.to')}
        updateFunction={setUpdatedQualification}
        input={updatedQualification.duration?.to?.timeStamp}
        propName={['duration', 'to', 'timeStamp']}
      />
      <InputField
        label={t('labels.institution')}
        value={updatedQualification?.institution?.name}
        propName={['institution', 'name']}
        setValue={setUpdatedQualification}
        required
      />
      <Box component="div">
        <InputField
          label={t('address.city')}
          value={updatedQualification?.institution?.address.city}
          propName={['institution', 'address', 'city']}
          setValue={setUpdatedQualification}
        />
        <CountrySelector
          t={t}
          value={updatedQualification.institution?.address.isoCode}
          updateFunction={setUpdatedQualification}
          propName={['institution', 'address', 'isoCode']}
        />
      </Box>
      <InputField
        label={t('labels.experienceDescription')}
        propName="description"
        value={updatedQualification.description}
        setValue={setUpdatedQualification}
        multiline={true}
      />
    </EditPopup>
  );
};
