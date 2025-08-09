import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';
import { commonStyles } from "../utils/commonStyles";

const ProgressOpacity = ({
  onPress,
  onLongPress,
  title,
  style,
  disabled,
  loading,
  txtStyle,
}) => {
  return (
    <TouchableOpacity
      style={[style, loading ? commonStyles.disabledBtn : null]}
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <Text style={[commonStyles.btnTxt, txtStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default ProgressOpacity;
