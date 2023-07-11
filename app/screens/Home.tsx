import React from 'react';
import {ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DailyImage from '../components/DailyImage';

const Home = () => {
  const {top} = useSafeAreaInsets();
  return (
    <ScrollView style={{marginTop: top}}>
      <DailyImage />
    </ScrollView>
  );
};

export default Home;
