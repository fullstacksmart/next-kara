import { CheckedTitle, Section, SectionItem } from '..';
import { ComponentWithT } from '../../lib/types';
import { Skill } from '../../lib/types/talent';
import { sortSkill } from '../../lib/utils/arrays';
import { SkillItem } from '../skill-item/SkillItem';

export interface LanguageSectionProps extends ComponentWithT {
  languages: Skill[];
  handleEdit: () => void;
}

export const LanguageSection = ({
  t,
  languages,
  handleEdit,
}: LanguageSectionProps): React.ReactElement => {
  const languageItems = languages
    .slice()
    .sort(sortSkill)
    .map((language) => (
      <SkillItem key={language.name} skill={language} t={t} type="language" />
    ));
  return (
    <Section>
      <SectionItem onClick={handleEdit}>
        <CheckedTitle
          title={t('components.languageSection.title')}
          done={Boolean(languages.length)}
        />
        {languageItems}
      </SectionItem>
    </Section>
  );
};
