import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomText from '../components/CustomText';
import CustomBox from '../components/CustomBox';
import {GestureHandlerRootView, TextInput} from 'react-native-gesture-handler';
import {Button, ButtonText} from '@gluestack-ui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginService from '../api/LoginService';

const Login = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(true);
  const loginService = new LoginService();

  const refreshToken = async () => {
    const SERVER_BASE_URL = "http://Expens-KongA-ChasZNdaOM4K-1208155051.ap-south-1.elb.amazonaws.com";
    console.log('Inside Refresh token');
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    const response = await fetch(`${SERVER_BASE_URL}/auth/v1/refreshToken`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        token: refreshToken,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      await AsyncStorage.setItem('accessToken', data['accessToken']);
      await AsyncStorage.setItem('refreshToken', data['token']);
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log(
        'Tokens after refresh are ' + refreshToken + ' ' + accessToken,
      );
    }

    return response.ok;
  };

  const gotoHomePageWithLogin = async () => {
    const SERVER_BASE_URL = "http://Expens-KongA-ChasZNdaOM4K-1208155051.ap-south-1.elb.amazonaws.com";
    const response = await fetch(`${SERVER_BASE_URL}/auth/v1/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        username: userName,
        password: password,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      await AsyncStorage.setItem('refreshToken', data['token']);
      await AsyncStorage.setItem('accessToken', data['accessToken']);
      navigation.navigate('Home', {name: 'Home'});
    }
  };

  const gotoSignup = () => {
    navigation.navigate('SignUp', {name: 'SignUp'});
  };

  useEffect(() => {
    const handleLogin = async () => {
      const loggedIn = await loginService.isLoggedIn();
      setLoggedIn(loggedIn);
      if (loggedIn) {
        navigation.navigate('Home', {name: 'Home'});
      } else {
        const refreshed = await refreshToken();
        setLoggedIn(refreshed);
        if (refreshed) {
          setLoggedIn(refreshed);
          navigation.navigate('Home', {name: 'Home'});
        }
      }
    };
    handleLogin();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.loginContainer}>
        <CustomBox style={loginBox}>
          <CustomText style={styles.heading}>Login</CustomText>
          <TextInput
            placeholder="User Name"
            value={userName}
            onChangeText={text => setUserName(text)}
            style={styles.textInput}
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.textInput}
            placeholderTextColor="#888"
            secureTextEntry
          />
        </CustomBox>
        <Button onPressIn={() => gotoHomePageWithLogin()} style={styles.button}>
          <CustomBox style={buttonBox}>
            <CustomText style={{textAlign: 'center'}}>Submit</CustomText>
          </CustomBox>
        </Button>
        <Button onPressIn={() => gotoSignup()} style={styles.button}>
          <CustomBox style={buttonBox}>
            <CustomText style={{textAlign: 'center'}}>Goto Signup</CustomText>
          </CustomBox>
        </Button>
      </View>
    </GestureHandlerRootView>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    marginTop: 20,
    width: '30%',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    color: 'black',
  },
});

const loginBox = {
  mainBox: {
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
  },
  shadowBox: {
    backgroundColor: 'gray',
    borderRadius: 10,
  },
};

const buttonBox = {
  mainBox: {
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  shadowBox: {
    backgroundColor: 'gray',
    borderRadius: 10,
  },
};
