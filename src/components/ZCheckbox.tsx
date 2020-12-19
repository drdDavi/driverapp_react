import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Checkbox } from '@material-ui/core';

interface Props {
  onChange: (val: boolean) => void;
  isChecked: boolean;
  className?: string;
}

const ZCheckbox: React.FC<Props> = ({ onChange: setChecked, isChecked: checked, className }) => {
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <div className={`${classes.root} ${className}`}>
      <Checkbox classes={{ root: classes.checkboxRoot }} checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'primary checkbox' }} />
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  checkboxRoot: {
    padding: 0,
    margin: 0
  }
}));

ZCheckbox.defaultProps = {};

export default ZCheckbox;
