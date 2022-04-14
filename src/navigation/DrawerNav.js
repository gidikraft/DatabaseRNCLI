import { View, Text } from 'react-native'
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import DrawerNavContent from '../components/DrawerNavContent';
import LocalNews from '../screens/LocalNews';

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  return (
    // <NavigationContainer >

        <Drawer.Navigator 
            // initialRouteName="Home"
            drawerContent={props => <DrawerNavContent {...props} />}
        >
            {/* <Drawer.Screen name="Home" component={HomeScreen} /> */}
            <Drawer.Screen name="Dashboard" component={DashboardScreen} />
            <Drawer.Screen name="LocalNews" component={LocalNews} />
        </Drawer.Navigator>
    // </NavigationContainer>
    
  )
}