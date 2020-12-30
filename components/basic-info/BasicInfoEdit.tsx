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
import { GenderToggler } from '../gender-toggler/GenderToggler';
import InputField from '../input-field/InputField';

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
      address {
        city
        isoCode
      }
      description
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
  // TODO implement optimistic update and refresh on change
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
          isoCode: updatedInfo.address?.isoCode,
        },
        profilePic: updatedInfo.profilePic,
        profession: updatedInfo.profession,
        description: updatedInfo.description,
      },
    },
  });
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    await mutate();
    handleClose();
  };

  return (
    <Dialog {...props}>
      <DialogTitle>{t('components.basicInfo.title')}</DialogTitle>
      <DialogContent>
        <form id="basicInfoForm" onSubmit={handleSubmit}>
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
          <GenderToggler
            input={basicInfo.gender}
            updateFunction={setUpdatedInfo}
            t={t}
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
              value={basicInfo.address?.isoCode}
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
