import { OutlinedInput } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

export type IMultiSelectValue = {
  name: string;
  id?: string;
};

interface Props {
  valuesMap: IMultiSelectValue[];
  setSelectedIValue?: (val: IMultiSelectValue) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const ZTextMultiSelect: React.FC<Props> = ({ valuesMap, setSelectedIValue }) => {
  const classes = useStyles();
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedValues(event.target.value as string[]);
  };

  return (
    <div>
      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel variant='outlined' margin='dense' classes={{}} id='demo-mutiple-checkbox-labe'>
          Tag
        </InputLabel>
        <Select
          fullWidth
          labelId='demo-mutiple-checkbox-label'
          id='demo-mutiple-checkbox'
          multiple
          value={selectedValues}
          onChange={handleChange}
          input={<OutlinedInput fullWidth label={'Tag'} margin='dense' className={classes.color} />}
          renderValue={(selected) => (selected as string[]).join(', ')}
          MenuProps={MenuProps}
        >
          {valuesMap &&
            valuesMap.map((value) => (
              <MenuItem key={value.id} value={value.name}>
                <Checkbox checked={selectedValues.indexOf(value.name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      width: 300,
      minWidth: 120,
      maxWidth: 300
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    chip: {
      margin: 2
    },
    noLabel: {
      marginTop: theme.spacing(3)
    },
    color: {
      color: 'black'
    },
    label: {
      transform: `translate(14px, 14px) scale(1)`
    }
  })
);

ZTextMultiSelect.defaultProps = {};

export default ZTextMultiSelect;
