import { View, Text } from 'react-native'
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import LocalNews from '../screens/LocalNews';
import { Colors, Fonts } from '../utils';
import Technews from '../screens/Technews';

const Tab = createMaterialTopTabNavigator();

const TopBarNavigation = () => {
  return (
    // <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: 'yellow',
            tabBarInactiveTintColor: '#F1F1F1',
            activeBackgroundColor: '#CE4418',
            inactiveBackgroundColor: '#b55031',
              tabBarStyle: {
                backgroundColor: Colors.Background_Brown,
                paddingBottom: 3
              },
              tabBarLabelStyle: {
                fontSize: 14,
                fontFamily: Fonts.Bold_Italic_Font,
              },
          }}
        >
            {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="LocalNews" component={LocalNews} />
            <Tab.Screen name="TechNews" component={Technews} />
        </Tab.Navigator>

    // </NavigationContainer>
  )
}

export default TopBarNavigation;
