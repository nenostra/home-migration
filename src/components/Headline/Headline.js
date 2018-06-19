import Typography from '@material-ui/core/Typography';
import I18nTypography from '../I18nTypography/I18nTypography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    background: 'transparent',
    boxShadow: 'none',
  },
});

const Headline = ({ classes }) => (
  <div className={classes.root}>
    <I18nTypography align="center" variant="subheading" component="h1" color="default">
      {'index:heading'}
    </I18nTypography>
  </div>
);

export default withStyles(styles)(Headline);
