import {StyleSheet, View, Image, Platform} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import { ExpenseDto } from '../pages/dto/ExpenseDto';
import { theme } from '../theme/theme';

interface ExpenseProps {
  props: ExpenseDto;
}

const Expense: React.FC<ExpenseProps> = ({props}) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <View style={styles.expenseContainer} key={props.key}>
      <View style={styles.leftContent}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: 'https://media.istockphoto.com/id/1206806317/vector/shopping-cart-icon-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=1RRQJs5NDhcB67necQn1WCpJX2YMfWZ4rYi1DFKlkNA='}}
            style={styles.expenseImage}
          />
        </View>
        <View style={styles.merchantInfo}>
          <CustomText style={styles.merchantText}>{props.merchant}</CustomText>
          <CustomText style={styles.dateText}>{formatDate(props.createdAt)}</CustomText>
        </View>
      </View>
      <View style={styles.rightContent}>
        <CustomText style={styles.amountText}>
          {props.currency} {props.amount.toFixed(2)}
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  expenseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginVertical: theme.spacing.xs,
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.effects.shadow.medium.color,
        shadowOffset: theme.colors.effects.shadow.medium.offset,
        shadowOpacity: theme.colors.effects.shadow.medium.opacity,
        shadowRadius: theme.colors.effects.shadow.medium.radius,
      },
      android: {
        elevation: 4,
      },
    }),
    borderWidth: 1,
    borderColor: theme.colors.effects.glass.borderColor,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  imageContainer: {
    backgroundColor: theme.colors.surface.elevated,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.xs,
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.effects.shadow.light.color,
        shadowOffset: theme.colors.effects.shadow.light.offset,
        shadowOpacity: theme.colors.effects.shadow.light.opacity,
        shadowRadius: theme.colors.effects.shadow.light.radius,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  rightContent: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  expenseImage: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
  },
  merchantInfo: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  merchantText: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    marginBottom: 4,
  },
  dateText: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.sm,
    lineHeight: theme.typography.lineHeight.tight,
  },
  amountText: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
  },
});

export default Expense;