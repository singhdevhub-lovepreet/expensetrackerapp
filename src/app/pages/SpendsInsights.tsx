import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from '../components/CustomText';

const SpendsInsights = () => {
    const insightsData = [
        { id: '1', label: 'Status', value: 'At Risk' },
        { id: '2', label: 'Amount limit', value: '10,000 Rs.' },
        { id: '3', label: 'Most Spend Category', value: 'Shopping' },
      ];

    return (
    <View style={styles.spendingStatusContainer}> 
      {insightsData.map((insight)=>(
        <View key={insight.id}>
            <CustomText style={{}}>{insight.id}. {insight.label}: {insight.value}</CustomText>
        </View>
      ))}  
    </View>
  )
}

export default SpendsInsights

const styles = StyleSheet.create({
    spendingStatusContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 10
    }
})