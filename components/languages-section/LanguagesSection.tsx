import { CheckedTitle, Section, SectionItem } from '..';
import { ComponentWithT } from '../../lib/types';
import { Skill } from '../../lib/types/talent';
import { sortSkill } from '../../lib/utils/arrays';
import { SkillItem } from '../skill-item/SkillItem';

export interface LanguageSectionProps extends ComponentWithT {
  languages: Skill[];
}

export const LanguageSection = ({
  t,
  languages,
}: LanguageSectionProps): React.ReactElement => {
  const languageItems = languages
    .slice()
    .sort(sortSkill)
    .map((language) => (
      <SkillItem key={language.name} skill={language} t={t} type="language" />
    ));
  const handleEdit = (): void => {
    console.log('edit languages');
  };
  return (
    <Section>
      <SectionItem handleEdit={handleEdit}>
        <CheckedTitle
          title={t('components.languageSection.title')}
          done={Boolean(languages.length)}
        />
        {languageItems}
      </SectionItem>
    </Section>
  );
};
