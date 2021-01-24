import { gql, MutationFunction } from '@apollo/client';
import { useMutation } from '@apollo/client';
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
  talentId: string;
}

const UPDATE_LANGUAGES = gql`
  mutation UpdateLanguages($input: TalentUpdate!) {
    updateTalent(input: $input) {
      id
      languages {
        id
        name
        level
      }
    }
  }
`;

export const SkillEdit = ({
  t,
  skills,
  talentId,
  type = 'skill',
  ...props
}: SkillEditProps & ComponentWithT): React.ReactElement => {
  const title = t(`components.skillEdit.${type}.title`);
  let skillsObj: Record<string, Skill> = {};
  skills.forEach((skill) => (skillsObj = { ...skillsObj, [skill.id]: skill }));
  const [updatedSkills, setUpdatedSkills] = useState(skillsObj);
  const [updateLanguages] = useMutation(UPDATE_LANGUAGES, {
    variables: {
      input: {
        id: talentId,
        languages: Object.values(updatedSkills).map((item) => ({
          id: item.id,
          name: item.name,
          level: item.level,
        })),
      },
    },
  });
  const reset = (): void => {
    setUpdatedSkills(skillsObj);
  };
  const mutate = type === 'language' ? updateLanguages : null;
  const editableSkills = Object.values(updatedSkills)
    // .sort((a, b) => (a.name === '' ? 1 : a.name < b.name ? -1 : 1))
    .map((skill) => (
      <SkillEditItem
        skills={updatedSkills}
        id={skill.id}
        t={t}
        key={skill.id}
        setSkill={
          setUpdatedSkills as Dispatch<SetStateAction<Record<string, unknown>>>
        }
        type={type}
      />
    ));
  return (
    <EditPopup
      {...props}
      title={title}
      t={t}
      reset={reset}
      mutate={mutate as MutationFunction}
    >
      {editableSkills}
    </EditPopup>
  );
};
