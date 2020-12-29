import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from '@material-ui/core';
import { TFunction } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { Talent, TalentUpdate } from '../../lib/types';
import { Button } from '../buttons';
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
  const save = (): void => {
    handleClose();
  };

  useEffect(() => {
    console.log(updatedInfo);
  }, [updatedInfo]);
  return (
    <Dialog {...props}>
      <DialogTitle>{t('components.basicInfo.title')}</DialogTitle>
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('cancel')}</Button>
        <Button onClick={save}>{t('save')}</Button>
      </DialogActions>
    </Dialog>
  );
};
