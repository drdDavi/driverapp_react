import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface Props {}

const LicensesPage: React.FC<Props> = () => {
  const classes = useStyles();
  return <div>Standard Licenses</div>;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

LicensesPage.defaultProps = {};

export default LicensesPage;
