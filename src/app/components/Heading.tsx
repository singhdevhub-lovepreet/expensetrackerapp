import {View, StyleSheet} from 'react-native';
import React from 'react';
import CustomBox from './CustomBox';
import CustomText from './CustomText';
import {theme} from '../theme/theme';

const Heading = () => {
  return (
    <View style={styles.container}>
      <CustomBox style={styles.headingBox}>
        <CustomText style={styles.headingText}>Your Recent Spends</CustomText>
      </CustomBox>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.md,
  },
  headingBox: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
  },
  headingText: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize['2xl'],
    fontFamily: theme.typography.fontFamily.sans,
    fontWeight: theme.typography.fontWeight.bold,
  },
});

export default Heading;