import React from 'react';
import {ScrollView, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Space = () => {
  const {top} = useSafeAreaInsets();
  return (
    <ScrollView style={{marginTop: top}}>
      <Text>Space</Text>
    </ScrollView>
  );
};

export default Space;
