import {
  KeyboardDatePickerProps as OriginalProps,
  KeyboardDatePicker as Original,
} from '@material-ui/pickers';
import { Dispatch, SetStateAction } from 'react';
import { computeNestedValue } from '../../lib/utils/arrays';

interface DatePickerProps extends Partial<OriginalProps> {
  label: string;
  propName?: string | string[];
  updateFunction: Dispatch<SetStateAction<Record<string, unknown>>>;
  input?: string;
}

export const DatePicker = ({
  label,
  input = Date.now().toString(),
  updateFunction,
  propName = ['duration', 'from', 'timeStamp'],
  ...props
}: DatePickerProps): React.ReactElement => {
  const propNameArray = Array.isArray(propName) ? propName : [propName];

  return (
    <Original
      {...props}
      clearable
      format="MM/yyyy"
      label={label}
      views={['year', 'month', 'date']}
      value={new Date(parseInt(input))}
      onChange={(date) => {
        const newDateString: string = date
          ? date.getTime().toString()
          : Date.now().toString();
        updateFunction((oldValues) => ({
          ...oldValues,
          ...computeNestedValue(oldValues, propNameArray, newDateString),
        }));
      }}
    ></Original>
  );
};
