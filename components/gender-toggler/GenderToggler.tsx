import { TFunction } from 'next-i18next';
import { Gender, Talent } from '../../lib/types';
import OptionToggler, {
  OptionTogglerProps,
} from '../option-toggler/OptionToggler';

interface GenderTogglerProps extends Partial<OptionTogglerProps> {
  t: TFunction;
  updateFunction: React.Dispatch<React.SetStateAction<Partial<Talent>>>;
  input?: Gender;
}

export const GenderToggler = ({
  t,
  input,
  updateFunction,
  ...props
}: GenderTogglerProps): React.ReactElement => {
  const genderOptions = [
    {
      display: t('gender.MALE'),
      value: 'MALE',
    },
    {
      display: t('gender.FEMALE'),
      value: 'FEMALE',
    },
    {
      display: t('gender.OTHER'),
      value: 'OTHER',
    },
  ];
  return (
    <OptionToggler
      {...props}
      options={genderOptions}
      optionsLabel="gender"
      defaultValue={input || 'OTHER'}
      setOption={(gender) => {
        updateFunction((oldValues) => {
          return { ...oldValues, gender } as Partial<Talent>;
        });
      }}
    />
  );
};
