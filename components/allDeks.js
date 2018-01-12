import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'

import {Tile, List, ListItem} from 'react-native-elements';

import { white, black } from '../utils/colors';

import { initDesks } from '../actions/'
import * as API from '../utils/api'
import { getCategoryMetaInfo } from '../utils/helpers'

import ImageElement from './imagesElement'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

class AllDeks extends Component {
  componentDidMount () {

    const { dispatch } = this.props;

    if(Object.keys(this.props.desks).length === 0){

      API.initDesks();

      API.fetchDesks()
          .then((desks) => {
              let desksInit = {
                desks: JSON.parse(desks)
              }
              dispatch( initDesks( desksInit ) )
          });
    }
  }

  onPress = (id, title) => {
    this.props.navigation.navigate('DesksDetail', {idDesks: id, title: title})
  }

  render() {
    const desks = this.props.desks
    return (
      <ScrollView>
        {Object.keys(this.props.desks).reverse().map((desk) => {
          const currentDesk = this.props.desks[desk]
          const numQuestions = currentDesk.questions.length
          return (
            <View key={desk}  style={[StylesDeks.containerDeskItem, {backgroundColor: currentDesk.color} ]}>
              <View style={[StylesDeks.deskCenter]}>
                <ImageElement imgsource={currentDesk.ico}>Image</ImageElement>
              </View>
              <View style={[StylesDeks.blocktext]}>
                <View style={[StylesDeks.deskCenterLeft]}>
                  <Text style={[StylesDeks.deskItemText, StylesDeks.deskItemNumber]}>{numQuestions}</Text>
                  <Text style={{fontSize:14, color:white, marginLeft:20, fontWeight:'bold'}}>Cards</Text>
                </View>
                <View style={[StylesDeks.deskCenterRight]}>
                  <View style={[StylesDeks.deskItem]}>
                    <Text style={[StylesDeks.deskItemText]}>{desk}</Text>
                  </View>
                  <View style={[StylesDeks.deskRight]}>
                    <TouchableOpacity
                      style={[StylesDeks.deskbtn]}
                      onPress={(e) => this.onPress(currentDesk.id, currentDesk.title)}
                    >
                      <Text style={{color:white, fontWeight: 'bold'}}>GO PLAY</Text>
                      <Ionicons name={'md-arrow-dropright'} size={30} color={'#FFF'} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            )
        })}           
      </ScrollView>
    )
  }
}


const StylesDeks = StyleSheet.create({
    containerDeskItem: {
      borderColor: white,
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      margin: 10,
      paddingTop: 20,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: wp(65)
    },
    blocktext:{
      flex:1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    deskCenterLeft:{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    deskCenterRight:{
      flex:1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-end'
    },
    deskCenter:{
      flex: 1,
      alignItems: 'center',
      justifyContent:'space-between'
    },
    deskRight:{
      flex: 1,
      alignItems: 'flex-end',
    },
    deskItem:{
      paddingRight: 5,
      justifyContent:'flex-start',
      alignItems:'flex-start'
    },
    deskItemText:{
      color: '#fff',
      paddingRight: 5,
      fontWeight: 'bold',
      fontSize: 20,
      justifyContent:'space-between',
      alignItems:'flex-start'
    },
    deskItemNumber:{
      fontSize:70,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginLeft:20
    },
    deskbtn:{
      marginTop:20,
      marginBottom:20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width:75,
      alignItems: 'center'
    }
})

function mapStateToProps (state) {
  return {
      desks: state.desks
  }
}
  
export default connect(
    mapStateToProps,
)(AllDeks)