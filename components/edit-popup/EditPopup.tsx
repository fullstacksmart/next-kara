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
  onSave?: () => void;
  onDelete?: MutationFunction;
}

export const EditPopup = ({
  t,
  title,
  children,
  onClose,
  onSave,
  formId = nanoid(),
  mutate,
  reset,
  onDelete,
  ...props
}: EditPopupProps): React.ReactElement => {
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (mutate) {
      try {
        await mutate();
      } catch (e) {
        console.error(e); //eslint-disable-line no-console
      }
    }
    if (onSave) onSave();
    onClose();
  };
  const handleClose = (): void => {
    reset();
    onClose();
  };

  const handleDelete = (): void => {
    if (onDelete) onDelete();
    handleClose();
  };

  const deleteButton = onDelete ? (
    <Button onClick={handleDelete}>{t('labels.buttons.delete')}</Button>
  ) : (
    <> </>
  );

  return (
    <Dialog {...props} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <form id={formId} onSubmit={handleSubmit}>
          {children}
        </form>
      </DialogContent>
      <DialogActions>
        {deleteButton}
        <Button onClick={handleClose}>{t('labels.buttons.cancel')}</Button>
        <Button type="submit" form={formId}>
          {t('labels.buttons.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
