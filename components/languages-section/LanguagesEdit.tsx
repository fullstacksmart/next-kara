import { DialogProps } from '@material-ui/core';
import { ComponentWithT, Skill } from '../../lib/types';
import { SkillEdit } from '../skill-edit/SkillEdit';

interface LanguagesEditProps extends DialogProps, ComponentWithT {
  onClose: () => void;
  languages: Skill[];
}

export const LanguagesEdit = ({
  languages,
  ...props
}: LanguagesEditProps): React.ReactElement => {
  const handleReset = () => console.log('reset');
  return (
    <SkillEdit
      {...props}
      skills={languages}
      type={'language'}
      {...props}
      formId="languages-form"
      reset={handleReset}
    />
  );
};
