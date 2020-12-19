import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Chip, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box/Box';

export type IChipMap = {
  name: string;
  id: string;
};

interface Props {
  className?: string;
  valuesMap?: IChipMap[];
  selectedIChipsMap?: IChipMap;
  setSelectedIChipsMap?: (val: IChipMap) => void;
}

const ZChipsList: React.FC<Props> = ({ selectedIChipsMap: selectedIChips, className, setSelectedIChipsMap: setSelectedIChips, valuesMap }) => {
  const classes = useStyles();
  return (
    <Box flexWrap='wrap' className={`${classes.root} ${className}`}>
      {valuesMap &&
        valuesMap.map((v) => {
          const color = v.id === selectedIChips?.id ? 'primary' : 'secondary';
          return (
            <Chip
              classes={{ colorPrimary: classes.colorPrimary, colorSecondary: classes.colorSecondary }}
              key={v.id}
              label={v.name}
              clickable
              size='small'
              color={color}
              onClick={() => {
                if (setSelectedIChips) setSelectedIChips(v);
              }}
            ></Chip>
          );
        })}
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: '100%'
  },
  colorPrimary: {
    backgroundColor: '#6c5ce7',
    padding: 3,
    margin: 3,
    '&:hover': {
      backgroundColor: '#6c5ce7'
    }
  },
  colorSecondary: {
    color: 'black',
    backgroundColor: '#dfe6e9',
    padding: 3,
    margin: 3,
    '&:hover': {
      backgroundColor: '#dfe6e9'
    }
  }
}));

ZChipsList.defaultProps = {};

export default ZChipsList;
