import Snackbar from 'react-native-snackbar';
import { colors } from '../theme/colors';

class SnackbarUtils {
  showError = text => {
    Snackbar.show({
      textColor: colors.white,
      backgroundColor: colors.error,
      text: text,
      duration: Snackbar.LENGTH_SHORT,
    });
  };

  showInfo = text => {
    Snackbar.show({
      textColor: colors.white,
      backgroundColor: colors.success,
      text: text,
      duration: Snackbar.LENGTH_SHORT,
    });
  };
}

export default new SnackbarUtils();
