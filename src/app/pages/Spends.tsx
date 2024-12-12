import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Heading from '../components/Heading';
import Expense from '../components/Expense';
import CustomBox from '../components/CustomBox';
import { ExpenseDto } from './dto/ExpenseDto';
import {SERVER_BASE_URL} from "react-native-dotenv";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomText from '../components/CustomText';

const Spends = () => {
  const [expenses, setExpenses] = useState<ExpenseDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await fetch(`${SERVER_BASE_URL}/expense/v1/getExpense`, {
        method: 'GET',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }

      const data = await response.json();
      const transformedExpenses: ExpenseDto[] = data.map((expense: any, index: number) => ({
        key: index + 1,
        amount: expense.amount,
        merchant: expense.merchant,
        currency: expense.currency,
        createdAt: new Date()
      }));

      setExpenses(transformedExpenses);
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View>
        <Heading props={{ heading: 'spends' }} />
        <CustomBox style={headingBox}>
          {/* You might want to create a Loading component */}
          <CustomText style={{}}>Loading expenses...</CustomText>
        </CustomBox>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Heading props={{ heading: 'spends' }} />
        <CustomBox style={headingBox}>
          <CustomText style={{}}>Error</CustomText>
        </CustomBox>
      </View>
    );
  }

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
            <Expense key={expense.key} props={expense} />
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