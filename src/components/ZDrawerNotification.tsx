import { Button, CircularProgress, Divider, Drawer, Grid, IconButton, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { GrFormClose } from 'react-icons/gr';
import { RiCloseCircleLine } from 'react-icons/ri';
import { getFirebaseStorageDownloadUrlList } from '../app_utils/ImageFileToURI';
import { fireFirebase } from '../firebase/firebase';

import { FirestoreService } from '../models_services/FirestoreService';
import { useAppStore } from '../models_stores/appStore';
import ZChipsList, { IChipMap } from './ZChipsLists';
import ZTextFormField from './ZTextFromField';
import { NotificationModel } from '../models/NotificationModel';

type FormData = {
  body: string;
  title: string;
  linkUrl: string;
};

export type IImageFile = {
  url?: string;
  file?: File;
  index?: number;
};

interface Props {
  openDrawer: boolean;
  setOpenDrawer: (val: boolean) => void;
  notification?: NotificationModel;
  setSelectedNotification?: (val: undefined) => void;
}

const ZDrawerProductAdd: React.FC<Props> = ({ openDrawer, setOpenDrawer, notification, setSelectedNotification: setSelectedProduct }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [isUploading, setIsUploading] = React.useState<boolean>(false);

  const { handleSubmit, errors, control, getValues } = useForm<FormData>({ mode: 'onSubmit', reValidateMode: 'onChange' });

  const onSubmit = handleSubmit(async (data: FormData) => {
    setIsUploading(true);

    if (!notification) {
      const res = await FirestoreService.notificationAdd({ title: data.title, body: data.body, linkUrl: data.linkUrl ?? '' });
      enqueueSnackbar('Notification sent!');
      if (res) setOpenDrawer(false);
    }
    if (notification) {
      notification.title = data.title;
      notification.body = data.body;
      notification.linkUrl = data.linkUrl ?? '';
      const res = await FirestoreService.notificationUpdate(notification);
      setOpenDrawer(false);
      enqueueSnackbar('Notification sent!');
    }

    setIsUploading(false);
  });

  React.useEffect(() => {
    setIsUploading(false);
  }, [openDrawer, notification]);

  return (
    <Drawer anchor='right' open={openDrawer} onClose={() => setOpenDrawer(false)}>
      <Grid className={classes.drawerWidth}>
        <Grid container justify='space-between' alignItems='center'>
          <Grid item>
            <Typography className={classes.title} variant='h6' id='tableTitle'>
              Create a new notification
            </Typography>
          </Grid>
        </Grid>
        <Divider />

        <Grid className={classes.drawerWidth}>
          <Grid container>
            <Grid item xs={12}>
              <ZTextFormField
                className={classes.textField}
                defaultValue={notification?.title ?? getValues().title}
                error={errors.title}
                label='Title'
                name='title'
                control={control}
              />
            </Grid>

            {/* <Grid item xs={12}>
              <ZTextFormField
                className={classes.textField}
                defaultValue={notification?.linkUrl ?? getValues().linkUrl}
                error={errors.linkUrl}
                label='Url Link'
                name='linkUrl'
                control={control}
              />
            </Grid> */}

            <Grid item xs={12}>
              <ZTextFormField
                className={classes.textField}
                rows={4}
                defaultValue={notification?.body ?? getValues().body}
                error={errors.body}
                label='Message'
                name='body'
                control={control}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid className={classes.footer}>
          <Divider className={classes.footerDivider} />
          <Grid className={classes.footerContent}>
            {notification && (
              <Button
                type='submit'
                onClick={() => {
                  if (notification) FirestoreService.notificationDelete(notification);
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
            </Grid>

            {!isUploading ? (
              <Button type='submit' onClick={onSubmit} className={classes.buttonSave} size='small' color='primary' fullWidth variant='contained'>
                {notification ? 'Update' : 'Send Notification'}
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
  drawerWidth: {
    width: 720,
    overflowX: 'auto'
  },
  containerDropzoneOuter: {
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
  zChipContainer: {
    width: 720,
    maxWidth: 720,
    margin: '14px 0px 8px 0px'
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

  buttonSave: {
    margin: '0px 5px',
    maxWidth: 140
  },
  paperDimensions: {
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '100%',
    height: 960,
    [theme.breakpoints.down('md')]: {
      paddingBottom: '20px'
    }
  },
  textFieldContainer: {
    marginTop: 8,
    marginBottom: 8
  },
  textField: {
    margin: '4px 16px'
  }
}));

ZDrawerProductAdd.defaultProps = {};

export default ZDrawerProductAdd;
