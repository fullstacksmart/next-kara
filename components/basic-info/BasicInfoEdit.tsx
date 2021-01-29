import { gql, MutationFunction, useMutation } from '@apollo/client';
import { Box, DialogProps } from '@material-ui/core';
import { TFunction } from 'next-i18next';
import React, { useState } from 'react';
import { Profession, TalentUpdate } from '../../lib/types';
import { formatForDb } from '../../lib/utils/strings';
import CountrySelector from '../country-selector/CountrySelector';
import { EditPopup } from '../edit-popup/EditPopup';
import { GenderSelector } from '../gender-selector/GenderSelector';
import InputField from '../input-field/InputField';
import { ProfessionRadio } from '../profession-radio/ProfessionRadio';

const UPDATE_TALENT = gql`
  mutation UpdateTalent($input: TalentUpdate!) {
    updateTalent(input: $input) {
      id
      basicInfo {
        id
        name {
          firstName
          middleName
          lastName
        }
        fullName
        gender
        profession
        address {
          city
          isoCode
        }
        description
        isBasicInfoComplete
      }
      experiences {
        talent {
          gender
        }
      }
      percentageComplete
    }
  }
`;

interface BasicInfoEditProps extends DialogProps {
  basicInfo: TalentUpdate;
  t: TFunction;
  onClose: () => void;
}

export const BasicInfoEdit = ({
  basicInfo,
  t,
  onClose,
  ...props
}: BasicInfoEditProps): React.ReactElement => {
  const [updatedInfo, setUpdatedInfo] = useState<Partial<TalentUpdate>>(
    basicInfo,
  );

  const [mutate] = useMutation(UPDATE_TALENT, {
    variables: {
      input: {
        id: updatedInfo.id,
        gender: updatedInfo.gender,
        name: {
          firstName: formatForDb(updatedInfo.name?.firstName),
          middleName: formatForDb(updatedInfo.name?.middleName),
          lastName: formatForDb(updatedInfo.name?.lastName),
        },
        address: {
          city: formatForDb(updatedInfo.address?.city),
          isoCode:
            updatedInfo.address?.isoCode !== undefined &&
            updatedInfo.address.isoCode !== ''
              ? updatedInfo.address.isoCode
              : null,
        },
        profilePic: formatForDb(updatedInfo.profilePic),
        profession: Profession[updatedInfo.profession || 0],
        description: formatForDb(updatedInfo.description),
      },
    },
    optimisticResponse: {
      __typeName: 'Mutation',
      updateTalent: {
        id: updatedInfo.id,
        gender: updatedInfo.gender,
        name: {
          firstName: formatForDb(updatedInfo.name?.firstName),
          middleName: formatForDb(updatedInfo.name?.middleName),
          lastName: formatForDb(updatedInfo.name?.lastName),
          __typename: 'FullName',
        },
        address: {
          city: formatForDb(updatedInfo.address?.city),
          isoCode:
            updatedInfo.address?.isoCode !== undefined &&
            updatedInfo.address.isoCode !== ''
              ? updatedInfo.address.isoCode
              : null,
          __typename: 'Address',
        },
        profilePic: formatForDb(updatedInfo.profilePic),
        profession: Profession[updatedInfo.profession || 0],
        description: formatForDb(updatedInfo.description),
        __typename: 'Talent',
      },
    },
  });
  return (
    <EditPopup
      {...props}
      t={t}
      title={t('components.basicInfo.title')}
      onClose={onClose}
      formId="basicInfoForm"
      mutate={mutate as MutationFunction}
      reset={() => setUpdatedInfo(basicInfo)}
    >
      <GenderSelector
        value={basicInfo.gender}
        updateFunction={setUpdatedInfo}
        t={t}
      />
      <Box component="div">
        <InputField
          label={t('fullName.firstName')}
          propName={['name', 'firstName']}
          value={updatedInfo.name?.firstName}
          setValue={setUpdatedInfo}
          fullWidth={false}
          trim={true}
        />
        <InputField
          label={t('fullName.middleName')}
          propName={['name', 'middleName']}
          value={updatedInfo.name?.middleName}
          setValue={setUpdatedInfo}
          fullWidth={false}
        />
        <InputField
          label={t('fullName.lastName')}
          propName={['name', 'lastName']}
          value={updatedInfo.name?.lastName}
          setValue={setUpdatedInfo}
          fullWidth={false}
          required
        />
      </Box>
      <ProfessionRadio
        t={t}
        input={updatedInfo.profession}
        updateFunction={setUpdatedInfo}
        gender={updatedInfo.gender}
      />
      <InputField
        label={t('profilePic')}
        propName="profilePic"
        value={updatedInfo.profilePic}
        setValue={setUpdatedInfo}
        trim={true}
      />
      <Box component="div">
        <InputField
          label={t('address.city')}
          propName={['address', 'city']}
          value={updatedInfo.address?.city}
          setValue={setUpdatedInfo}
          fullWidth={false}
          trim={true}
        />
        <CountrySelector
          t={t}
          updateFunction={setUpdatedInfo}
          value={basicInfo.address?.isoCode || ''}
          fullWidth={false}
        />
      </Box>
      <InputField
        label={t('description')}
        placeholder={t('components.basicInfoEdit.description.placeholder')}
        propName="description"
        value={updatedInfo.description}
        setValue={setUpdatedInfo}
        multiline={true}
      />
    </EditPopup>
  );
};
