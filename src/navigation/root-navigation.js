import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from './tab-navigation';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tab" component={TabNavigation} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
