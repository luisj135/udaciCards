import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import { FormLabel, FormInput, Button } from 'react-native-elements'
import styles from '../styles/sliderCard.style'
import {Select, Option} from "react-native-chooser"
import { white, black, purple } from '../utils/colors';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addCard, allCard } from '../actions/cards'


const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const uuid = require('react-native-uuid');

function wp (percentage) {
    const value = (percentage * viewportHeight) / 100;
    return Math.round(value);
}

function wpw (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

class AddCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value : "Select Me Please",
      idvalueSel: 0,
      questionText: '',
      answerText: ''
    }
  }

  onSelect = (value, label) => {
    console.log(value, label)
    this.setState({value : label})
    this.setState({idvalueSel : value})
  }

  static navigationOptions = ({ navigation }) => {
    return{
      title: 'New Card'
    }
  }

  sendItem = () =>{
    if(this.state.idvalueSel !== 0 && this.state.questionText !== '' && this.state.answerText !== ''){
     let data = {
        id: uuid.v4(),
        timestamp: Date.now(),
        answer: this.state.answerText,
        question: this.state.questionText
      }
    console.log(data)
    this.props.addCard(this.state.idvalueSel, data)
    console.log(this.props.allCard(this.state.idvalueSel))
  }

  }

  render() {
    console.log(this.state)
    return (
        <View style={{ margin: 20, backgroundColor: '#ffff', padding:20, borderRadius:10, height:wp(80), justifyContent:'space-between', flexDirection:'column'}}>
          <FormLabel>Question</FormLabel>
          <FormInput onChangeText={(text) => this.setState({questionText: text})} inputStyle={{width:null, justifyContent:'space-between', }}/>
          <FormLabel>Answer</FormLabel>
          <FormInput onChangeText={(text) => this.setState({answerText: text})} inputStyle={{width:null, justifyContent:'space-between', }}/>
          <FormLabel>Desks</FormLabel>
          { !this.props.navigation.state.params.edit && (
            <Select
              onSelect = {this.onSelect}
              defaultText  = {this.state.value}
              style = {{borderWidth : 1, borderColor : "#bdc6cf", marginLeft:20, width: wpw(68)}}
              textStyle = {{ color: "#bdc6cf" }}
              backdropStyle  = {{backgroundColor : purple}}
              optionListStyle = {{backgroundColor : "#F5FCFF"}}
            >
              {Object.keys(this.props.desks).map((desk) => {
                const currentDesk = this.props.desks[desk]
                const numQuestions = currentDesk.questions.length
                return (
                  <Option key={currentDesk.id} value = {currentDesk.id}>{currentDesk.title}</Option>
                  )
              })}
              </Select> )
          }            
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
    addCard: (data) => dispatch(addCard(data)),
    allCard: (data) => dispatch(allCard(data))
  }
}
  
export default connect(
    mapStateToProps,
    mapDispathToProps
)(AddCard)
