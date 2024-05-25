import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Heading from '../components/Heading';
import Expense from '../components/Expense';
import CustomBox from '../components/CustomBox';

const Spends = () => {
  const expenses = [
    {
      id: '1',
      amount: '150 Rs',
      merchant: 'Third Wave Coffee',
    },
    {
      id: '2',
      amount: '250 Rs',
      merchant: 'Amazon',
    },
    {
      id: '3',
      amount: '80 Rs',
      merchant: 'Uber Eats',
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
