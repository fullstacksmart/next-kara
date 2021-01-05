import { Typography } from '@material-ui/core';
import { Experience } from '../../lib/types';
import { SectionItem } from '../section-item/SectionItem';

export interface ExperienceItemProps {
  experience: Experience;
}

export const ExperienceItem = ({
  experience,
}: ExperienceItemProps): React.ReactElement => {
  console.log('got here');
  return (
    <SectionItem handleEdit={() => console.log('edit', experience.id)}>
      <Typography variant="h4">{experience.title}</Typography>
    </SectionItem>
  );
};
