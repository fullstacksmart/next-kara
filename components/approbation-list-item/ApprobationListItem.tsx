import { Box } from '@material-ui/core';
import { FieldDisplay } from '..';
import { Approbation, ComponentWithT } from '../../lib/types';

interface ApprobationListItemProps extends ComponentWithT {
  approbation: Approbation;
}

export const ApprobationListItem = ({
  approbation,
  t,
}: ApprobationListItemProps): React.ReactElement => {
  return (
    <>
      <Box component="div">
        <FieldDisplay value={t(`states.${approbation.state}`)} />
        <FieldDisplay value={t(`approbation.status.${approbation.status}`)} />
      </Box>
    </>
  );
};
