import { TFunction } from 'next-i18next';
import { Experience, Gender, Profession } from '../../lib/types';
import { getFormatedDuration } from '../../lib/utils/strings';
import { FieldDisplay } from '../field-display/FieldDisplay';
import { SectionItem } from '../section-item/SectionItem';
import { Box } from '@material-ui/core';
import { defaultGender } from 'lib/defaults/common';

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
  gender = defaultGender,
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
        value={t(
          `profession.${Profession[experience.lineOfWork]}-${Gender[gender]}`,
        )}
        enabled={Boolean(experience.lineOfWork !== undefined)}
      />
      <FieldDisplay
        label={t('labels.duration.complete')}
        value={formatedDuration}
      />
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
          enabled={Boolean(experience.employer?.address.isoCode)}
        />
        <FieldDisplay
          label={t('labels.experienceDescription')}
          value={experience.description}
        />
      </Box>
    </SectionItem>
  );
};
