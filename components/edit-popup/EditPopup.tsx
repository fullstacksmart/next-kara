import { MutationFunction } from '@apollo/client';
import {
  DialogProps,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { TFunction } from 'next-i18next';
import { PropsWithChildren } from 'react';
import { Button } from '../buttons';
import { nanoid } from 'nanoid';

interface EditPopupProps extends PropsWithChildren<DialogProps> {
  t: TFunction;
  title: string;
  onClose: () => void;
  formId: string;
  mutate?: MutationFunction;
  reset: () => void;
}

export const EditPopup = ({
  t,
  title,
  children,
  onClose,
  formId = nanoid(),
  mutate,
  reset,
  ...props
}: EditPopupProps): React.ReactElement => {
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (mutate) await mutate();
    onClose();
  };
  const handleClose = (): void => {
    reset();
    onClose();
  };
  return (
    <Dialog {...props} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <form id={formId} onSubmit={handleSubmit}>
          {children}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('buttonLabels.cancel')}</Button>
        <Button type="submit" form={formId}>
          {t('buttonLabels.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
