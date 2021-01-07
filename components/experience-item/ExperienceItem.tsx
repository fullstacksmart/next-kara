import { TFunction } from 'next-i18next';
import { Experience, Gender } from '../../lib/types';
import { getFormatedDuration } from '../../lib/utils/strings';
import { FieldDisplay } from '../field-display/FieldDisplay';
import { SectionItem } from '../section-item/SectionItem';
import { Box } from '@material-ui/core';

export interface ExperienceItemProps {
  t: TFunction;
  experience: Experience;
  gender: Gender;
  handleEdit: (id?: string) => void;
}

export const ExperienceItem = ({
  experience,
  t,
  handleEdit,
  gender = 'OTHER',
}: ExperienceItemProps): React.ReactElement => {
  const formatedDuration = getFormatedDuration(
    t('duration.now'),
    experience.duration,
  );
  return (
    <SectionItem
      handleEdit={
        () => handleEdit(experience.id) /* eslint-disable-line no-console*/
      }
    >
      <FieldDisplay
        label={t('labels.position')}
        value={t(`profession.${experience.lineOfWork}-${gender}`)}
      />
      <FieldDisplay label={t('labels.duration')} value={formatedDuration} />
      <FieldDisplay
        label={t('labels.employer')}
        value={experience.employer?.name}
      />
      <Box component="div">
        <FieldDisplay
          label={t('address.city')}
          value={experience.employer?.address.city}
        />
        <FieldDisplay
          label={t('address.country')}
          value={t(`iso.${experience.employer?.address.isoCode}`)}
        />
        <FieldDisplay
          label={t('labels.experienceDescription')}
          value={experience.description}
        />
      </Box>
    </SectionItem>
  );
};
