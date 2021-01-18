import { TFunction } from 'next-i18next';
import { Qualification } from '../../lib/types';
import { CheckedTitle } from '../checked-title/CheckedTitle';
import { Section } from '../section/Section';
import { QualificationItem } from '../qualification-item/QualificationItem';
import { ItemDivider } from '../item-divider/ItemDivider';
import { sortByFrom } from '../../lib/utils/arrays';

export interface QualificationSectionProps {
  t: TFunction;
  qualifications: Qualification[];
  handleEdit: (id?: string) => void;
}

export const QualificationSection = ({
  t,
  qualifications = [],
  handleEdit,
  ...props
}: QualificationSectionProps): React.ReactElement => {
  const qualificationItems = qualifications
    .slice()
    .sort(sortByFrom)
    .map((qualification, i, arr) => {
      const divider = i < arr.length - 1 ? <ItemDivider /> : null;
      return (
        <div
          key={`qualification${qualification.talent?.id}-${qualification.id}`}
        >
          <QualificationItem
            qualification={qualification}
            t={t}
            handleEdit={handleEdit}
          />
          {divider}
        </div>
      );
    });

  return (
    <Section handleAdd={() => handleEdit()} {...props}>
      <CheckedTitle
        title={t('components.qualificationSection.title')}
        done={Boolean(
          qualifications.filter((qualification) => qualification.isComplete)
            .length,
        )}
      />
      {qualificationItems}
    </Section>
  );
};
