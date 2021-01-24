import { gql, MutationFunction } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { DialogProps, makeStyles } from '@material-ui/core';
import { Dispatch, SetStateAction, useState } from 'react';
import { ComponentWithT, Skill } from '../../lib/types';
import { EditPopup } from '../edit-popup/EditPopup';
import { SkillEditItem } from './SkillEditItem';
import { IconButton } from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons';
import { nanoid } from 'nanoid';

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

const useStyle = makeStyles({
  buttonContainer: {
    justifyContent: 'flex-end',
    display: 'flex',
  },
  button: {
    marginRight: '-2rem',
  },
});

export const SkillEdit = ({
  t,
  skills,
  talentId,
  type = 'skill',
  ...props
}: SkillEditProps & ComponentWithT): React.ReactElement => {
  const classes = useStyle();
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

  const handleAdd = (): void => {
    const id = nanoid();
    const newSkill: Skill = {
      id,
      name: '',
      level: 'BASIC',
    };
    if (type === 'skill') newSkill.description = '';
    setUpdatedSkills((prev) => ({ ...prev, [id]: newSkill }));
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
  const isComplete = (): boolean => {
    return Object.values(updatedSkills).every((skill) => Boolean(skill.name));
  };
  return (
    <EditPopup
      {...props}
      title={title}
      t={t}
      reset={reset}
      mutate={mutate as MutationFunction}
      disabled={!isComplete()}
    >
      {editableSkills}
      <div className={classes.buttonContainer}>
        <IconButton
          aria-label="add item"
          onClick={handleAdd}
          className={classes.button}
        >
          <AddCircleOutline />
        </IconButton>
      </div>
    </EditPopup>
  );
};
