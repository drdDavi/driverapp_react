import * as React from 'react';
import { makeStyles, TextField, Theme } from '@material-ui/core';
import { Controller, FieldError, Control } from 'react-hook-form';

interface Props {
  label: string;
  defaultValue?: string;
  className?: string;
  control: Control;
  error?: FieldError | undefined;
  name: string;
  rules?: any;
  rows?: number;
  type?: string;
  disabled?: boolean;
  variant?: 'standard' | 'filled' | 'outlined' | undefined;
}

const ZTextFormField: React.FC<Props> = ({ label, defaultValue, className, control, name, rules, rows, type, variant, error, disabled }) => {
  const classes = useStyles();
  return (
    <div key={name} className={className}>
      <Controller
        key={name}
        as={
          <TextField
            InputProps={{
              classes: { root: classes.root }
            }}
            disabled={disabled ?? false}
            name={name}
            error={error?.message ? true : false}
            helperText={error?.message ? error.message : undefined}
            fullWidth
            margin='dense'
            multiline={type ? false : true}
            rows={type ? undefined : rows}
            type={type}
            variant={(variant ?? 'outlined') as any}
          />
        }
        rules={rules ?? { required: 'This field is required' }}
        autoComplete='false'
        label={label}
        name={name}
        control={control}
        defaultValue={defaultValue ?? ''}
      />
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: '4px'
  }
}));

ZTextFormField.defaultProps = {};

export default ZTextFormField;

// rules={register({
//             required: true,
//             pattern: {
//               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//               message: 'Invalid email address',
//             },
//           })}
