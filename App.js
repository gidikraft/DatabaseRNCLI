/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { Store }  from './src/redux/store';
import DrawerNav from './src/navigation/DrawerNav';
import AppNavigation from './src/navigation/AppNavigation';
import TopBarNavigation from './src/navigation/TopBarNavigation';

const App = () => {

  return (
    <StoreProvider store={ Store }>
      
      <AppNavigation />
      {/* <TopBarNavigation /> */}

      {/* <DrawerNav /> */}

    </StoreProvider>
    
    
  );
};

export default App;
