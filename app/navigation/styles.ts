import {StyleSheet} from 'react-native';
import {Colors} from '../ui/colors';

export const navStyles = StyleSheet.create({
  tabBarStyle: {
    height: 95,
    paddingTop: 10,
    shadowColor: Colors.dark,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 5,
  },
});
