import { Slider, SliderProps } from '@material-ui/core';
import { ComponentWithT, SkillLevel } from '../../lib/types';

interface LevelSliderProps extends SliderProps, ComponentWithT {
  type: 'language' | 'skill';
  setValue?: (val: SkillLevel) => void;
}

export const LevelSlider = ({
  t,
  type,
  setValue,
  ...props
}: LevelSliderProps): React.ReactElement => {
  const levels: SkillLevel[] = ['BASIC', 'PROFICIENT', 'EXPERT', 'MASTER'];
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

  return (
    <Slider
      marks={marks}
      defaultValue={0}
      max={marks.length - 1}
      step={1}
      onChangeCommitted={handleChange}
      {...props}
    ></Slider>
  );
};
