import { DialogProps } from '@material-ui/core';
import { ComponentWithT, Skill } from '../../lib/types';
import { SkillEdit } from '../skill-edit/SkillEdit';

interface LanguagesEditProps extends DialogProps, ComponentWithT {
  onClose: () => void;
  languages: Skill[];
  talentId: string;
}

export const LanguagesEdit = ({
  languages,
  talentId,
  ...props
}: LanguagesEditProps): React.ReactElement => {
  return (
    <SkillEdit
      {...props}
      skills={languages}
      type={'language'}
      formId="languages-form"
      talentId={talentId}
    />
  );
};
