import React from 'react';
import { createBottomTabNavigator, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import LocalNews from '../screens/LocalNews';
import Technews from '../screens/Technews';
import { Image } from 'react-native';
import HomeSvg from '../../assets/images/home.svg'


const BottomTab = createBottomTabNavigator();

function BottomTabNavigation() {
    // const tabBarHeight = useBottomTabBarHeight();

  return (
    <BottomTab.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
            headerShown: false,
            tabBarItemStyle: {
                // padding: 5,
                
            },
            tabBarStyle: {  height: 60, },
            tabBarLabelStyle: {
                fontSize: 12,
                // padding: 10,
                marginBottom: 10,
                justifyContent: 'center'
                // fontFamily: Fonts.Bold_Italic_Font,
            },
        }}
    >
      {/* <BottomTab.Screen name="Home" component={HomeScreen} /> */}
      <BottomTab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{ 
            tabBarIcon: ({color, size}) => (
            // <Image source={require('../../assets/images/home.png')} color='green' size={30} />
            <HomeSvg width={20} height={20} />

            ),
            tabBarLabel: 'HomeScreen',
            // tabBarShowLabel: false,
            tabBarLabelPosition: 'below-icon',
            // tabBarBadge: 3,
            // tabBarBadgeStyle: {
            //     backgroundColor: 'black',
            //     color: 'yellow'
            // },
            tabBarActiveTintColor: '#3813A0',
            tabBarInactiveTintColor: '#67656E',
            // tabBarActiveBackgroundColor: '#3813A0',
            // tabBarInactiveBackgroundColor: 'yellow',
            tabBarHideOnKeyboard: true,
            tabBarItemStyle: {
                // paddingVertical: 5,
            }
        }} 
      />
      <BottomTab.Screen 
        name="LocalNews" 
        component={LocalNews} 
        options={
            { tabBarIcon: ({activeTintColor, size}) => (
            <Image source={require('../../assets/images/wallet.png')} activeTintColor='green' />
        ),
        // tabBarActiveBackgroundColor: '#3813A0',
        tabBarActiveTintColor: '#3813A0',

        }
    } 
      />
      <BottomTab.Screen 
        name="TechNews" 
        component={Technews} 
        options={{ tabBarIcon: ({activeTintColor, size}) => (
            <Image source={require('../../assets/images/element.png')} activeTintColor='green' />
        )
        }} 
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigation;
