import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Header from '../src/components/Header/Header';
import Headline from '../src/components/Headline/Headline';
import withRoot from '../src/withRoot';
import dynamic from 'next/dynamic'

// ONLY AN EXAMPLE OF HOW TO STYLE COMPONENTS
const styles = theme => ({
  root: {
    padding: '0 16px', // use theme spacing
    //paddingTop: theme.spacing.unit * 20, example of theme spacing
  },
  image: { // PENSAR EN MANEJO DE ASSETS
    //backgroundImage: 'url("https://lh3.googleusercontent.com/-qXCAjMbJ9ZY/WmE8r-GdqMI/AAAAAAAAAgo/yq6N37-Xbk0seJvxb8swvYtJZeOUBSF_gCL0BGAYYCw/h502/2018-01-18.jpg")',
  }
});

const About = ({ classes }) => (
  <div>About</div>
);

export default withRoot(withStyles(styles)(About));
