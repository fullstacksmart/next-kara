import { DialogProps } from '@material-ui/core';
import { ComponentWithT, Skill } from '../../lib/types';
import { SkillEdit } from '../skill-edit/SkillEdit';

interface OtherSkillsEditProps extends DialogProps, ComponentWithT {
  onClose: () => void;
  otherSkills: Skill[];
  talentId: string;
}

export const OtherSkillsEdit = ({
  otherSkills,
  talentId,
  ...props
}: OtherSkillsEditProps): React.ReactElement => {
  return (
    <SkillEdit
      {...props}
      skills={otherSkills}
      type={'skill'}
      formId="otherSkills-form"
      talentId={talentId}
    />
  );
};
