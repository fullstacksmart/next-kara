import { TFunction } from 'next-i18next';
import { Qualification, Gender } from '../../lib/types';
import { getFormatedDuration } from '../../lib/utils/strings';
import { FieldDisplay } from '../field-display/FieldDisplay';
import { SectionItem } from '../section-item/SectionItem';
import { Box } from '@material-ui/core';

export interface QualificationItemProps {
  t: TFunction;
  qualification: Qualification;
  handleEdit: (id?: string) => void;
}

export const QualificationItem = ({
  qualification,
  t,
  handleEdit,
}: QualificationItemProps): React.ReactElement => {
  const formatedDuration = getFormatedDuration(
    t('duration.now'),
    qualification.duration,
  );
  return (
    <SectionItem
      handleEdit={
        () => handleEdit(qualification.id) /* eslint-disable-line no-console*/
      }
    >
      <FieldDisplay
        label={t('labels.fieldOfEducation')}
        value={qualification.fieldOfEducation}
      />
      <FieldDisplay
        label={t('labels.duration.complete')}
        value={formatedDuration}
      />
      <FieldDisplay
        label={t('labels.institution')}
        value={qualification.institution?.name}
      />
      <Box component="div">
        <FieldDisplay
          label={t('address.city')}
          value={qualification.institution?.address.city}
        />
        <FieldDisplay
          label={t('address.country')}
          value={t(`iso.${qualification.institution?.address.isoCode}`)}
          enabled={Boolean(qualification.institution?.address.isoCode)}
        />
        <FieldDisplay
          label={t('labels.description')}
          value={qualification.description}
        />
      </Box>
    </SectionItem>
  );
};
