import { TFunction } from 'next-i18next';
import { Experience } from '../../lib/types';

export interface ExperienceSectionProps {
  t: TFunction;
  experiences: Experience[];
  handleEdit: () => void;
}

export const ExperienceSection = ({
  experiences,
  ...props
}: ExperienceSectionProps): React.ReactElement => {
  console.log(experiences);
  return <></>;
};
