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
import {Colors} from '../ui/colors';
import {navStyles} from './styles';
import {MAIN_SCREENS} from './types';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const {bottom, top} = useSafeAreaInsets();
  return (
    <Tab.Navigator
      safeAreaInsets={{bottom, top}}
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          const icons: Record<MAIN_SCREENS, React.JSX.Element> = {
            [MAIN_SCREENS.HOME]: <HomeIcon color={color} fontSize={size} />,
            [MAIN_SCREENS.GALLERY]: <GalleryIcon color={color} />,
            [MAIN_SCREENS.EVENTS]: <EventsIcon color={color} />,
            [MAIN_SCREENS.WEATHER]: <WeatherIcon color={color} />,
            [MAIN_SCREENS.SPACE]: <SpaceIcon color={color} />,
          };
          return icons[route.name as MAIN_SCREENS];
        },
        tabBarActiveTintColor: Colors.dark,
        tabBarInactiveTintColor: Colors.ceruleanlight,
        tabBarAllowFontScaling: true,
        headerTitleAllowFontScaling: true,
        tabBarStyle: navStyles.tabBarStyle,
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}>
      <Tab.Screen name={MAIN_SCREENS.EVENTS} component={Events} />
      <Tab.Screen name={MAIN_SCREENS.GALLERY} component={Gallery} />
      <Tab.Screen name={MAIN_SCREENS.HOME} component={Home} />
      <Tab.Screen name={MAIN_SCREENS.SPACE} component={Space} />
      <Tab.Screen name={MAIN_SCREENS.WEATHER} component={Weather} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
