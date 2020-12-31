import { gql, useMutation } from '@apollo/client';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from '@material-ui/core';
import { TFunction } from 'next-i18next';
import React, { useState } from 'react';
import { TalentUpdate } from '../../lib/types';
import { Button } from '../buttons';
import CountrySelector from '../country-selector/CountrySelector';
import { GenderRadio } from '../gender-radio/GenderRadio';
import InputField from '../input-field/InputField';
import { ProfessionRadio } from '../profession-radio/ProfessionRadio';

const UPDATE_TALENT = gql`
  mutation UpdateTalent($input: TalentUpdate!) {
    updateTalent(input: $input) {
      id
      fullName
      name {
        firstName
        middleName
        lastName
      }
      gender
      profession
      address {
        city
        isoCode
      }
      description
      isBasicInfoComplete
    }
  }
`;

interface BasicInfoEditProps extends DialogProps {
  basicInfo: TalentUpdate;
  t: TFunction;
  handleClose: () => void;
}

export const BasicInfoEdit = ({
  basicInfo,
  t,
  handleClose,
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
          firstName: updatedInfo.name?.firstName,
          middleName: updatedInfo.name?.middleName,
          lastName: updatedInfo.name?.lastName,
        },
        address: {
          city: updatedInfo.address?.city,
          isoCode:
            updatedInfo.address?.isoCode &&
            updatedInfo.address.isoCode !== 'NONE'
              ? updatedInfo.address.isoCode
              : null,
        },
        profilePic: updatedInfo.profilePic,
        profession: updatedInfo.profession,
        description: updatedInfo.description,
      },
    },
    optimisticResponse: {
      __typeName: 'Mutation',
      updateTalent: {
        id: updatedInfo.id,
        gender: updatedInfo.gender,
        name: {
          firstName: updatedInfo.name?.firstName,
          middleName: updatedInfo.name?.middleName,
          lastName: updatedInfo.name?.lastName,
          __typename: 'FullName',
        },
        address: {
          city: updatedInfo.address?.city,
          isoCode: updatedInfo.address?.isoCode,
          __typename: 'Address',
        },
        profilePic: updatedInfo.profilePic,
        profession: updatedInfo.profession,
        description: updatedInfo.description,
        __typename: 'Talent',
      },
    },
  });
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const result = await mutate();
    console.log(result);
    handleClose();
  };

  return (
    <Dialog {...props}>
      <DialogTitle>{t('components.basicInfo.title')}</DialogTitle>
      <DialogContent>
        <form id="basicInfoForm" onSubmit={handleSubmit}>
          <GenderRadio
            input={basicInfo.gender}
            updateFunction={setUpdatedInfo}
            t={t}
          />
          <Box component="div">
            <InputField
              label={t('fullName.firstName')}
              id="firstName"
              nesting="name"
              value={updatedInfo.name?.firstName}
              setValue={setUpdatedInfo}
              fullWidth={false}
            />
            <InputField
              label={t('fullName.middleName')}
              id="middleName"
              nesting="name"
              value={updatedInfo.name?.middleName}
              setValue={setUpdatedInfo}
              fullWidth={false}
            />
            <InputField
              label={t('fullName.lastName')}
              id="lastName"
              nesting="name"
              value={updatedInfo.name?.lastName}
              setValue={setUpdatedInfo}
              fullWidth={false}
              required
            />
          </Box>
          <ProfessionRadio
            t={t}
            input={basicInfo.profession}
            updateFunction={setUpdatedInfo}
            gender={updatedInfo.gender}
          />
          <InputField
            label={t('profilePic')}
            id="profilePic"
            value={updatedInfo.profilePic}
            setValue={setUpdatedInfo}
          />
          <Box component="div">
            <InputField
              label={t('address.city')}
              id="city"
              nesting="address"
              value={updatedInfo.address?.city}
              setValue={setUpdatedInfo}
              fullWidth={false}
            />
            <CountrySelector
              t={t}
              updateFunction={setUpdatedInfo}
              defaultValue={basicInfo.address?.isoCode}
              fullWidth={false}
            />
          </Box>
          <InputField
            label={t('description')}
            id="description"
            value={updatedInfo.description}
            setValue={setUpdatedInfo}
            multiline={true}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('buttonLabels.cancel')}</Button>
        <Button type="submit" form="basicInfoForm">
          {t('buttonLabels.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
