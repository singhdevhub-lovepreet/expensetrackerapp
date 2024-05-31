import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../components/CustomText';
import CustomBox from '../components/CustomBox';
import {GestureHandlerRootView, TextInput} from 'react-native-gesture-handler';
import {Button, ButtonText} from '@gluestack-ui/themed';

const SignUp = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const navigateToLoginScreen = () => {
    console.log("Submitted from sign up");
    navigation.navigate('Login', {name: 'Login'})
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.signupContainer}>
        <CustomBox style={signUpBox}>
          <CustomText style={styles.heading}>Sign Up</CustomText>
          <TextInput
            placeholder="First Name"
            value={firstName}
            onChangeText={text => setFirstName(text)}
            style={styles.textInput}
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={text => setLastName(text)}
            style={styles.textInput}
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.textInput}
            placeholderTextColor="#888"
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.textInput}
            placeholderTextColor="#888"
            secureTextEntry
          />
          <TextInput
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
            style={styles.textInput}
            placeholderTextColor="#888"
            keyboardType="phone-pad"
          />
        </CustomBox>
        <Button onPressIn={() => navigateToLoginScreen()} style={styles.button}>
            <CustomBox style={buttonBox}>
                <CustomText style={{textAlign: 'center'}}>Submit</CustomText>
            </CustomBox>
          </Button>
      </View>
    </GestureHandlerRootView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  signupContainer: {
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

const signUpBox = {
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

