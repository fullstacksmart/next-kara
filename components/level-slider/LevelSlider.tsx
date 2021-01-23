import {
  makeStyles,
  Slider,
  SliderProps,
  Typography,
  Box,
} from '@material-ui/core';
import React from 'react';
import { ComponentWithT, SkillLevel } from '../../lib/types';

interface LevelSliderProps extends SliderProps, ComponentWithT {
  type: 'language' | 'skill';
  setValue?: (val: SkillLevel) => void;
  label: string;
  input?: SkillLevel;
}
const levels: SkillLevel[] = ['BASIC', 'PROFICIENT', 'EXPERT', 'MASTER'];
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
  ...props
}: LevelSliderProps): React.ReactElement => {
  const marks = levels.map((level, idx) => ({
    value: idx,
    label: t(`${type}.level.${level}`),
  }));
  const handleChange = (
    event: React.ChangeEvent<Record<string, unknown>>,
    value: number | number[],
  ): void => {
    if (setValue) setValue(levels[value as number]);
  };

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

  return (
    <Box component="div">
      <Typography id={`${type}-slider`} gutterBottom>
        {label}
      </Typography>
      <Slider
        valueLabelDisplay={type === 'language' ? 'auto' : 'off'}
        valueLabelFormat={getText}
        className={classes.slider}
        defaultValue={input ? levels.indexOf(input) : 0}
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
