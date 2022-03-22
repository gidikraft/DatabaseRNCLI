/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {useColorScheme, } from 'react-native';
import { Colors, } from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import { Provider as StoreProvider } from 'react-redux';
import { Store }  from './src/redux/store'

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <StoreProvider store={ Store }>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            // options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ headerShown: false }}
          />
          
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
    
    
  );
};

export default App;
