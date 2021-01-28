import { Dispatch, SetStateAction } from 'react';
import { ComponentWithT, Approbation } from '../../lib/types';
import { CompactListItem } from '../compact-list-item/CompactListItem';
import { StateSelector } from '../state-selector/StateSelector';

interface SkillEditItemProps extends ComponentWithT {
  approbations: Record<string, Approbation>;
  id: string;
  setApprobation: Dispatch<SetStateAction<Record<string, Approbation>>>;
}

export const ApprobationsEditItem = ({
  approbations,
  id,
  setApprobation,
  t,
}: SkillEditItemProps): React.ReactElement => {
  const handleDelete = (): void => {
    setApprobation((prev) => {
      const newApprobations = { ...prev };
      delete newApprobations[id];
      return newApprobations;
    });
  };
  return (
    <CompactListItem handleDelete={handleDelete}>
      <StateSelector
        t={t}
        value={approbations[id].state}
        updateFunction={
          setApprobation as Dispatch<SetStateAction<Record<string, unknown>>>
        }
        propName={[id, 'state']}
      />
    </CompactListItem>
  );
};
