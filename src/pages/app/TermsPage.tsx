import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface Props {}

const TermsPage: React.FC<Props> = () => {
  const classes = useStyles();
  return <div>Terms Page</div>;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

TermsPage.defaultProps = {};

export default TermsPage;
