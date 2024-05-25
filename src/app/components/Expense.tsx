import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import CustomText from './CustomText';

const Expense = ({props}) => {
  return (
    <View style={styles.expenseContainer} id={props.id}>
      <Image
        source={{uri: 'https://media.istockphoto.com/id/1206806317/vector/shopping-cart-icon-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=1RRQJs5NDhcB67necQn1WCpJX2YMfWZ4rYi1DFKlkNA='}}
        style={styles.expenseImage}
      />
      <View style={styles.expenseDetails}>
        <CustomText style={styles.expenseText}>{props.amount}</CustomText>
        <CustomText style={styles.expenseText}>{props.merchant}</CustomText>
      </View>
    </View>
  );
};

export default Expense;

const styles = StyleSheet.create({
  expenseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    flex: 1,
  },
  expenseImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  expenseDetails: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  expenseText: {
    marginBottom: 5,
    marginLeft: 10
  },
});