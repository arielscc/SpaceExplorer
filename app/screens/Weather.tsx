import React from 'react';
import {ScrollView, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Weather = () => {
  const {top} = useSafeAreaInsets();
  return (
    <ScrollView style={{marginTop: top}}>
      <Text>Weather</Text>
    </ScrollView>
  );
};

export default Weather;
