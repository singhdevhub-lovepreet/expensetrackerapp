import { View, Text } from 'react-native'
import React from 'react'
import { useState } from 'react'
import CircularProgress from 'react-native-circular-progress-indicator'
import 'react-native-gesture-handler'

const ExpenseTrackerGraph = () => {
  const [value, setValue] = useState(0);
  return (
    <View style={{
      marginLeft: 20
    }}>
        <CircularProgress
          radius={90}
          value={85}
          titleColor='#222'
          titleFontSize={20}
          valueSuffix="%"
          inActiveStrokeColor={'#2ecc71'}
          inActiveStrokeOpacity={0.2}
          duration={3000}
          onAnimationComplete={()=>setValue(50)}
        />
    </View>
  )
}

export default ExpenseTrackerGraph