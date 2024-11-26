import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  HStack,
  VStack,
} from '@gluestack-ui/themed';
import CustomText from '../components/CustomText';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Profile: undefined;
  // Add other screen params here
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

function Nav(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp>();

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <CustomText style={{}}>Logo</CustomText>
      <CustomText style={{}}>ExpenseTrackerApp</CustomText>
      <VStack space="2xl">
        <HStack space="md">
          <TouchableOpacity onPress={handleProfilePress}>
            <Avatar>
              <AvatarFallbackText>SS</AvatarFallbackText>
              <AvatarImage
                source={{
                  uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
                }}
                alt="profile image"
              />
            </Avatar>
          </TouchableOpacity>
        </HStack>
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
});

export default Nav;
