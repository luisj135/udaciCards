import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import { FormLabel, FormInput, Button } from 'react-native-elements'
import styles from '../styles/sliderCard.style'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addDesk } from '../actions'


const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportHeight) / 100;
    return Math.round(value);
}

const uuid = require('react-native-uuid');

class AddDesk extends Component {

  constructor(props) {
    super(props);
    this.state = {
      desksText: ''
    }
  }

  static navigationOptions = ({ navigation }) => {
    return{
      title: 'New Desks'
    }
  }

  sendItem = () => {
    if(this.state.desksTex !== ''){
      let numb = Math.floor((Math.random() * 25) + 1)
      let arraColor = {
        1: '#73bdc5',
        2: '#fff',
        3: '#73bdc5',
        4: '#dde5e9',
        5: '#73bdc5',
        6: '#5b6374',
        7: '#5b6374',
        8: '#73bdc5',
        9: '#73bdc5',
        10: '#5b6374',
        11: '#dde5e9',
        12: '#73bdc5',
        13: '#4b525f',
        14: '#4b525f',
        15: '#73bdc5',
        16: '#5b6374',
        17: '#73bdc5',
        18: '#73bdc5',
        19: '#dde5e9',
        20: '#5b6374',
        21: '#73bdc5',
        22: '#5b6374',
        23: '#5b6374',
        24: '#73bdc5',
        25: '#73bdc5',
        26: '#73bdc5',
      }
     let data = {
        id: uuid.v4(),
        timestamp: Date.now(),
        title: this.state.desksText,
        ico: require('../images/20.png'),
        color: arraColor[numb],
        questions: []
      }
      let key = this.state.desksText.trim()
    this.props.addDesk(key, data)
    this.props.navigation.navigate('Menucard', {idDesks: data.id, title: data.title})
    }
  }

  render() {   
    return (
        <View style={{ margin: 20, backgroundColor: '#ffff', padding:20, borderRadius:10, height:wp(80), justifyContent:'space-between', flexDirection:'column'}}>
          <FormLabel>Title</FormLabel>
          <FormInput onChangeText={(text) => this.setState({desksText: text})}  inputStyle={{width:null, justifyContent:'space-between', }}/>
          <Button
            large
            iconRight={{name: 'paper-plane', type: 'font-awesome'}}
            title='Submit'
            backgroundColor='#292477'
            containerViewStyle={[styles.btnform]}
            onPress={this.sendItem}
           />
        </View>
    )
  }
}

function mapStateToProps (state) {
  return {
      desks: state.desks
  }
}

function mapDispathToProps (dispatch){
  return {
    addDesk: (key, data) => dispatch(addDesk(key, data))
  }
}
  
export default connect(
    mapStateToProps,
    mapDispathToProps
)(AddDesk)