import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  HStack,
  VStack,
} from '@gluestack-ui/themed';
import CustomText from '../components/CustomText';

function Nav(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <CustomText style={{}}>Logo</CustomText>
      <CustomText style={{}}>ExpenseTrackerApp</CustomText>
      <VStack space="2xl">
        <HStack space="md">
          <Avatar>
            <AvatarFallbackText>SS</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
              }}
              alt="profile image"
            />
          </Avatar>
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
