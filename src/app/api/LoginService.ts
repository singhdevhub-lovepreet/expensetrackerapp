import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_BASE_URL } from "react-native-dotenv";

class LoginService {

    constructor() {}

    async isLoggedIn(){
        console.log('Inside login');
        const accessToken = await AsyncStorage.getItem('accessToken');
        console.log('Token is ' + accessToken);
        const response = await fetch(`${SERVER_BASE_URL}/ping`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
            'X-Requested-With': 'XMLHttpRequest',
          },
        });
        return response.ok;
      };

}

export default LoginService;