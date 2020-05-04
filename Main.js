import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from './src/Containers/Home';
import Order from './src/Containers/Order';
import LoginRegister from './src/Containers/LoginRegister';
import HomeTourGuide from './src/Containers/HomeTourGuide';
import Profile from './src/Containers/Profile';
import { SideBar } from './src/Components/SideBar';
import Setting from './src/Containers/Setting';
import ProfileTourist from './src/Containers/ProfileTourist';




const Authentication = createStackNavigator({
  Login: { screen: LoginRegister, navigationOptions: { headerShown: false } }
})

const HomeScreen = ({ navigation }) => <Home navigation={navigation} />
const OrderScreen = ({ navigation }) => <Order navigation={navigation} />
const ProfileScreen = ({ navigation }) => <Profile navigation={navigation} />
const ProfileTouristScreen = ({ navigation }) => <ProfileTourist navigation={navigation} />
const HomeTourGuideScreen = ({navigation}) => <HomeTourGuide navigation={navigation} />
const SettingScreen = ({navigation}) => <Setting navigation={navigation} />

const DrawerNavigatorTourist = createDrawerNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      title: "Home"
    }
  },
  OrderScreen: {
    screen: OrderScreen,
    navigationOptions: {
      title: "History"
    }
  },
  ProfileScreen: {
    screen: ProfileTouristScreen,
    navigationOptions: {
      title: "Profile"
    }
  },
  SettingScreen: {
    screen: SettingScreen,
    navigationOptions: {
      title: "Settings"
    }
  }
}, {
  contentComponent: props => <SideBar {...props} />
});

const DrawerNavigatorTourGuide = createDrawerNavigator({
  HomeScreen: {
    screen: HomeTourGuideScreen,
    navigationOptions: {
      title: "Home"
    }
  },
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: {
      title: "Profile"
    }
  },
  SettingScreen: {
    screen: SettingScreen,
    navigationOptions: {
      title: "Settings"
    }
  }
}, {
  contentComponent: props => <SideBar {...props} />
});

const route = createStackNavigator({
  Auth: { screen: Authentication, navigationOptions: { headerShown: false } },
  Tourist: { screen: DrawerNavigatorTourist, navigationOptions: { headerShown: false } },
  TourGuide: { screen: DrawerNavigatorTourGuide, navigationOptions: { headerShown: false } }
});

const Main = createAppContainer(route);

export default Main;