import * as React from 'react';
import { Button, makeStyles, Theme, createStyles } from '@material-ui/core';

interface Props {
  history: object;
}

const SignInAlready: React.FC<Props> = (props: any) => {
  const classes = useStyles();

  const goBack = () => {
    props.history.push('/');
  };

  return (
    <div className={classes.container}>
      <h1>Your are currently signed in...</h1>
      <Button variant='contained' size='large' color='secondary' onClick={() => goBack()}>
        Go Home
      </Button>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '100%',
    height: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
}));

export default SignInAlready;
