import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface Props {}

const AboutPage: React.FC<Props> = () => {
  const classes = useStyles();
  return <div>Aboussr</div>;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

AboutPage.defaultProps = {};

export default AboutPage;
