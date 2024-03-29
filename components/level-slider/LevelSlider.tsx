import {
  makeStyles,
  Slider,
  SliderProps,
  Typography,
  Box,
} from '@material-ui/core';
import React, { Dispatch, SetStateAction } from 'react';
import { ComponentWithT, SkillLevel } from '../../lib/types';
import { computeNestedValue } from '../../lib/utils/arrays';

interface LevelSliderProps extends SliderProps, ComponentWithT {
  type: 'language' | 'skill';
  setValue?: Dispatch<SetStateAction<Record<string, unknown>>>;
  label: string;
  input?: SkillLevel;
  propName: string | string[];
}
const levels = Object.keys(SkillLevel);
const useStyles = makeStyles({
  slider: {
    width: '55rem',
    '& .MuiSlider-markLabel[data-index="0"]': {
      transform: 'translateX(0%)',
    },
    '& .MuiSlider-markLabel[data-index="3"]': {
      transform: 'translateX(-100%)',
    },
  },
});

export const LevelSlider = ({
  input,
  t,
  type,
  setValue,
  label,
  propName,
  ...props
}: LevelSliderProps): React.ReactElement => {
  let propArray: string[];
  if (Array.isArray(propName)) {
    propArray = propName;
  } else {
    propArray = [propName];
  }

  const intLevels = Object.keys(SkillLevel) as (keyof typeof SkillLevel)[];

  const marks = levels.map((level) => ({
    value: intLevels.indexOf(level as keyof typeof SkillLevel),
    label: t(`${type}.level.${level}`),
  }));

  const classes = useStyles();

  const getText = (index: number): string => {
    switch (index) {
      case 0:
        return 'A';
      case 1:
        return 'B';
      case 2:
        return 'C1';
      case 3:
        return 'C2';
    }
    return '';
  };
  const handleChange = (
    event: React.ChangeEvent<unknown>,
    value: number | number[],
  ): void => {
    if (setValue) {
      setValue((oldValues) => {
        return {
          ...oldValues,
          ...computeNestedValue(
            oldValues,
            propArray,
            intLevels[value as number],
          ),
        };
      });
    }
  };

  return (
    <Box component="div">
      <Typography id={`${type}-slider`} gutterBottom>
        {label}
      </Typography>
      <Slider
        valueLabelDisplay={type === 'language' ? 'auto' : 'off'}
        valueLabelFormat={getText}
        className={classes.slider}
        value={intLevels.indexOf(input || SkillLevel.BASIC)}
        max={marks.length - 1}
        step={1}
        marks={marks}
        onChangeCommitted={handleChange}
        aria-labelledby={`${type}-slider`}
        {...props}
      ></Slider>
    </Box>
  );
};
