import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import LocalNews from '../screens/LocalNews';
import Technews from '../screens/Technews';
import { Image } from 'react-native';
import HomeSvg from '../../assets/images/home.svg'
import BottomSheetDemo from '../screens/Library';
import { CustomText } from '../components/DbText';


const BottomTab = createBottomTabNavigator();

function BottomTabNavigation() {
    // const tabBarHeight = useBottomTabBarHeight();

    return (
        <BottomTab.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
                tabBarShowLabel: false,
                // headerShown: false,
                // tabBarItemStyle: {
                //     // padding: 5,
                    
                // },
                tabBarStyle: {
                    display: "flex",
                    backgroundColor: '#FCFCFE',
                    padding: 5,
                    height: Platform.OS === 'android'? 65 : 90,
                },
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
                tabBarIcon: ({focused}) => {
                    return focused ? (
                        <View style={styles.labelFocusedContainer}>
                            <Image source={require('../../assets/images/home.png')} color='#4317C0' size={30} />
                            <CustomText caption={`Breaking News`} style={styles.labelFocusedStyle} />
                        </View>
                        ) : (
                        <View style={styles.labelContainer}>
                            <Image source={require('../../assets/images/home.png')} color='gray' size={30} />
                            <CustomText caption={`Breaking News`} style={styles.labelStyle} />
                        </View>
                    );
                },
                tabBarLabel: 'Breaking News',
                tabBarLabelPosition: 'below-icon',
                // tabBarBadge: 3,
                // tabBarBadgeStyle: {
                //     backgroundColor: 'black',
                //     color: 'yellow'
                // },
                tabBarHideOnKeyboard: true,
                headerShown: false,
            }} 
        />
        <BottomTab.Screen 
            name="LocalNews" 
            component={LocalNews} 
            options={
                { tabBarIcon: ({focused}) => {
                    return focused ? (
                        <View style={styles.labelFocusedContainer}>
                            {/* <Image source={require('../../assets/images/home.png')} color='#4317C0' size={30} /> */}
                            <Image source={require('../../assets/images/wallet.png')} color='#4317C0' size={30} />
                            <CustomText caption={`Local News`} style={styles.labelFocusedStyle} />
                        </View>
                        ) : (
                        <View style={styles.labelContainer}>
                            {/* <Image source={require('../../assets/images/home.png')} color='gray' size={30} /> */}
                            <Image source={require('../../assets/images/wallet.png')} color='gray' size={30} />
                            <CustomText caption={`Local News`} style={styles.labelStyle} />
                        </View>
                    );
                },
            tabBarLabel: 'Local News',
            tabBarLabelPosition: 'below-icon',
            // tabBarBadge: 3,
            // tabBarBadgeStyle: {
            //     backgroundColor: 'black',
            //     color: 'yellow'
            // },
            tabBarHideOnKeyboard: true,
            headerShown: false,
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
        <BottomTab.Screen 
            name="Library" 
            component={BottomSheetDemo} 
            options={{ tabBarIcon: ({activeTintColor, size}) => (
                <Image source={require('../../assets/images/element.png')} activeTintColor='green' />
            )
            }} 
        />
        </BottomTab.Navigator>
    );
};

export default BottomTabNavigation;


const styles = StyleSheet.create({
    tabBarStyle : {
        display: "flex",
        backgroundColor: '#FCFCFE',
        padding: 5,
        height: Platform.OS === 'android'? 65 : 90,
    },
    labelFocusedContainer: {
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 3,
        borderBottomColor: '#4317C0',
    },
    labelFocusedStyle: {
        textAlign: 'center',
        margin: 8,
        color: '#4317C0',
        backgroundColor: 'transparent',
        fontSize: 10,
    },
    labelContainer: {
        alignItems: 'center',
        width: '100%',
    },
    labelStyle: {
        textAlign: 'center',
        marginVertical: 5,
        color: 'gray',
        backgroundColor: 'transparent',
        fontSize: 10,
    },

});