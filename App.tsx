import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeModules, PermissionsAndroid, DeviceEventEmitter } from 'react-native';
import Home from './src/app/pages/Home';
import SignUp from './src/app/pages/SignUp';
import Login from './src/app/pages/Login';
import Profile from './src/app/pages/Profile';
import { enableScreens } from 'react-native-screens';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

enableScreens(true);

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const [receiveSmsPermission, setReceiveSmsPermission] = useState('');

  const requestSmsPermission = async () => {
    try {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS
      );
      setReceiveSmsPermission(permission);
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessageToAPI = async (message: string) => {
    try {
      const SERVER_BASE_URL = "http://Expens-KongA-2WtyFX4S4gfL-259881575.ap-south-1.elb.amazonaws.com";
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log("SMS got is: ", message);
      const response = await fetch(
        `${SERVER_BASE_URL}/v1/ds/message`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message })
        }
      );
      console.log("Message sent to API and response got is: ", response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Message sent successfully:', responseData);
    } catch (error) {
      console.error('Error sending message to API:', error);
    }
  };

  useEffect(() => {
    requestSmsPermission();
  }, []);

  useEffect(() => {
    if (receiveSmsPermission === PermissionsAndroid.RESULTS.GRANTED) {
      const subscriber = DeviceEventEmitter.addListener(
        'onSMSReceived',
        (message) => {
          try {
            const { messageBody, senderPhoneNumber } = JSON.parse(message);
            sendMessageToAPI(messageBody);
          } catch (error) {
            console.error('Error processing SMS:', error);
          }
        }
      );

      return () => {
        subscriber.remove();
      };
    }
  }, [receiveSmsPermission]);

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