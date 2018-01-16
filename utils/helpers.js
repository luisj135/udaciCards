import React from 'react'
import { View, AsyncStorage } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Notifications, Permissions } from 'expo'


const NOTIFICATION_KEY = 'UdacityProject:notifications'

export function getCategoryMetaInfo (category) {
  const info = 
  {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ],
      getIcon(){
        return (
          <View>
            <MaterialCommunityIcons
              name='react'
              color='#000000'
              size={35}
            />
          </View>
        )
      }
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ],
      getIcon(){
        return (
          <View>
            <MaterialCommunityIcons
              name='nodejs'
              color='#000000'
              size={35}
            />
          </View>
        )
      }
    },
    Reactone: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ],
      getIcon(){
        return (
          <View>
            <MaterialCommunityIcons
              name='react'
              color='#000000'
              size={35}
            />
          </View>
        )
      }
    },
    JavaScriptone: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ],
      getIcon(){
        return (
          <View>
            <MaterialCommunityIcons
              name='nodejs'
              color='#000000'
              size={35}
            />
          </View>
        )
      }
    },
    Reacttwo: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ],
      getIcon(){
        return (
          <View>
            <MaterialCommunityIcons
              name='react'
              color='#000000'
              size={35}
            />
          </View>
        )
      }
    },
    JavaScripttwo: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ],
      getIcon(){
        return (
          <View>
            <MaterialCommunityIcons
              name='nodejs'
              color='#000000'
              size={35}
            />
          </View>
        )
      }
    }
  }

  return typeof category === 'undefined'
    ? info
    : info[category]
}

export function clearLocalNotifications (){
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotifications () {
  return  {
    title: 'Log your Desks app',
    boyd: 'don´t forget to long your Desks for today!',
    ios: {
      sound:true,
    },
    android:{
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotifications () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
  .then(JSON.parse)
  .then((data) => {
    if (data === null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({ status }) => {
          if(status === 'granted'){
            Notifications.cancelAllScheduledNotificationsAsync()

            let tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(20)
            tomorrow.setMinutes(0)
            Notifications.scheduleLocalNotificationAsync(
              createNotifications(),
              {
                time: tomorrow,
                repeat: 'day',
              }
            )

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
    }    
  })
}
