import { View, Text } from 'react-native'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import DrawerNav from './DrawerNav';
import TopBarNavigation from './TopBarNavigation';
import BottomTabNavigation from './BottomNavigation';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />

                {/* <Stack.Screen
                    name="Dashboard"
                    component={DashboardScreen}
                    options={{ headerShown: false }}
                /> */}

                <Stack.Screen
                    name="DrawerNav"
                    component={DrawerNav}
                    options={{ headerShown: false }}
                />
                
                <Stack.Screen
                    name="TopBarNav"
                    component={TopBarNavigation}
                    options={{ headerShown: false }}
                />
                
                <Stack.Screen
                    name="BottomNav"
                    component={BottomTabNavigation}
                    options={{ headerShown: false }}
                />
                
            </Stack.Navigator>

        </NavigationContainer>
    )
};

export default AppNavigation;
