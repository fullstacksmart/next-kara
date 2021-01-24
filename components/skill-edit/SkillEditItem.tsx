import { IconButton, Grid, makeStyles } from '@material-ui/core';
import { Dispatch, SetStateAction } from 'react';
import { InputField } from '..';
import { ComponentWithT, Skill } from '../../lib/types';
import { LevelSlider } from '../level-slider/LevelSlider';
import { DeleteOutline } from '@material-ui/icons';

interface SkillEditItemProps extends ComponentWithT {
  skills: Record<string, Skill>;
  id: string;
  type?: 'language' | 'skill';
  setSkill: Dispatch<SetStateAction<Record<string, Skill>>>;
}

const useStyles = makeStyles({
  deleteContainer: {
    paddingTop: '2rem',
  },
  button: {
    marginRight: '-2rem',
  },
});

export const SkillEditItem = ({
  skills,
  id,
  setSkill,
  t,
  type = 'skill',
}: SkillEditItemProps): React.ReactElement => {
  const classes = useStyles();
  const handleClick = (): void => {
    setSkill((prev) => {
      const newSkills = { ...prev };
      delete newSkills[id];
      return newSkills;
    });
  };
  const description =
    skills[id].description !== undefined ? (
      <InputField
        label={t('labels.language.name')}
        propName={[id, 'description']}
        value={skills[id].description}
        setValue={setSkill as Dispatch<SetStateAction<Record<string, unknown>>>}
        multiline
      />
    ) : null;
  return (
    <Grid container alignItems="flex-start">
      <Grid xs={10} item>
        <InputField
          label={t('labels.language.name')}
          propName={[id, 'name']}
          value={skills[id].name}
          setValue={
            setSkill as Dispatch<SetStateAction<Record<string, unknown>>>
          }
        />
        <LevelSlider
          t={t}
          type={type}
          label={t('labels.language.level')}
          propName={[id, 'level']}
          setValue={
            setSkill as Dispatch<SetStateAction<Record<string, unknown>>>
          }
          input={skills[id].level}
        />
      </Grid>
      <Grid item xs={2}>
        <Grid container justify="flex-end" className={classes.deleteContainer}>
          <IconButton className={classes.button} onClick={handleClick}>
            <DeleteOutline />
          </IconButton>
        </Grid>
      </Grid>
      {description}
    </Grid>
  );
};
