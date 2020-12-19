import { CssBaseline, MuiThemeProvider, StylesProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { theme } from './app_utils/MuiTheme';
import AppRouterRoutes from './AppRoutes';
import { useAppStore } from './models_stores/appStore';

function App() {
  const streamAuthUser = useAppStore((state) => state.streamAuthUser);
  const streamProducts = useAppStore((state) => state.streamDocuments);
  const streamCategories = useAppStore((state) => state.streamNotifications);
  const streamUsers = useAppStore((state) => state.streamUsers);

  React.useEffect(() => {
    streamAuthUser();
    streamCategories();
    streamUsers();
    streamProducts();
  }, []); // eslint-disable-line

  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <StylesProvider injectFirst>
          <AppRouterRoutes></AppRouterRoutes>
        </StylesProvider>
      </MuiThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
