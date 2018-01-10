import React from 'react'
import { View } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'

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