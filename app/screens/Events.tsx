import React from 'react';
import {ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import WorldEvents from '../components/WorldEvents';

const Events = () => {
  const {top} = useSafeAreaInsets();
  return (
    <ScrollView style={{marginTop: top}}>
      <WorldEvents />
    </ScrollView>
  );
};

export default Events;
