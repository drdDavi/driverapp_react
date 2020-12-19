import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';

export type IChipMap = {
  name: string;
  id: string;
};

interface Props {
  className?: string;
  valuesMap: IChipMap[];
  selectedIChipsMaps: IChipMap[];
  setSelectedIChipsMaps: (val: IChipMap[]) => void;
}

const ZChipsListMulti: React.FC<Props> = ({ selectedIChipsMaps, className, setSelectedIChipsMaps, valuesMap }) => {
  const classes = useStyles();

  return (
    <div className={`${classes.root} ${className}`}>
      {valuesMap &&
        valuesMap.map((v) => {
          const color = selectedIChipsMaps.includes(v) ? 'primary' : 'secondary';
          return (
            <Chip
              classes={{
                colorPrimary: classes.colorPrimary,
                colorSecondary: classes.colorSecondary,
                clickableColorSecondary: classes.colorSecondary,
                root: classes.colorPrimary,
                clickable: classes.colorPrimary,
                deletable: classes.colorPrimary
              }}
              key={v.id}
              label={v.name}
              clickable
              size='small'
              color={color}
              onClick={() => {
                if (!selectedIChipsMaps.includes(v)) {
                  selectedIChipsMaps.push(v);
                  setSelectedIChipsMaps(Array.from(Object.create(selectedIChipsMaps)));
                } else {
                  setSelectedIChipsMaps(Array.from(Object.create(selectedIChipsMaps.filter((e) => e !== v))));
                }
              }}
            ></Chip>
          );
        })}
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  colorPrimary: {
    backgroundColor: '#6c5ce7',
    padding: 3,
    margin: 2,
    '&:hover, &:focus': {
      backgroundColor: '#6c5ce7'
    }
  },
  colorSecondary: {
    color: 'black',
    backgroundColor: '#dfe6e9',
    padding: 3,
    margin: 2,
    '&:hover, &:focus': {
      backgroundColor: '#dfe6e9'
    }
  }
}));

ZChipsListMulti.defaultProps = {};

export default ZChipsListMulti;
