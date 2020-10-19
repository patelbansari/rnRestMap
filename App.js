import React from 'react';
import {MainStack} from './app/navigation/navigation';
import {store} from './app/redux/store/Store';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import DbRnRestMap from './app/database/DbRnRestMap';

const App = () => {
  DbRnRestMap.openDatabase()

  return (
    <Provider store={store}>
      <NavigationContainer>{MainStack()}</NavigationContainer>
    </Provider>
  );
};

export default App;
