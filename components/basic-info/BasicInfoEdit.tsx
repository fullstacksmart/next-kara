import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from '@material-ui/core';
import { TFunction } from 'next-i18next';
import { useState } from 'react';
import { BasicInfoInput, UserInput } from '../../lib/types';
import { Button } from '../buttons';
import InputField from '../input-field/InputField';

interface BasicInfoEditProps extends DialogProps {
  basicInfo: BasicInfoInput;
  t: TFunction;
  handleClose: () => void;
}

export const BasicInfoEdit = ({
  basicInfo,
  t,
  handleClose,
  ...props
}: BasicInfoEditProps): React.ReactElement => {
  const [updatedInfo, setUpdatedInfo] = useState<UserInput & BasicInfoInput>(
    basicInfo as UserInput & BasicInfoInput,
  );
  const save = (): void => {
    handleClose();
  };
  return (
    <Dialog {...props}>
      <DialogTitle>{t('components.basicInfo.title')}</DialogTitle>
      <DialogContent>
        <InputField
          label={t('fullName.firstName')}
          id="firstName"
          nesting="name"
          value={updatedInfo.name?.firstName}
          setValue={setUpdatedInfo}
        />
        <InputField
          label={t('fullName.middleName')}
          id="middleName"
          nesting="name"
          value={updatedInfo.name?.middleName}
          setValue={setUpdatedInfo}
        />
        <InputField
          label={t('fullName.lastName')}
          id="lastName"
          nesting="name"
          value={updatedInfo.name?.lastName}
          setValue={setUpdatedInfo}
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
