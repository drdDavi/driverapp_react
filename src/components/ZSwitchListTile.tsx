import * as React from 'react';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core';

interface Props {
  label: string;
  disbaled?: boolean;
  value: boolean;
  name?: string;
  onChange?: (val: boolean) => void;
  className?: string;
}

const ZSwitchListTile: React.FC<Props> = ({ label, value, onChange, name, disbaled, className }) => {
  const classes = useStyles();
  return (
    <Grid className={`${classes.root} ${className}`} container alignContent='center' alignItems='center' justify='space-between'>
      <p> {label}</p>
      <Switch
        name={name}
        disabled={disbaled}
        onChange={(e, v) => {
          if (onChange) onChange(v);
        }}
        checked={value}
        color='primary'
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: 16
  }
}));

ZSwitchListTile.defaultProps = {};

export default ZSwitchListTile;
