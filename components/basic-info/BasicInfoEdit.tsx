import { Dialog, DialogProps, DialogTitle } from '@material-ui/core';
import { TFunction } from 'next-i18next';
import { BasicInfoInput } from '../../lib/types';

interface BasicInfoEditProps extends DialogProps {
  basicInfo: BasicInfoInput;
  t: TFunction;
}

export const BasicInfoEdit = ({
  basicInfo,
  t,
  ...props
}: BasicInfoEditProps): React.ReactElement => {
  return (
    <Dialog {...props}>
      <DialogTitle>{t('components.basicInfo.title')}</DialogTitle>
    </Dialog>
  );
};
