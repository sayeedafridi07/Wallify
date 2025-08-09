import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScreenConstants } from '../utils/constant';
import HomeScreen from '../screens/HomeScreen';
import { colors } from '../theme/colors';
import Icon from '../components/Icon';
import { StyleSheet, View, Platform } from 'react-native';
import QuizScreen from '../screens/QuizScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import SettingScreen from '../screens/SettingScreen';
import { fontSize, HP, WP } from '../theme/scale';

const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName={ScreenConstants.HOME_SCREEN}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => menuIcons(route, focused),
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
          marginBottom: HP(2),
          marginHorizontal: WP(15),
          borderRadius: HP(4),
          backgroundColor: colors.dark,
          height: HP(8),
        },
        tabBarItemStyle: {
          marginTop: Platform.OS === 'ios' ? HP(1.5) : HP(1.8),
        },
      })}
    >
      <Tab.Screen name={ScreenConstants.HOME_SCREEN} component={HomeScreen} />
      <Tab.Screen name={ScreenConstants.QUIZ_SCREEN} component={QuizScreen} />
      <Tab.Screen
        name={ScreenConstants.FAVOURITE_SCREEN}
        component={FavouriteScreen}
      />
      <Tab.Screen
        name={ScreenConstants.SETTING_SCREEN}
        component={SettingScreen}
        options={{
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tab.Navigator>
  );
}

const menuIcons = (route, focused) => {
  let iconProps = {
    size: fontSize(24),
    color: focused ? colors.dark : colors.light,
    variant: 'outline',
    strokeWidth: 2,
  };

  let iconName;
  if (route.name === ScreenConstants.HOME_SCREEN) {
    iconName = 'HomeIcon';
  } else if (route.name === ScreenConstants.QUIZ_SCREEN) {
    iconName = 'BellIcon';
  } else if (route.name === ScreenConstants.FAVOURITE_SCREEN) {
    iconName = 'HeartIcon';
  } else if (route.name === ScreenConstants.SETTING_SCREEN) {
    iconName = 'Cog8ToothIcon';
  }

  return (
    <View
      style={[
        styles.iconContainer,
        focused && styles.focusedIconContainer
      ]}
    >
      {iconName ? <Icon name={iconName} {...iconProps} /> : null}
    </View>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  iconContainer: {
    width: WP(12),
    height: WP(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusedIconContainer: {
    backgroundColor: colors.background,
    borderRadius: WP(6),
  },
});
