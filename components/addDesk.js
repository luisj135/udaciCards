import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import { FormLabel, FormInput, Button } from 'react-native-elements'
import styles from '../styles/sliderCard.style'


const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportHeight) / 100;
    return Math.round(value);
}

class AddDesk extends Component {

  static navigationOptions = ({ navigation }) => {
    return{
      title: 'New Desks'
    }
  }

  compareAns = () => {
    console.log('aaa')
  }

  render() {   
    return (
        <View style={{ margin: 20, backgroundColor: '#ffff', padding:20, borderRadius:10, height:wp(80), justifyContent:'space-between', flexDirection:'column'}}>
          <FormLabel>Title</FormLabel>
          <FormInput onChangeText={this.compareAns} inputStyle={{width:null, justifyContent:'space-between', }}/>
          <Button
            large
            iconRight={{name: 'paper-plane', type: 'font-awesome'}}
            title='Submit'
            backgroundColor='#292477'
            containerViewStyle={[styles.btnform]}
           />
        </View>
    )
  }
}

export default AddDesk