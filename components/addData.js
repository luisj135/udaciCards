import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { white, black } from '../utils/colors';
import { Ionicons } from '@expo/vector-icons'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}


class AddData extends Component {
    render() {   
        return (
          <View style={{ justifyContent: 'space-between', width:null }}>
            <TouchableOpacity
              style={[StylesDeks.deskbtn]}
            >
              <View  style={[StylesDeks.containerDeskItem, {backgroundColor: white} ]}>
                <View style={[StylesDeks.deskItem]}>
                  <Text style={[StylesDeks.deskItemText]}>NEW DESK</Text>
                </View>
                <View style={[StylesDeks.deskRight]}>
                    <Ionicons name={'md-arrow-dropright'} size={30} color={'#FFF'} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[StylesDeks.deskbtn]}
            >
              <View  style={[StylesDeks.containerDeskItem, {backgroundColor: white} ]}>
                <View style={[StylesDeks.deskItem]}>
                  <Text style={[StylesDeks.deskItemText]}>NEW CARD</Text>
                </View>
                <View style={[StylesDeks.deskRight]}>
                    <Ionicons name={'md-arrow-dropright'} size={30} color={'#FFF'} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: wp(45),
      width:wp(100)
    },
    blocktext:{
      flex:1,
      flexDirection: 'row',
      justifyContent: 'space-between'
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
    },
    deskItem:{
      paddingRight: 5,
      justifyContent:'space-between',
      alignItems:'center',
      width:wp(100)
    },
    deskItemText:{
      color: black,
      paddingRight: 5,
      fontWeight: 'bold',
      fontSize: 20,
      justifyContent:'space-between',
      alignItems:'center',
      width:wp(90)
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

export default AddData