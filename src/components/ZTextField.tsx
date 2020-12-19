import { OutlinedTextFieldProps, TextField } from '@material-ui/core';
import * as React from 'react';

interface Props {
  onChange: (val: string) => void;
  label: string;
  defaultValue?: string;
  className?: string;
  name?: string;
  rows?: number;
  type?: string;
  variant?: OutlinedTextFieldProps;
}

const ZTextField: React.FC<Props> = ({ label, defaultValue, className, rows, type, variant, onChange, name }) => {
  return (
    <div key={name} className={className}>
      <TextField
        fullWidth
        defaultValue={defaultValue ?? ''}
        label={label}
        margin='dense'
        multiline={type ? false : true}
        name={name}
        onChange={(v) => onChange(v.target.value)}
        rows={type ? undefined : rows}
        type={type}
        variant={(variant ?? 'outlined') as any}
      />
    </div>
  );
};

ZTextField.defaultProps = {};

export default ZTextField;

// rules={register({
//             required: true,
//             pattern: {
//               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//               message: 'Invalid email address',
//             },
//           })}
