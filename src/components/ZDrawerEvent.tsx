import { Button, CircularProgress, Divider, Drawer, Grid, IconButton, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { GrFormClose } from 'react-icons/gr';

import { FirestoreService } from '../models_services/FirestoreService';
import ZTextFormField from './ZTextFromField';
import { DocumentModel } from '../models/DocumentModel';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { RiCloseCircleLine } from 'react-icons/ri';
import { getFirebaseStorageDownloadUrl } from '../app_utils/ImageFileToURI';
import { useSnackbar } from 'notistack';

type FormData = {
  subTitle: string;
  title: string;
};

interface IFileWithPath extends FileWithPath {
  preview?: string;
}

interface Props {
  openDrawer: boolean;
  setOpenDrawer: (val: boolean) => void;
  event?: DocumentModel;
  setSelectedEvent?: (val: undefined) => void;
}

const ZDrawerEvent: React.FC<Props> = ({ openDrawer, setOpenDrawer, event, setSelectedEvent }) => {
  const classes = useStyles();
  const [uploadComplete, setUploadComplete] = React.useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const [isUploading, setIsUploading] = React.useState<boolean>(false);
  const [file, setFile] = React.useState<IFileWithPath>();
  const [imagesUrlCurrent, setImageUrlCurrent] = React.useState<string>();
  const { handleSubmit, errors, control, getValues } = useForm<FormData>({ mode: 'onSubmit', reValidateMode: 'onChange' });

  React.useEffect(() => {
    setImageUrlCurrent('');
    setFile(undefined);
    // if (event) setImageUrlCurrent(event.imageURL);
  }, [event]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0])
        })
      );
      console.log(file);
    },
    maxFiles: 1,
    multiple: false
  });

  const thumbsImageUrlsCurrent = (
    <>
      {imagesUrlCurrent && (
        <div className={classes.thumb}>
          <RiCloseCircleLine
            className={classes.thumbDelete}
            onClick={() => {
              setImageUrlCurrent(undefined);
            }}
          />
          <div className={classes.thumbInner}>
            <img className={classes.thumbImage} src={imagesUrlCurrent} alt='preview' />
          </div>
        </div>
      )}
    </>
  );

  const thumbs = (
    <>
      {file && (
        <div className={classes.thumb}>
          <RiCloseCircleLine
            className={classes.thumbDelete}
            onClick={() => {
              setFile(undefined);
            }}
          />
          <div className={classes.thumbInner}>
            <img className={classes.thumbImage} src={file.preview} alt='preview' />
          </div>
        </div>
      )}
    </>
  );

  const onSubmit = handleSubmit(async (data: FormData) => {
    setIsUploading(true);
    if (!file && !imagesUrlCurrent) {
      enqueueSnackbar('Please select an image');
      return;
    }

    if (!event) {
      const imageURL = await getFirebaseStorageDownloadUrl({ file: file as File });
      const res = await FirestoreService.eventAdd({ title: data.title, subTitle: data.subTitle, imageURL: imageURL });
      if (res) {
        setUploadComplete(true);
        setOpenDrawer(false);
      }
      if (!res) setUploadComplete(false);
    }

    if (event) {
      // let imageURL = event.imageURL;

      if (file) {
        // imageURL = await getFirebaseStorageDownloadUrl({ file: file as File });
      }

      // event.title = data.title;
      // event.subTitle = data.subTitle;
      // event.imageURL = imageURL;
      const res = await FirestoreService.eventUpdate(event);
      if (res) {
        if (setSelectedEvent) setSelectedEvent(undefined);
        setOpenDrawer(false);
        setUploadComplete(false);
      }
    }

    setIsUploading(false);
  });
  return (
    <Drawer
      anchor='right'
      open={openDrawer}
      onClose={() => {
        setOpenDrawer(false);
        setFile(undefined);
      }}
    >
      <Grid className={classes.root} container justify='space-between' alignItems='center'>
        <Typography className={classes.title} variant='h6' id='tableTitle' component='div'>
          Create a new event
        </Typography>
        <IconButton
          onClick={() => {
            setOpenDrawer(false);
            setUploadComplete(false);
          }}
        >
          <GrFormClose />
        </IconButton>
      </Grid>
      <Divider />

      <Grid className={classes.textFieldContainer} container>
        <Grid item xs={12}>
          {/* <ZTextFormField className={classes.textField} defaultValue={event?.title ?? getValues().title} error={errors.title} label='Title' name='title' control={control} /> */}
        </Grid>

        <Grid item xs={12}>
          <ZTextFormField
            rows={4}
            className={classes.textField}
            // defaultValue={event?.subTitle ?? getValues().subTitle}
            error={errors.subTitle}
            label='Message'
            name='subTitle'
            control={control}
          />
        </Grid>
      </Grid>

      {!file && !imagesUrlCurrent && (
        <Grid className={classes.containerDropzoneOuter}>
          <div {...getRootProps({ className: 'dropzone' })}>
            <div className={classes.containerDropzoneInner}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </div>
        </Grid>
      )}
      <aside className={classes.thumbsContainer}>{thumbsImageUrlsCurrent}</aside>
      <aside className={classes.thumbsContainer}>{thumbs}</aside>

      <Grid className={classes.footer}>
        <Divider className={classes.footerDivider} />
        <Grid className={classes.footerContent}>
          {event && (
            <Button
              type='submit'
              onClick={() => {
                if (event) FirestoreService.eventDelete(event);
                setOpenDrawer(false);
                enqueueSnackbar('Event deleted');
              }}
              className={classes.buttonSave}
              size='small'
              color='secondary'
              fullWidth
              variant='outlined'
            >
              Delete
            </Button>
          )}

          <Grid container justify='flex-end'>
            <Button type='submit' onClick={onSubmit} className={classes.buttonSave} size='small' color='primary' fullWidth variant='outlined'>
              Cancel
            </Button>

            {!isUploading ? (
              <Button type='submit' onClick={onSubmit} className={classes.buttonSave} size='small' color='primary' fullWidth variant='contained'>
                {event ? 'Update Event' : 'Add Event'}
              </Button>
            ) : (
              <Button type='submit' onClick={onSubmit} className={classes.buttonSave} size='small' color='primary' fullWidth variant='contained' disabled>
                <CircularProgress className={classes.circularProgress} size={20} />
                Saving
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Drawer>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 720
  },

  footer: {
    width: 720,
    bottom: 0,
    position: 'fixed'
  },
  footerDivider: {
    width: 720
  },
  footerContent: {
    padding: '14px 16px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  circularProgress: {
    marginLeft: 0,
    marginRight: 10
  },
  title: {
    padding: '17.5px 20px',
    fontWeight: 400,
    fontSize: 18
  },
  textFieldContainer: {
    marginTop: 10
  },

  textField: {
    margin: '4px 16px'
  },
  eventAlreadyExists: {
    color: 'red',
    marginLeft: 20,
    marginTop: -10
  },
  buttonContainer: {
    padding: '0px 20px'
  },
  buttonSave: {
    margin: '0px 5px',
    maxWidth: 130
  },
  uploadContainer: {
    marginTop: 40
  },
  uploadImg: {
    height: 120,
    width: 120
  },
  uploadCompleteButton: {
    width: 140,
    margin: '0px 10px'
  },
  containerDropzoneOuter: {
    margin: '5px 16px',
    padding: '10px 0px'
  },
  containerDropzoneInner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderColor: `rgb(238, 238, 238)`,
    backgroundColor: `rgb(250, 250, 250)`,
    padding: 20,
    height: 100,
    width: '100%'
  },
  thumbsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginBottom: 10,
    padding: '5px 16px'
  },
  thumb: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    height: 300,
    padding: 10,
    boxSizing: 'border-box',
    width: '100%'
  },
  thumbDelete: {
    zIndex: 1000,
    position: 'absolute',
    top: 5,
    right: 5,
    fontSize: 20,
    color: 'red',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  thumbInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  },
  thumbImage: {
    objectFit: 'cover',
    height: '100%'
  }
}));

ZDrawerEvent.defaultProps = {};

export default ZDrawerEvent;
