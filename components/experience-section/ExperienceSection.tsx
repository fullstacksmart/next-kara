import { TFunction } from 'next-i18next';
import { Experience } from '../../lib/types';
import { CheckedTitle } from '../checked-title/CheckedTitle';
import { Section } from '../section/Section';

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
  console.log(experiences);
  return (
    <Section>
      <CheckedTitle title={t('components.experienceSection.title')} />
    </Section>
  );
};
