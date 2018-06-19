import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Header from '../src/components/Header/Header';
import Headline from '../src/components/Headline/Headline';
//import SearchWidget from '../src/components/SearchWidget/SearchWidget';
import withRoot from '../src/withRoot';
import dynamic from 'next/dynamic'

const SearchWidget = dynamic(
  import('../src/components/SearchWidget/SearchWidget'),
  {
    ssr: false,
    //loading: () => <p>...</p> CUSTOM LOADING COMPONENT EXAMPLE
  }
)

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

const Index = ({ classes }) => (
  <Grid container direction="column" className={classes.root}>
    <Grid item>
      <Grid container direction="column"  justify="center" className={classes.image}> {/* CONTENEDOR DE IMAGEN DEL BACKGROUND */}
        <Grid item>
          <Header />
        </Grid>
        <Grid item>
          <Headline />
        </Grid>
        <Grid item>
          {/* // IMPORTAR SOLO EN EL BROWSER */}
          <SearchWidget />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
