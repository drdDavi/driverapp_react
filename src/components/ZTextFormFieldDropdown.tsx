import { makeStyles, MenuItem, TextField, Theme } from '@material-ui/core';
import * as React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

export type IDropDownMap = {
  name: string;
  id?: string;
};

interface Props {
  className?: string;
  defaultValue?: string;
  label: string;
  valuesMap?: IDropDownMap[];
  control: Control;
  error?: FieldError | undefined;
  name: string;
  rules?: any;
  type?: string;
  variant?: 'standard' | 'filled' | 'outlined' | undefined;
  setSelectedIDropDownMap?: (val: IDropDownMap) => void;
}

const ZTextFormFieldDropdown: React.FC<Props> = ({
  label,
  className,
  defaultValue,
  valuesMap,
  control,
  error,
  name,
  variant,
  rules,
  setSelectedIDropDownMap: setSelectedIValue
}) => {
  const classes = useStyles();
  return (
    <div className={`${classes.select} ${className}`}>
      <Controller
        key={name}
        rules={rules ?? { required: 'This field is required' }}
        autoComplete='false'
        label={label}
        name={name}
        control={control}
        defaultValue={defaultValue ?? ''}
        as={
          <TextField
            select
            fullWidth
            margin='dense'
            variant={(variant ?? 'outlined') as any}
            name={name}
            error={error?.message ? true : false}
            helperText={error?.message ? error.message : undefined}
          >
            {valuesMap &&
              valuesMap.map((value: IDropDownMap, i) => (
                <MenuItem
                  key={i}
                  value={value.name}
                  onClick={() => {
                    if (setSelectedIValue) setSelectedIValue(value);
                    console.log(value);
                  }}
                >
                  {value.name}
                </MenuItem>
              ))}
          </TextField>
        }
      />
    </div>
  );
};

ZTextFormFieldDropdown.defaultProps = {};

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  formControl: {
    width: '100%'
  },
  select: {
    height: 39
  }
}));

export default ZTextFormFieldDropdown;
