import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { getCategoryMetaInfo } from '../utils/helpers'

class AddCard extends Component {
  render() {
    return (
      <View>
        <Text>Add Card </Text>
        {
          getCategoryMetaInfo('React').getIcon()
        }
      </View>
    )
  }
}

export default AddCard