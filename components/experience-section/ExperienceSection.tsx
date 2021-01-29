import { TFunction } from 'next-i18next';
import { Experience, Gender } from '../../lib/types';
import { CheckedTitle, ItemDivider, Section } from '../';
import { ExperienceItem } from '../experience-item/ExperienceItem';
import { sortByFrom } from '../../lib/utils/arrays';

export interface ExperienceSectionProps {
  t: TFunction;
  experiences: Experience[];
  gender: Gender;
  handleEdit: (id?: string) => void;
}

export const ExperienceSection = ({
  t,
  gender = Gender.OTHER,
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
