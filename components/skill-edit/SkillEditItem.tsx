import { Dispatch, SetStateAction } from 'react';
import { InputField } from '..';
import { ComponentWithT, Skill } from '../../lib/types';
import { LevelSlider } from '../level-slider/LevelSlider';
import { CompactListItem } from '../compact-list-item/CompactListItem';

interface SkillEditItemProps extends ComponentWithT {
  skills: Record<string, Skill>;
  id: string;
  type?: 'language' | 'skill';
  setSkill: Dispatch<SetStateAction<Record<string, Skill>>>;
}

export const SkillEditItem = ({
  skills,
  id,
  setSkill,
  t,
  type = 'skill',
}: SkillEditItemProps): React.ReactElement => {
  const handleDelete = (): void => {
    setSkill((prev) => {
      const newSkills = { ...prev };
      delete newSkills[id];
      return newSkills;
    });
  };
  const description =
    skills[id].description !== undefined ? (
      <InputField
        label={t(`labels.${type}.description`)}
        propName={[id, 'description']}
        value={skills[id].description}
        setValue={setSkill as Dispatch<SetStateAction<Record<string, unknown>>>}
        multiline
      />
    ) : null;
  return (
    <CompactListItem handleDelete={handleDelete}>
      <InputField
        label={t(`labels.${type}.name`)}
        propName={[id, 'name']}
        value={skills[id].name}
        setValue={setSkill as Dispatch<SetStateAction<Record<string, unknown>>>}
      />
      <LevelSlider
        t={t}
        type={type}
        label={t(`labels.${type}.level`)}
        propName={[id, 'level']}
        setValue={setSkill as Dispatch<SetStateAction<Record<string, unknown>>>}
        input={skills[id].level}
      />
      {description}
    </CompactListItem>
  );
};
