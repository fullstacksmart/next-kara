import { Box } from '@material-ui/core';
import { FieldDisplay } from '..';
import { ComponentWithT, Skill, SkillLevel } from '../../lib/types';

interface SkillItemProps extends ComponentWithT {
  skill: Skill;
  type?: string;
}

export const SkillItem = ({
  skill,
  t,
  type = 'skill',
}: SkillItemProps): React.ReactElement => {
  const description = skill.description ? (
    <FieldDisplay value={skill.description} />
  ) : null;
  return (
    <>
      <Box component="div">
        <FieldDisplay value={skill.name} />
        <FieldDisplay value={t(`${type}.level.${SkillLevel[skill.level]}`)} />
      </Box>
      {description}
    </>
  );
};
