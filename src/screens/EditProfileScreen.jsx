import React, { useState } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import TopBar from '../components/TopBar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { HP, WP } from '../theme/scale';
import CustomInputField from '../components/CustomInputField';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { commonStyles } from '../utils/commonStyles';
import SnackbarUtils from '../utils/SnackbarUtils';
import ProgressOpacity from './ProgressOpacity';
import user from '../data/user';
import { colors } from '../theme/colors';

export default function EditProfileScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    image: user?.image || '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOnChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
    setErrors({
      ...errors,
      [key]: null,
    });
  };

  const validateForm = formData => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,}$/;

    if (!formData.name) {
      errors.name = 'Name is required';
    }
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Enter a valid email';
    }

    return errors;
  };

  const handleSubmit = async () => {
    SnackbarUtils.showInfo('Profile updated successfully');
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: colors.white,
      }}
      extraScrollHeight={20}
      enableOnAndroid={true}
      scrollEnabled={true}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <TopBar title="Edit Profile" />
      {/* Login Form */}
      <View style={styles.container}>
        <Animated.View
          entering={FadeInDown.delay(200).duration(700).springify()}
        >
          <CustomInputField
            label="Name"
            placeholder="Enter your name"
            value={formData.name}
            error={errors.name}
            onChangeText={text => handleOnChange('name', text)}
            isMandatory
          />
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(300).duration(700).springify()}
        >
          <CustomInputField
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            error={errors.email}
            onChangeText={text => handleOnChange('email', text)}
            keyboardType="email-address"
            isMandatory
          />
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(500).duration(700).springify()}
        >
          <CustomInputField
            label="Address"
            placeholder="Enter your address"
            value={formData.address}
            error={errors.address}
            onChangeText={text => handleOnChange('address', text)}
            multiline
          />
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(700).duration(700).springify()}
        >
          <ProgressOpacity
            title="Submit"
            loading={isSubmitting}
            disabled={isSubmitting}
            onPress={handleSubmit}
            style={commonStyles.primaryBtnSmall}
          />
        </Animated.View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: WP(5),
    marginTop: HP(2),
  },
});
