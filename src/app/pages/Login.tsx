import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomText from '../components/CustomText';
import CustomBox from '../components/CustomBox';
import {GestureHandlerRootView, TextInput} from 'react-native-gesture-handler';
import {Button, ButtonText} from '@gluestack-ui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const isLoggedIn = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const response = await fetch('http://localhost:9898/ping', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + accessToken
      }
    });
  
    return response.ok;
  };

  const refreshToken = async () => {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    const response = await fetch('http://localhost:9898/auth/v1/refreshToken', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({
        'token': refreshToken
      }),
    });
  
    if (response.ok) {
      const data = await response.json();
      await AsyncStorage.setItem('refreshToken', data["refresh_token"]);
      await AsyncStorage.setItem('accessToken', data["token"]);
    }
  
    return response.ok;
  };

  useEffect(() => {
    const handleLogin = async () => {
      const loggedIn = await isLoggedIn();
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
        <Button onPressIn={() => alert('pressed')} style={styles.button}>
            <CustomBox style={buttonBox}>
                <CustomText style={{textAlign: 'center'}}>Submit</CustomText>
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
    width: "30%",
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

