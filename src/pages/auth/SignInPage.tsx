import { Button, Divider, Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link, useHistory } from 'react-router-dom';
import ZTextFormField from '../../components/ZTextFromField';
import { fireAuth, fireFirebase } from '../../firebase/firebase';
import { useAppStore } from '../../models_stores/appStore';
import { Colors } from '../../styles/Colors';
import history from '../../app_utils/History';

interface Props {}

type FormData = {
  email: string;
  password: string;
};

const SignInPage: React.FC<Props> = (props: any) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const authUser = useAppStore((state) => state.authUser);
  const streamAuthUser = useAppStore((state) => state.streamAuthUser);
  const streamProducts = useAppStore((state) => state.streamDocuments);
  const streamCategories = useAppStore((state) => state.streamNotifications);
  const streamUsers = useAppStore((state) => state.streamUsers);
  const { handleSubmit, errors, control, getValues } = useForm<FormData>({ mode: 'onSubmit', reValidateMode: 'onChange' });

  useEffect(() => {
    if (authUser) history.push('/');
  }, [authUser]);

  const onSubmit = handleSubmit(async (data: FormData) => {
    try {
      const res: firebase.auth.UserCredential = await fireAuth.signInWithEmailAndPassword(data.email, data.password);

      streamAuthUser();
      streamCategories();
      streamUsers();
      streamProducts();

      history.push('/');
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message);
    }
  });

  return (
    <Grid className={classes.root} container>
      <Grid className={classes.leftContainer} item md={6}>
        <img className={classes.logo} src={require('../../assets/images/signInPortfolio.png')} alt='logo' />
      </Grid>
      <Grid className={classes.rightContainter} item xs={12} md={6}>
        <Grid className={classes.rightContainterInner}>
          <img className={classes.logoRight} src={require('../../assets/images/signInPortfolio.png')} alt='logo' />
          <Typography align='center' className={classes.heading}>
            Sign In to Ground Standards
          </Typography>

          <ZTextFormField
            className={classes.signInItem}
            defaultValue={getValues().email}
            error={errors.email}
            rules={{ required: 'Invalid email address', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' } }}
            label='Email'
            name='email'
            control={control}
          />

          <ZTextFormField
            className={classes.signInItem}
            defaultValue={getValues().password}
            error={errors.password}
            type='password'
            label='Password'
            name='password'
            control={control}
          />
          <Button type='submit' onClick={onSubmit} className={classes.submitButton} fullWidth variant='contained' color='primary'>
            <Typography className={classes.submitButtonText}>Sign In</Typography>
          </Button>
          <Link to='/resetPassword'>
            <Typography className={classes.resetLink} align='right'>
              Reset Password
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fontStyle: 'italic'
  },
  leftContainer: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      height: '100vh',
      backgroundColor: '#6C5CE7',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      justifyItems: 'center',
      padding: '10px'
    }
  },
  submitButton: {
    height: '45px',
    background: Colors.buttonBlue,
    margin: '10px 0px'
  },
  submitButtonText: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '19px',
    textTransform: 'uppercase',
    fontStyle: 'italic'
  },
  resetLink: {
    margin: '1em 0 5em',
    color: Colors.textGrey
  },
  leftContainerText: {
    fontStyle: 'italic',
    fontSize: '40px',
    lineHeight: '60px',
    textAlign: 'center',
    color: '#fff',
    width: '50%',
    maxWidth: '400px'
  },
  logoRight: {
    height: '100px',
    marginBottom: '50px',
    display: 'block',
    margin: 'auto',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  logo: {
    height: '370px',
    marginBottom: '150px',
    display: 'block'
  },
  rightContainter: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    justifyItems: 'center',
    padding: '10px'
  },
  rightContainterInner: {
    margin: 'auto',
    width: '100%',
    maxWidth: '400px'
  },

  signInItem: {
    margin: '20px 0px'
  },
  signInText: {
    fontSize: '24px',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  resetPassword: {
    marginTop: '10px',
    fontSize: '14px',
    display: 'flex',
    justifyContent: 'flex-end',
    textDecoration: 'none'
  },
  dontHaveAccount: {
    marginTop: '10px',
    color: '#000',
    fontSize: '16px',
    display: 'flex',
    justifyContent: 'center',
    textDecoration: 'none',

    '& span': {
      marginLeft: '5px',
      color: '#6C5CE7',
      fontWeight: 'bold'
    }
  },
  buttonGoogleSignIn: {
    border: `1px solid rgba(112, 112, 112, 0.44)`,
    width: '100%',
    height: '45px',
    color: Colors.black,
    marginBottom: 45,
    //text styles
    fontStyle: 'italic',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '19px',
    textTransform: 'capitalize'
  },
  goggleIcon: {
    marginRight: '5px',
    fontSize: '24px'
  },
  divider: {
    marginTop: '60px',
    marginBottom: '20px'
  },
  heading: {
    fontSize: '2em',
    fontWeight: 600,
    marginBottom: '45px'
  }
}));

SignInPage.defaultProps = {};

export default SignInPage;
