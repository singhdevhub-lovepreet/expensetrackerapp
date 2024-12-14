import AsyncStorage from '@react-native-async-storage/async-storage';

class LoginService {

    constructor() {}

    async isLoggedIn(){
        const SERVER_BASE_URL = "http://Expens-KongA-ChasZNdaOM4K-1208155051.ap-south-1.elb.amazonaws.com";
        console.log('Inside login');
        const accessToken = await AsyncStorage.getItem('accessToken');
        console.log('Token is ' + accessToken);
        const response = await fetch(`${SERVER_BASE_URL}/auth/v1/ping`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
            'X-Requested-With': 'XMLHttpRequest',
          },
        });
        const responseBody = await response.text();
        console.log("Response body in isLoggedIn(): ", responseBody);
        const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(responseBody.trim());
        return isValidUUID;
      };

}

export default LoginService;