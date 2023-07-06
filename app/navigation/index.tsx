import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  EventsIcon,
  GalleryIcon,
  HomeIcon,
  SpaceIcon,
  WeatherIcon,
} from '../assets/navigation';
import Events from '../screens/Events';
import Gallery from '../screens/Gallery';
import Home from '../screens/Home';
import Space from '../screens/Space';
import Weather from '../screens/Weather';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const {bottom, top} = useSafeAreaInsets();
  return (
    <Tab.Navigator
      safeAreaInsets={{bottom, top}}
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: () => {
          const icons = {
            Home: <HomeIcon />,
            Gallery: <GalleryIcon />,
            Events: <EventsIcon />,
            Weather: <WeatherIcon />,
            Space: <SpaceIcon />,
          };
          return icons[route.name as keyof typeof icons];
        },
      })}>
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="Gallery" component={Gallery} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Space" component={Space} />
      <Tab.Screen name="Weather" component={Weather} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
