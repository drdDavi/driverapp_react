import * as React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import * as DateFns from 'date-fns';

interface Props {
  label: string;
  id: string;
  value: Date;
  onChange?: any;
  className?: any;
}

const ZTimePicker: React.FC<Props> = ({ label, id, value, onChange, className }) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
  React.useEffect(() => {
    console.log('Date', DateFns.getDate(value));
  });
  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <TimePicker
          className={className}
          variant='inline'
          label={label}
          margin='dense'
          value={value}
          onChange={(date: Date | null) => {
            if (date) {
              setSelectedDate(date);
              onChange(date);
            }
            console.log('date **********', selectedDate);
          }}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

ZTimePicker.defaultProps = {};

export default ZTimePicker;
