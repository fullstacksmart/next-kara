import { MutationFunction } from '@apollo/client';
import { DialogProps } from '@material-ui/core';
import { Dispatch, SetStateAction, useState } from 'react';
import { ComponentWithT, Skill } from '../../lib/types';
import { EditPopup } from '../edit-popup/EditPopup';
import { SkillEditItem } from './SkillEditItem';

interface SkillEditProps extends DialogProps {
  skills: Skill[];
  type: 'language' | 'skill';
  onClose: () => void;
  formId: string;
  mutate?: MutationFunction;
  reset: () => void;
  onSave?: () => void;
}

export const SkillEdit = ({
  t,
  skills,
  type = 'skill',
  ...props
}: SkillEditProps & ComponentWithT): React.ReactElement => {
  const title = t(`components.skillEdit.${type}.title`);
  let skillsObj = {};
  skills.forEach((skill) => (skillsObj = { ...skillsObj, [skill.id]: skill }));
  const [updatedSkills, setUpdatedSkills] = useState(skillsObj);
  const editableSkills = Object.keys(updatedSkills).map((id) => (
    <SkillEditItem
      skills={updatedSkills}
      id={id}
      t={t}
      key={id}
      setSkill={
        setUpdatedSkills as Dispatch<SetStateAction<Record<string, unknown>>>
      }
    />
  ));
  return (
    <EditPopup {...props} title={title} t={t}>
      {editableSkills}
    </EditPopup>
  );
};
