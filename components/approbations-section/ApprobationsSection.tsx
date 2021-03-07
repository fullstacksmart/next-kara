import { CheckedTitle, Section, SectionItem } from '..';
import { ComponentWithT } from '../../lib/types';
import { Approbation, FederalState } from '../../lib/types/talent';
import { ApprobationListItem } from '../approbation-list-item/ApprobationListItem';

export interface ApprobationsSectionProps extends ComponentWithT {
  approbations: Approbation[];
  handleEdit: () => void;
}

const stateList = Object.keys(FederalState);

export const ApprobationsSection = ({
  t,
  approbations,
  handleEdit,
}: ApprobationsSectionProps): React.ReactElement => {
  const approbationItems = approbations
    .slice()
    .sort((a, b) => {
      return stateList.indexOf(a.state) < stateList.indexOf(b.state) ? -1 : 1;
    })
    .map((approbation) => (
      <ApprobationListItem
        key={`${approbation.state}-${approbation.status}`}
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
