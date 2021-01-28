import { CheckedTitle, Section, SectionItem } from '..';
import { ComponentWithT } from '../../lib/types';
import { Approbation } from '../../lib/types/talent';
import { ApprobationListItem } from '../approbation-list-item/ApprobationListItem';

export interface ApprobationSectionProps extends ComponentWithT {
  approbations: Approbation[];
  handleEdit: () => void;
}

export const ApprobationSection = ({
  t,
  approbations,
  handleEdit,
}: ApprobationSectionProps): React.ReactElement => {
  const approbationItems = approbations
    .slice()
    .sort((a, b) => b.state - a.state)
    .map((approbation) => (
      <ApprobationListItem
        key={`{approbation.state}=${approbation.status}`}
        approbation={approbation}
        t={t}
      />
    ));
  return (
    <Section>
      <SectionItem handleEdit={handleEdit}>
        <CheckedTitle
          title={t('components.approbationSection.title')}
          done={Boolean(approbations.length)}
        />
        {approbationItems}
      </SectionItem>
    </Section>
  );
};
