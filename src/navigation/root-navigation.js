import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from './tab-navigation';
import { ScreenConstants } from '../utils/constant';
import WallpaperListScreen from '../screens/WallpaperListScreen';
import WallpaperDetailScreen from '../screens/WallpaperDetailScreen';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tab" component={TabNavigation} />
      <Stack.Screen
        name={ScreenConstants.WALLPAPER_LIST_SCREEN}
        component={WallpaperListScreen}
      />
      <Stack.Screen
        name={ScreenConstants.WALLPAPER_DETAIL_SCREEN}
        component={WallpaperDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
