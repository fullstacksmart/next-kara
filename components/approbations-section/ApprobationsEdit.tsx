import { gql, MutationFunction } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { DialogProps, makeStyles } from '@material-ui/core';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  Approbation,
  ApprobationStatus,
  ComponentWithT,
  FederalState,
} from '../../lib/types';
import { EditPopup } from '../edit-popup/EditPopup';
import { IconButton } from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons';
import { nanoid } from 'nanoid';
import { toObject } from '../../lib/utils/arrays';
import { ApprobationsEditItem } from './ApprobationsEditItem';

interface ApprobationsEditProps extends DialogProps {
  approbations: Approbation[];
  onClose: () => void;
  talentId: string;
}

const UPDATE_APPROBATIONS = gql`
  mutation UpdateApprobations($input: TalentUpdate!) {
    updateTalent(input: $input) {
      id
      approbations {
        id
        state
        status
      }
      percentageComplete
    }
  }
`;

const useStyle = makeStyles({
  buttonContainer: {
    justifyContent: 'flex-end',
    display: 'flex',
  },
  button: {
    marginRight: '-2rem',
  },
});

export const ApprobationsEdit = ({
  t,
  approbations,
  talentId,
  ...props
}: ApprobationsEditProps & ComponentWithT): React.ReactElement => {
  const classes = useStyle();
  const title = t(`components.approbationsEdit.title`);
  const approbationObj = toObject<Approbation>(approbations);
  const [updatedApprobations, setUpdatedApprobations] = useState(
    approbationObj,
  );

  const [updateApprobation] = useMutation(UPDATE_APPROBATIONS, {
    variables: {
      input: {
        id: talentId,
        approbations: Object.values(updatedApprobations).map((item) => {
          return {
            id: item.id,
            state: FederalState[item.state],
            status: ApprobationStatus[item.status],
          };
        }),
      },
    },
  });
  const reset = (): void => {
    setUpdatedApprobations(approbationObj);
  };

  const handleAdd = (): void => {
    const id = nanoid();
    const newApprobation: Approbation = {
      id,
      state: FederalState.BW,
      status: ApprobationStatus.IN_PREPARATION,
    };
    setUpdatedApprobations((prev) => ({ ...prev, [id]: newApprobation }));
  };
  const editableApprobations = Object.values(updatedApprobations)
    // .sort((a, b) => (a.name === '' ? 1 : a.name < b.name ? -1 : 1))
    .map((approbation) => (
      <ApprobationsEditItem
        approbations={updatedApprobations}
        id={approbation.id}
        t={t}
        key={approbation.id}
        setApprobation={
          setUpdatedApprobations as Dispatch<
            SetStateAction<Record<string, Approbation>>
          >
        }
      />
    ));
  return (
    <EditPopup
      {...props}
      formId="approbations"
      title={title}
      t={t}
      reset={reset}
      mutate={updateApprobation as MutationFunction}
    >
      {editableApprobations}
      <div className={classes.buttonContainer}>
        <IconButton
          aria-label="add item"
          onClick={handleAdd}
          className={classes.button}
        >
          <AddCircleOutline />
        </IconButton>
      </div>
    </EditPopup>
  );
};
