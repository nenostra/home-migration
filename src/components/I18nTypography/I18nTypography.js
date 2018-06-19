import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

const I18nTypography = props => {
  const { t, tReady, children, ...rest } = props;
  return (
    <Typography {...rest}>
      {t(children)}
    </Typography>
  );
}

export default translate()(I18nTypography);
