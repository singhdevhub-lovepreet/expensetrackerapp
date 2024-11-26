import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Heading from '../components/Heading';
import Expense from '../components/Expense';
import CustomBox from '../components/CustomBox';
import { ExpenseDto } from './dto/ExpenseDto';

const Spends = () => {
  const expenses: ExpenseDto[] = [
    {
      key: 1,
      amount: 100,
      merchant: 'Amazon',
      currency: 'USD',
      createdAt: new Date(),
    },
    {
      key: 2,
      amount: 50,
      merchant: 'Flipkart',
      currency: 'INR',
      createdAt: new Date(),
    },
  ];

  return (
    <View>
      <Heading
        props={{
          heading: 'spends',
        }}
      />
      <CustomBox style={headingBox}>
        <View style={styles.expenses}>
          {expenses.map(expense => (
            <Expense props={expense} />
          ))}
        </View>
      </CustomBox>
    </View>
  );
};

export default Spends;

const styles = StyleSheet.create({
  expenses: {
    marginTop: 20,
  },
});

const headingBox = {
  mainBox: {
    backgroundColor: 'white',
    borderColor: 'black',
  },
  shadowBox: {
    backgroundColor: 'gray',
  },
  styles:{
    marginTop: 20
  }
};
