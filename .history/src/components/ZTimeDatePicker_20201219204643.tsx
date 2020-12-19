import * as React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import * as dateFns from 'date-fns';

interface Props {
  className?: string;
  label: string;

  defaultValue?: any;
  onChange?: (date: Date | null) => void;
}

const ZTimeDatePicker: React.FC<Props> = ({ label, defaultValue, onChange: onChanged, className }) => {
  const [selectedDate, handleDateChange] = React.useState<Date | null>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  React.useEffect(() => {
    setIsOpen(true)
    if (defaultValue) handleDateChange(defaultValue);
  });

  return (
    <div className={className}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          value={selectedDate}
          onChange={(v) => {
            handleDateChange(v);
            if (onChanged) onChanged(v);

          }}
          format='dd-MMMM-yyyy'
          label={label}
          margin='dense'
          id={label}
          variant='inline'
          inputVariant='outlined'
          fullWidth
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

ZTimeDatePicker.defaultProps = {};

export default ZTimeDatePicker;
