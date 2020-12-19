import { Button, Divider, Drawer, Grid, IconButton, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { GrFormClose } from 'react-icons/gr';
import { AuthUser, IAuthUserRegister, IAuthUserUpdate } from '../models/AuthUserModel';
import { ApiService } from '../models_services/ApiService';
import { FirestoreService } from '../models_services/FirestoreService';
import { useAppStore } from '../models_stores/appStore';
import ZSwitchListTile from './ZSwitchListTile';
import ZTextFormField from './ZTextFromField';
import { RiDeleteBin3Fill } from 'react-icons/ri';

type FormData = {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  isActive: boolean;
  isAdmin: boolean;
};

const options: string[] = ['Personal', 'Work', 'Important', 'Optional', 'Required'];

interface Props {
  openDrawer: boolean;
  setOpenDrawer: (val: boolean) => void;
  user?: AuthUser;
  setSelectedUser?: (val: undefined) => void;
}

const ZDrawerUserAdd: React.FC<Props> = ({ openDrawer, setOpenDrawer, user, setSelectedUser }) => {
  const classes = useStyles();
  const users = useAppStore((state) => state.users);
  const authUser = useAppStore((state) => state.authUser);
  const [isUploadComplete, setIsUploadComplete] = React.useState<boolean>(false);
  const [isEmailTaken, setIsEmailTaken] = React.useState<boolean>(false);
  const [isActive, setIsActive] = React.useState<boolean>(true);
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  const [isShowDelete, setIsShowDelete] = React.useState<boolean>(false);
  const { handleSubmit, errors, control, getValues } = useForm<FormData>({ mode: 'onSubmit', reValidateMode: 'onChange' });

  React.useEffect(() => {
    setIsShowDelete(false);
    setIsUploadComplete(false);
    if (user) {
      setIsActive(user.isActive);
      setIsAdmin(user.isAdmin);
    } else {
      setIsActive(true);
      setIsAdmin(false);
    }
  }, [openDrawer, user]);

  const onDeleteUser = async () => {
    if (user) {
      const res = await ApiService.userDelete(user.id);
      if (res) setOpenDrawer(false);
    }
  };

  const onSubmit = handleSubmit(async (data: FormData) => {
    console.log(isAdmin);

    if (!user) {
      setIsEmailTaken(false);
      if (users.map((x) => x.email).includes(data.email.toLowerCase())) return setIsEmailTaken(true);

      const authUser: IAuthUserRegister = {
        email: data.email.toLowerCase(),
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        isAdmin: isAdmin
      };
      const res = await ApiService.userAdd(authUser);
      if (res) {
        setIsUploadComplete(true);
        setIsAdmin(false);
      }
    }

    if (user) {
      const authUser: IAuthUserUpdate = {
        id: user.id,
        firstName: data.firstName,
        lastName: data.lastName,
        isAdmin: isAdmin,
        isActive: isActive
      };

      const res = await FirestoreService.userUpdate(authUser);
      if (res) setOpenDrawer(false);
    }
  });

  return (
    <Drawer
      anchor='right'
      open={openDrawer}
      onClose={() => {
        setOpenDrawer(false);
        setIsShowDelete(false);
        setIsUploadComplete(false);
      }}
    >
      <Grid container justify='space-between' alignItems='center'>
        <Grid container item xs={8}>
          {!isShowDelete && user && !user.isAdmin && user.id !== authUser?.id ? (
            <>
              <IconButton
                className={classes.iconButtonContainer}
                onClick={() => {
                  setIsShowDelete(true);
                }}
              >
                <RiDeleteBin3Fill className={classes.iconButtonDelete} />
              </IconButton>
              <Typography className={classes.title} variant='h6' id='tableTitle' component='div'>
                {'Update user'}
              </Typography>
            </>
          ) : (
            <Typography className={classes.title} variant='h6' id='tableTitle' component='div'>
              {!user ? 'Create a new user' : 'Update user'}
            </Typography>
          )}
        </Grid>

        <IconButton
          onClick={() => {
            setOpenDrawer(false);
          }}
        >
          <GrFormClose />
        </IconButton>
      </Grid>

      <Divider />

      {!isUploadComplete && !user && !isShowDelete && (
        <Grid className={classes.root}>
          <Grid className={classes.textFieldContainer} container>
            <Grid item xs={12} md={12}>
              <ZTextFormField
                className={classes.textField}
                defaultValue={getValues().email}
                error={errors.email}
                rules={{ required: 'Invalid email address', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' } }}
                label='Email'
                name='email'
                control={control}
              />
            </Grid>

            {isEmailTaken && <Typography className={classes.emailTaken}>Email is already in use!</Typography>}

            <Grid item xs={12} md={12}>
              <ZTextFormField
                className={classes.textField}
                defaultValue={getValues().password}
                error={errors.password}
                rules={{
                  minLength: {
                    value: 6,
                    message: 'Min 6 characters'
                  },
                  maxLength: {
                    value: 10,
                    message: 'Max 10 characters'
                  }
                }}
                label='Password'
                name='password'
                control={control}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <ZTextFormField className={classes.textField} defaultValue={getValues().firstName} error={errors.firstName} label='First Name' name='firstName' control={control} />
            </Grid>

            <Grid item xs={12} md={12}>
              <ZTextFormField className={classes.textField} defaultValue={getValues().lastName} error={errors.lastName} label='Last Name' name='lastName' control={control} />
            </Grid>

            <Grid item xs={12} md={12}>
              <ZSwitchListTile label='Active' value={isActive} onChange={(v) => setIsActive(v)} disbaled />
            </Grid>
            <Grid item xs={12} md={12}>
              <ZSwitchListTile label='Admin' value={isAdmin} onChange={(v) => setIsAdmin(v)} />
            </Grid>
          </Grid>

          <Grid container alignItems='center' justify='center'>
            <Button type='submit' onClick={onSubmit} className={classes.buttonSave} size='medium' color='primary' fullWidth variant='contained'>
              Save User
            </Button>
          </Grid>
        </Grid>
      )}

      {!isUploadComplete && user && !isShowDelete && (
        <Grid className={classes.root}>
          <Grid item xs={12} md={12}>
            <ZTextFormField
              disabled
              className={classes.textField}
              defaultValue={user.email}
              error={errors.email}
              rules={{ required: 'Invalid email address', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' } }}
              label='Email'
              name='email'
              control={control}
            />
          </Grid>

          <Grid className={classes.textFieldContainer} container>
            <Grid item xs={12} md={12}>
              <ZTextFormField
                className={classes.textField}
                defaultValue={user?.firstName ?? getValues().firstName}
                error={errors.firstName}
                label='First Name'
                name='firstName'
                control={control}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <ZTextFormField
                className={classes.textField}
                defaultValue={user?.lastName ?? getValues().lastName}
                error={errors.lastName}
                label='Last Name'
                name='lastName'
                control={control}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <ZSwitchListTile label='Active' value={isActive} onChange={(v) => setIsActive(v)} />
            </Grid>
            <Grid item xs={12} md={12}>
              <ZSwitchListTile label='Admin' value={isAdmin} onChange={(v) => setIsAdmin(v)} disbaled={user.id === authUser?.id} />
            </Grid>
          </Grid>

          <Grid container alignItems='center' justify='center'>
            <Button type='submit' onClick={onSubmit} className={classes.buttonSave} size='medium' color='primary' fullWidth variant='contained'>
              Save User
            </Button>
          </Grid>
        </Grid>
      )}

      {isShowDelete && user && (
        <Grid className={classes.root}>
          <Grid item xs={12} md={12}>
            <ZTextFormField
              disabled
              className={classes.textField}
              defaultValue={user.email}
              error={errors.email}
              rules={{ required: 'Invalid email address', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' } }}
              label='Email'
              name='email'
              control={control}
            />
          </Grid>

          <Grid className={classes.textFieldContainer} container>
            <Grid item xs={12} md={12}>
              <ZTextFormField
                disabled
                className={classes.textField}
                defaultValue={user?.firstName ?? getValues().firstName}
                error={errors.firstName}
                label='First Name'
                name='firstName'
                control={control}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <ZTextFormField
                disabled
                className={classes.textField}
                defaultValue={user?.lastName ?? getValues().lastName}
                error={errors.lastName}
                label='Last Name'
                name='lastName'
                control={control}
              />
            </Grid>
          </Grid>

          <Grid container alignItems='center' justify='center'>
            <Button type='submit' onClick={onDeleteUser} className={classes.buttonSave} size='medium' color='secondary' fullWidth variant='contained'>
              Delete User
            </Button>
          </Grid>

          <Grid container alignItems='center' justify='center'>
            <Typography className={classes.deleteText}>This action can't be undone!!</Typography>
          </Grid>

          <Grid container alignItems='center' justify='center'>
            <Button
              type='submit'
              onClick={() => {
                setIsShowDelete(false);
              }}
              className={classes.buttonSave}
              size='medium'
              color='primary'
              fullWidth
              variant='outlined'
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      )}

      {isUploadComplete && (
        <Grid className={classes.uploadContainer} container alignItems='center'>
          <Grid item xs={12} container justify='center' alignItems='center' direction='column'>
            <img className={classes.uploadImg} src={require('../assets/images/successUpload.png')} alt='' />
            <p>Upload Successful!</p>
          </Grid>

          <Grid item xs={12} container justify='center'>
            <Button
              className={classes.uploadCompleteButton}
              onClick={() => {
                setOpenDrawer(false);
                setIsUploadComplete(false);
              }}
              variant='outlined'
            >
              Close
            </Button>
            <Button
              className={classes.uploadCompleteButton}
              variant='contained'
              color='primary'
              onClick={() => {
                setIsUploadComplete(false);
              }}
            >
              Upload again
            </Button>
          </Grid>
        </Grid>
      )}
    </Drawer>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 420
  },
  iconButtonDelete: {
    padding: 0,
    fontSize: 22,
    color: theme.palette.secondary.light
  },
  title: {
    padding: '17.5px 10px',
    fontWeight: 400,
    fontSize: 18
  },

  textField: {
    margin: '4px 10px'
  },
  iconButtonContainer: {
    padding: 0,
    marginLeft: 10
  },
  buttonContainer: {
    padding: '0px 20px'
  },
  buttonSave: {
    margin: 10
  },
  uploadContainer: {
    marginTop: 40
  },
  emailTaken: {
    color: 'red',
    marginLeft: 12
  },
  uploadImg: {
    height: 120,
    width: 120
  },

  uploadCompleteButton: {
    width: 140,
    margin: '0px 10px'
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
    marginTop: 5,
    marginBottom: 15
  },
  imageContainer: {
    height: 180,

    [theme.breakpoints.down('xs')]: {
      height: 180
    },
    '& img': {
      height: 190,
      objectFit: 'cover'
    }
  },
  deleteText: {
    color: 'red',
    padding: 10
  }
}));

ZDrawerUserAdd.defaultProps = {};

export default ZDrawerUserAdd;
