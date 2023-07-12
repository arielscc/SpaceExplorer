import React from 'react';
import {ScrollView, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Gallery = () => {
  const {top} = useSafeAreaInsets();
  return (
    <ScrollView style={{marginTop: top}}>
      <Text>Gallery</Text>
    </ScrollView>
  );
};

export default Gallery;
