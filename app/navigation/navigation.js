import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RestList from '../screens/RestList';
import Details from '../screens/Details';

const Stack = createStackNavigator()

export const MainStack = () => {
    return(
        <Stack.Navigator initialRouteName={"RestList"}>
        <Stack.Screen name="RestList" component={RestList} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    )
}