import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import { IImageFile } from './ZDrawerNotification';

interface Props {
  onChangeFile?: (file: File | undefined) => void;
  imageFile: IImageFile;
  setImageFile?: (val: IImageFile) => void;
  className?: string | undefined;
}

const ZImagePicker: React.FC<Props> = ({ onChangeFile, className, imageFile, setImageFile }) => {
  const classes = useStyles();
  const [image, setImage] = React.useState<File>();

  const [imageStr, setImageStr] = React.useState<string>();

  async function updateImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      if (event.target.files[0]) {
        if (onChangeFile) onChangeFile(event.target.files[0]);
        if (setImageFile) setImageFile({ ...imageFile, file: event.target.files[0], url: undefined });
        setImage(event.target.files[0]);
        setImageStr(URL.createObjectURL(event.target.files[0]));
      }
    }
  }
  async function removeImage() {
    if (onChangeFile) onChangeFile(undefined);

    if (setImageFile) setImageFile({ ...imageFile, file: undefined, url: undefined });
    setImage(undefined);
    setImageStr(undefined);
  }

  return (
    <Grid className={`${classes.root} ${className}`}>
      {!imageStr && !imageFile.url && (
        <div>
          <input accept='image/*' style={{ display: 'none' }} id='raised-button-file' onChange={updateImage} type='file' />
          <label htmlFor='raised-button-file'>
            <Button variant='contained' color='primary' component='span'>
              Upload
            </Button>
          </label>
        </div>
      )}

      {imageStr && !imageFile.url && (
        <div>
          <img src={imageStr} alt='' />
          <Button className={classes.btnRemove} onClick={removeImage} variant='contained' color='primary' component='div'>
            Remove
          </Button>
        </div>
      )}

      {imageFile.url && (
        <div>
          <img src={imageFile.url} alt='' />
          <Button className={classes.btnRemove} onClick={removeImage} variant='contained' color='primary' component='div'>
            Remove
          </Button>
        </div>
      )}
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    height: 240,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: ' center',
    border: '2px solid rgba(146, 168, 209, .25)',
    borderRadius: 5,
    cursor: 'pointer',
    padding: 10,
    margin: '10px 10px',
    [theme.breakpoints.down('xs')]: {
      height: 240
    },
    '& img': {
      height: 240,
      objectFit: 'cover'
    }
  },

  btnRemove: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 10,
    background: 'red',
    '&:hover': {
      background: 'red'
    }
  }
}));

ZImagePicker.defaultProps = {};

export default ZImagePicker;
