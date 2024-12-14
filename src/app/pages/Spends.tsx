import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Heading from '../components/Heading';
import Expense from '../components/Expense';
import CustomBox from '../components/CustomBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomText from '../components/CustomText';
import {ExpenseDto} from '../pages/dto/ExpenseDto';

const Spends = () => {
  const [expenses, setExpenses] = useState<ExpenseDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const SERVER_BASE_URL = "http://Expens-KongA-ChasZNdaOM4K-1208155051.ap-south-1.elb.amazonaws.com";
      const accessToken = await AsyncStorage.getItem('accessToken');

      if (!accessToken) {
        throw new Error('No access token found.');
      }

      const response = await fetch(`${SERVER_BASE_URL}/expense/v1/getExpense`, {
        method: 'GET',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('Token is:', accessToken);

      if (!response.ok) {
        throw new Error(`Failed to fetch expenses. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Expenses fetched:', data);

      const transformedExpenses: ExpenseDto[] = data.map((expense: any, index: number) => ({
        key: index + 1,
        amount: expense["amount"],
        merchant: expense["merchant"],
        currency: expense["currency"],
        createdAt: new Date(expense["created_at"]),
      }));
      console.log("Transformed expenses:", transformedExpenses);

      setExpenses(transformedExpenses);
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching expenses:', err);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View>
        <Heading props={{ heading: 'spends' }} />
        <CustomBox style={headingBox}>
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
          <CustomText style={{}}>Error: {error}</CustomText>
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
  styles: {
    marginTop: 20,
  },
};