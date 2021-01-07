import { TFunction } from 'next-i18next';
import { Experience } from '../../lib/types';
import { FieldDisplay } from '../field-display/FieldDisplay';
import { SectionItem } from '../section-item/SectionItem';

export interface ExperienceItemProps {
  t: TFunction;
  experience: Experience;
}

export const ExperienceItem = ({
  experience,
  t,
}: ExperienceItemProps): React.ReactElement => {
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
    </SectionItem>
  );
};
