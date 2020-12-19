import * as React from 'react';
import { Button, makeStyles, Theme, createStyles } from '@material-ui/core';

interface Props {
  history: object;
}

const NotFoundPage: React.FC<Props> = (props: any) => {
  const classes = useStyles();

  const goBack = () => {
    props.history.goBack();
  };

  return (
    <div className={classes.container}>
      <h1>Sorry, Page Not Found :(</h1>
      <Button variant='contained' size='large' color='secondary' onClick={() => goBack()}>
        Go Back
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
    flexDirection: 'column',
  },
}));

export default NotFoundPage;
