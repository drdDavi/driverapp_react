import { createMuiTheme } from '@material-ui/core/styles';
import { BreakpointOverrides } from '@material-ui/core/styles/createBreakpoints';
import { Shadows } from '@material-ui/core/styles/shadows';

declare module '@material-ui/core/styles/createBreakpoints' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

export const theme = createMuiTheme({
  breakpoints: {
    values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920, tablet: 400, laptop: 900, desktop: 1200 }
  },

  shadows: Array(25).fill('none') as Shadows,

  props: {
    MuiInput: { disableUnderline: true },
    MuiButton: { disableElevation: true },
    MuiButtonBase: { disableRipple: true },
    MuiPaper: { elevation: 0 },
    MuiCard: { elevation: 0 },
    MuiDivider: { color: 'white' },
    MuiOutlinedInput: {}
  },
  overrides: {
    MuiPaper: {
      root: {
        elevation: 0
      }
    },
    MuiCard: {
      root: {
        elevation: 0
      }
    },
    MuiButton: {
      root: {
        textTransform: 'capitalize'
      }
    }
  },
  palette: {
    background: {
      default: '#F2F5F7'
    }
  }
});

export const breakpoint = {
  xs: `(min-width: 0px)`,
  sm: `(min-width: 576px)`,
  md: `(min-width: 768px)`,
  lg: `(min-width: 992px)`,
  xl: `(min-width: 1200px)`
};
