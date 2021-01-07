import { TFunction } from 'next-i18next';
import { Experience } from '../../lib/types';
import { getFormatedDuration } from '../../lib/utils/strings';
import { FieldDisplay } from '../field-display/FieldDisplay';
import { SectionItem } from '../section-item/SectionItem';
import { Box } from '@material-ui/core';

export interface ExperienceItemProps {
  t: TFunction;
  experience: Experience;
}

export const ExperienceItem = ({
  experience,
  t,
}: ExperienceItemProps): React.ReactElement => {
  const formatedDuration = getFormatedDuration(
    t('duration.now'),
    experience.duration,
  );
  return (
    <SectionItem
      handleEdit={
        () =>
          console.log('edit', experience.id) /* eslint-disable-line no-console*/
      }
    >
      <FieldDisplay
        label={t('labels.position')}
        value={t(
          `profession.${experience.lineOfWork}-${experience.talent.gender}`,
        )}
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
