import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/app/pages/Home';
import SignUp from './src/app/pages/SignUp';
import Login from './src/app/pages/Login';
import Profile from './src/app/pages/Profile';
import { enableScreens } from 'react-native-screens';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';

enableScreens(true);

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                headerShown: true,
                headerTitle: 'Profile',
                headerShadowVisible: false,
                headerStyle: {
                  backgroundColor: 'transparent',
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}

export default App;
