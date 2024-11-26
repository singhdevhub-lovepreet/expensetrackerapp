import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import Spends from '../pages/Spends';

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Spends: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
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
        <Stack.Screen name="Spends" component={Spends} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
