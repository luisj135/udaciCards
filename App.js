
import React from 'react'
import { Platform, StyleSheet, Text, View, StatusBar, Image } from 'react-native'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'

import reducers from './reducers'
import {white, black, purple} from './utils/colors'

import AllDeks from './components/allDeks'
import AllCards from './components/allCard'
import addDesk from './components/addDesk'
import addData from './components/addData'
import allCard from './components/allCard'

function StatusBarItem ({backgroundColor, ...props}) {
    return (
        <View style={{ backgroundColor,  height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} barStyle="light-content" {...props}/>
        </View>
    )
}

const Menu = TabNavigator({
    Desks: {
        screen: AllDeks,
        navigationOptions: {
          tabBarLabel: 'Home',
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name={'md-home'} size={17} color={'#FFF'} />
          ),
        }
    },
    addDesks: {
        screen: addData,
        navigationOptions: {
          tabBarLabel: 'Add Desk',
          tabBarIcon: ({ tintColor }) => (
            <FontAwesome name={'pencil'} size={17} color={'#FFF'} />
          ),
        }
    }
}, {
    tabBarOptions: {
      activeTintColor: white,
      style: {
          height: 56,
          backgroundColor: purple,
          paddingBottom: 10, 
          shadowColor: 'rgba(0, 0, 0, 0.24)',
          shadowOffset: {
              width: 0,
              height: 3
          },
          shadowRadius: 6,
          shadowOpacity: 1
      }
    }
});

const MainNavigator = StackNavigator({
  Home: {
    screen: Menu,
    navigationOptions:{
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  DesksDetail: {
    screen: allCard,
    navigationOptions:{
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
})



class App extends React.Component {
    render() {
        return (
            <Provider store={createStore(reducers)}>
                <View style={[homeStyles.main]}>
                    <StatusBarItem backgroundColor={purple} barStyle="light-content" />
                    <MainNavigator />
                </View>
            </Provider>
        );
    }
}

export default App

const homeStyles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: white
    }
})
