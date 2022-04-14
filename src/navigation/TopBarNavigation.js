import { View, Text } from 'react-native'
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import LocalNews from '../screens/LocalNews';

const Tab = createMaterialTopTabNavigator();

const TopBarNavigation = () => {
  return (
    // <NavigationContainer>
        <Tab.Navigator>
            {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="LocalNews" component={LocalNews} />
        </Tab.Navigator>

    // </NavigationContainer>
  )
}

export default TopBarNavigation;
