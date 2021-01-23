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
  return (
    <SkillEdit
      {...props}
      skills={languages}
      type={'language'}
      formId="languages-form"
    />
  );
};
