import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './src/Home';
import Order from './src/Order';

const route = createStackNavigator({
  Main:{screen:Home, navigationOptions:{header:null}},
  Secondary:{screen:Order, navigationOptions:{header:null}}
});

const App = createAppContainer(route);

export default App;