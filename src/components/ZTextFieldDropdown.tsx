import * as React from 'react';
import { FormControl, InputLabel, makeStyles, MenuItem, Select, Theme } from '@material-ui/core';

interface Props {
  OnChange: (val: string) => void;
  className?: string;
  defaultValue?: string;
  label: string;
  value?: string;
  values?: string[];
}

const ZTextFieldDropdown: React.FC<Props> = ({ label, value, className, OnChange, defaultValue, values }) => {
  const classes = useStyles();
  return (
    <div className={`${classes.select} ${className}`}>
      <FormControl key={label} variant='outlined' className='select'>
        <InputLabel id='demo-simple-select-outlined-label'>{label}</InputLabel>
        <Select
          fullWidth
          margin='none'
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          defaultValue={defaultValue ?? ''}
          value={value}
          onChange={(v) => OnChange(v.target.value as string)}
          label={label}
        >
          {values &&
            values.map((v, i) => (
              <MenuItem key={i} value={v}>
                {v}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};

ZTextFieldDropdown.defaultProps = {};

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  select: {
    width: '100%',
    margin: '0px'
  }
}));

export default ZTextFieldDropdown;
