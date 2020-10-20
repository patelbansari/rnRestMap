import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RestList from '../screens/RestList';
import Details from '../screens/Details';
import MapView from '../screens/MapScreen';

const Stack = createStackNavigator();

export const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName={'RestList'}>
      <Stack.Screen
        name="RestList"
        component={RestList}
        options={{
          title: 'Restaurant List',
          headerStyle: {
            backgroundColor: '#00FA9A',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerShown: true,
          title: '',
          headerBackTitle: 'Back',
          headerTransparent: true,
        }}
      />

      <Stack.Screen
        name="MapView"
        component={MapView}
        options={{
          title: 'MapView',
          headerStyle: {
            backgroundColor: '#00FA9A',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
};
