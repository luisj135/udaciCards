import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, ScrollView, Image, TouchableOpacity } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'

import { white, black } from '../utils/colors';

import * as desksActions from '../actions/desks'
import * as API from '../utils/api'
import { getCategoryMetaInfo } from '../utils/helpers'

import ImageElement from './imagesElement'


class AllDeks extends Component {
  componentDidMount () {

    const { dispatch } = this.props;

    API.initDesks();

    API.fetchDesks()
        .then((desks) => {
            dispatch( desksActions.initDesks( JSON.parse(desks) ) )
        });
  }

  onPress = (id) => {
    this.props.navigation.navigate('DesksDetail', {idDesks: id})
  }

  render() {
    const desks = this.props.desks;   
    return (
      <ScrollView>
        {Object.keys(this.props.desks).map((desk) => {
          const currentDesk = this.props.desks[desk]
          const imageItem = '../images/' + currentDesk.ico
          const numQuestions = currentDesk.questions.length
          return (
            <View key={desk}  style={[StylesDeks.containerDeskItem, {backgroundColor: currentDesk.color} ]}>
              <View style={[StylesDeks.deskCenter]}>
                <Text>Image</Text>
              </View>
              <View style={[StylesDeks.blocktext]}>
                <View style={[StylesDeks.deskCenterLeft]}>
                  <Text style={[StylesDeks.deskItem, StylesDeks.deskItemNumber]}>{numQuestions}</Text>
                </View>
                <View style={[StylesDeks.deskCenterRight]}>
                  <View style={[StylesDeks.deskItem]}>
                    <Text style={[StylesDeks.deskItemText]}>{desk}</Text>
                  </View>
                  <View style={[StylesDeks.deskRight]}>
                    <TouchableOpacity
                      style={[StylesDeks.deskbtn]}
                      onPress={(e) => this.onPress(currentDesk.id)}
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
      justifyContent: 'space-between'
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
      alignItems: 'center'
    },
    deskRight:{
      flex: 1,
      alignItems: 'flex-end',
      color: white
    },
    deskItem:{
      color: white,
      paddingRight: 5,
      fontWeight: 'bold',
      fontSize: 20,
      justifyContent:'flex-start',
      alignItems:'flex-start'
    },
    deskItemText:{
      color: white,
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