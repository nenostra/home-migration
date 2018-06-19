import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    background: 'transparent',
    boxShadow: 'none',
  },
  toolbar: {
    padding: 0,
  },
  menuButton: {
  },
});

const Header = ({ classes }) => (
  <AppBar position="static" className={classes.root}>
    <Toolbar className={classes.toolbar}>
      <Grid container alignItems="center">
        <Grid item xs>
          <IconButton className={classes.menuButton} color="default" aria-label="Menu" disableRipple>
            <MenuIcon />
          </IconButton>
        </Grid>
        <Grid item xs>
          <Typography align="center" variant="title" color="default">
            {/* USE AN ICON COMPONENT OR SOMETHING SIMILAR INSTEAD */}
            Logo
          </Typography>
        </Grid>
        <Grid item xs>
          {/* RESERVED TO CENTER THE LOGO AND FUTURE LOGIN OR SOSMETHING*/}
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(Header);
