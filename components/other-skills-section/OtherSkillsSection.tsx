import { CheckedTitle, Section, SectionItem } from '..';
import { ComponentWithT } from '../../lib/types';
import { Skill } from '../../lib/types/talent';
import { sortSkill } from '../../lib/utils/arrays';
import { SkillItem } from '../skill-item/SkillItem';

export interface OtherSkillsSectionProps extends ComponentWithT {
  otherSkills: Skill[];
  handleEdit: () => void;
}

export const OtherSkillsSection = ({
  t,
  otherSkills,
  handleEdit,
}: OtherSkillsSectionProps): React.ReactElement => {
  const skillItems = otherSkills
    .slice()
    .sort(sortSkill)
    .map((skill) => (
      <SkillItem key={skill.name} skill={skill} t={t} type="skill" />
    ));
  return (
    <Section>
      <SectionItem onClick={handleEdit}>
        <CheckedTitle
          title={t('components.otherSkillsSection.title')}
          done={Boolean(otherSkills.length)}
        />
        {skillItems}
      </SectionItem>
    </Section>
  );
};
