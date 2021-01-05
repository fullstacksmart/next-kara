import { TFunction } from 'next-i18next';
import { Experience } from '../../lib/types';
import { CheckedTitle } from '../checked-title/CheckedTitle';
import { Section } from '../section/Section';
import { ExperienceItem } from '../experience-item/ExperienceItem';
import { ItemDivider } from '../item-divider/ItemDivider';

export interface ExperienceSectionProps {
  t: TFunction;
  experiences: Experience[];
  handleEdit: () => void;
}

export const ExperienceSection = ({
  t,
  experiences,
  ...props
}: ExperienceSectionProps): React.ReactElement => {
  const experienceItems = experiences.map((experience, i, arr) => {
    const divider = i < arr.length - 1 ? <ItemDivider /> : null;
    return (
      <>
        <ExperienceItem key={experience.id} experience={experience} />
        {divider}
      </>
    );
  });

  return (
    <Section>
      <CheckedTitle title={t('components.experienceSection.title')} />
      {experienceItems}
    </Section>
  );
};
