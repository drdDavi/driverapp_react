import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Divider, Grid, Typography } from '@material-ui/core';

import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useSnackbar } from 'notistack';
import { fireAuth, fireFirebase } from '../../firebase/firebase';
import { Colors } from '../../styles/Colors';
import ZTextFormField from '../../components/ZTextFromField';

interface Props {}

type FormData = {
  email: string;
};

const ResetPasswordPage: React.FC<Props> = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { handleSubmit, errors, control, getValues } = useForm<FormData>({ mode: 'onSubmit', reValidateMode: 'onChange' });

  const onSubmit = handleSubmit(async (data: FormData) => {
    console.log('from', data);
    try {
      await fireAuth.sendPasswordResetEmail(data.email);
      enqueueSnackbar('Email sent');
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
            Reset password
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

          <Button type='submit' onClick={onSubmit} className={classes.submitButton} fullWidth variant='contained' color='primary'>
            <Typography className={classes.submitButtonText}>Sign In</Typography>
          </Button>

          <Divider className={classes.divider} />
          <Typography className={classes.dontHaveAccount} component={Link} to='/signIn'>
            <span> Go to Sign In</span>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fontStyle: 'italic'
  },
  heading: {
    fontSize: '2em',
    fontStyle: 'italic',
    fontWeight: 600,
    marginBottom: '45px'
  },
  leftContainer: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      backgroundColor: '#6C5CE7',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      justifyItems: 'center',
      padding: '10px'
    }
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
    height: '170px',
    marginBottom: '50px',
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
    backgroundColor: '#FFF',
    marginTop: '40px',
    color: '#000',
    textTransform: 'none'
  },
  goggleIcon: {
    marginRight: '5px',
    fontSize: '24px'
  },
  divider: {
    marginTop: '60px',
    marginBottom: '20px'
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
  }
}));

ResetPasswordPage.defaultProps = {};

export default ResetPasswordPage;
