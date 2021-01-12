import { TFunction } from 'next-i18next';
import { Experience, Gender } from '../../lib/types';
import { CheckedTitle } from '../checked-title/CheckedTitle';
import { Section } from '../section/Section';
import { ExperienceItem } from '../experience-item/ExperienceItem';
import { ItemDivider } from '../item-divider/ItemDivider';

export interface ExperienceSectionProps {
  t: TFunction;
  experiences: Experience[];
  gender: Gender;
  handleEdit: (id?: string) => void;
}

const sortByFrom = (a: Experience, b: Experience): number => {
  const fromTimestampA = parseInt(a.duration?.from.timeStamp || '');
  const fromTimestampB = parseInt(b.duration?.from.timeStamp || '');
  if (Number.isNaN(fromTimestampA)) return -1;
  if (Number.isNaN(fromTimestampB)) return 1;
  return fromTimestampB - fromTimestampA;
};

export const ExperienceSection = ({
  t,
  gender = 'OTHER',
  experiences,
  handleEdit,
  ...props
}: ExperienceSectionProps): React.ReactElement => {
  const experienceItems = experiences
    .slice()
    .sort(sortByFrom)
    .map((experience, i, arr) => {
      const divider = i < arr.length - 1 ? <ItemDivider /> : null;
      return (
        <div key={`experience${experience.talent?.id}-${experience.id}`}>
          <ExperienceItem
            experience={experience}
            t={t}
            gender={gender}
            handleEdit={handleEdit}
          />
          {divider}
        </div>
      );
    });

  return (
    <Section handleAdd={() => handleEdit()} {...props}>
      <CheckedTitle
        title={t('components.experienceSection.title')}
        done={Boolean(
          experiences.filter((experience) => experience.isComplete).length,
        )}
      />
      {experienceItems}
    </Section>
  );
};
