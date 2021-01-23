import { Box } from '@material-ui/core';
import { Dispatch, SetStateAction } from 'react';
import { InputField } from '..';
import { ComponentWithT, Skill } from '../../lib/types';

interface SkillEditItemProps extends ComponentWithT {
  skills: Record<string, Skill>;
  id: string;
  setSkill: Dispatch<SetStateAction<Record<string, unknown>>>;
}

export const SkillEditItem = ({
  skills,
  id,
  setSkill,
  t,
}: SkillEditItemProps): React.ReactElement => {
  return (
    <>
      <Box component="div">
        <InputField
          label={t('labels.language.name')}
          propName={[id, 'name']}
          value={skills[id].name}
          setValue={setSkill}
        />
      </Box>
    </>
  );
};
