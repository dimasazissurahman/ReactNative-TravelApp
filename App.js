import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './src/Home';
import Order from './src/Order';

const route = createStackNavigator({
  Home:{screen:Home, navigationOptions:{headerShown:false}},
  Order:{screen:Order, navigationOptions:{headerShown:false}}
});

const App = createAppContainer(route);

export default App;