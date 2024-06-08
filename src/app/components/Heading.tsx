import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Box} from '@gluestack-ui/themed';
import CustomText from './CustomText';
import CustomBox from './CustomBox';

const Heading = () => {
  return (
    <View>
      <CustomBox style={headingBox}>
        <CustomText style={{}}>Your Recent Spends</CustomText>
      </CustomBox>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  headingContainer: {
    padding: 20,
    borderColor: 'black',
    borderWidth: 1,
    position: 'relative',
    backgroundColor: 'black',
  },
  textColor: {
    color: 'white',
  },
  shadowContainer: {
    position: 'absolute',
    top: 5,
    left: 5,
    right: -5,
    bottom: -5,
    backgroundColor: 'gray',
    zIndex: -1,
  }
});

const headingBox = {
  mainBox: {
    backgroundColor: '#171A21',
  },
  shadowBox: {
    backgroundColor: 'gray',
  },
};