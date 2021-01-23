import { Box } from '@material-ui/core';
import { Dispatch, SetStateAction } from 'react';
import { InputField } from '..';
import { ComponentWithT, Skill } from '../../lib/types';
import { LevelSlider } from '../level-slider/LevelSlider';

interface SkillEditItemProps extends ComponentWithT {
  skills: Record<string, Skill>;
  id: string;
  type?: 'language' | 'skill';
  setSkill: Dispatch<SetStateAction<Record<string, unknown>>>;
}

export const SkillEditItem = ({
  skills,
  id,
  setSkill,
  t,
  type = 'skill',
}: SkillEditItemProps): React.ReactElement => {
  const description = skills[id].description ? (
    <InputField
      label={t('labels.language.name')}
      propName={[id, 'description']}
      value={skills[id].description}
      setValue={setSkill}
      multiline
    />
  ) : null;
  return (
    <>
      <Box component="div">
        <InputField
          label={t('labels.language.name')}
          propName={[id, 'name']}
          value={skills[id].name}
          setValue={setSkill}
        />
        <LevelSlider
          t={t}
          type={type}
          label={t('labels.language.level')}
          propName={[id, 'level']}
          setValue={setSkill}
          input={skills[id].level}
        />
      </Box>
      {description}
    </>
  );
};
