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
import { Talent, TalentUpdate } from '../../lib/types';
import { Button } from '../buttons';
import CountrySelector from '../country-selector/CountrySelector';
import { GenderToggler } from '../gender-toggler/GenderToggler';
import InputField from '../input-field/InputField';

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
  const [updatedInfo, setUpdatedInfo] = useState<Partial<Talent>>(basicInfo);
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log('submit', updatedInfo);
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
          <InputField
            label={t('address.city')}
            id="city"
            nesting="address"
            value={updatedInfo.address?.city}
            setValue={setUpdatedInfo}
          />
          <CountrySelector
            t={t}
            updateFunction={setUpdatedInfo}
            value={basicInfo.address?.isoCode}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('cancel')}</Button>
        <Button type="submit" form="basicInfoForm">
          {t('save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
