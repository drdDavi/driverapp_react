import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from './app_utils/History';
import ZAppBar from './components/ZAppBar';
import ZAppBarDrawer from './components/ZAppBarDrawer';
import { useAppStore } from './models_stores/appStore';
import NotFoundPage from './pages/app/NotFoundPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import SignInPage from './pages/auth/SignInPage';
import DocumentDetailsPage from './pages/main/DocumentDetailsPage';
import DocumentsPage from './pages/main/DocumentsPage';
import NotificationPage from './pages/main/NotificationsPage';

const AppRouterRoutes = () => {
  const classes = useStyles();
  const authUser = useAppStore((state) => state.authUser);
  const isInitializing = useAppStore((state) => state.isInitializing);

  return (
    <div>
      <Router history={history}>
        {!authUser && !isInitializing && (
          <>
            <Grid className={classes.grid}>
              <Switch>{[UnauthenticatedRoutes]}</Switch>
            </Grid>
          </>
        )}

        {authUser && authUser.isAdmin && !isInitializing && (
          <>
            <ZAppBar />
            <Grid className={classes.grid}>
              <ZAppBarDrawer />
              <Grid className={classes.containerAuthenticated}>
                <Switch>{[AuthenticatedRoutesAdmin]}</Switch>
              </Grid>
            </Grid>
          </>
        )}
      </Router>
    </div>
  );
};

const UnauthenticatedRoutes = [
  <Route exact path='/' component={SignInPage} />,
  <Route exact path='/signIn' component={SignInPage} />,
  <Route exact path='/resetPassword' component={ResetPasswordPage} />,
  <Route component={NotFoundPage} />
];

const AuthenticatedRoutesAdmin = [
  <Route exact path='/' component={DocumentsPage} />,
  <Route exact path='/documents' component={DocumentsPage} />,
  <Route exact path='/documentDetails/:id' component={DocumentDetailsPage} />,
  <Route exact path='/notifications' component={NotificationPage} />,
  <Route component={NotFoundPage} />
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      display: 'flex'
    },
    containerAuthenticated: {
      margin: 'auto',
      marginTop: 68,
      padding: 20,
      width: `calc(100% - 240px)`,
      [theme.breakpoints.down('md')]: {
        width: '100%'
      }
    },
    containerUnauthenticated: {}
  })
);

export default AppRouterRoutes;
