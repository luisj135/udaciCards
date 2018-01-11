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


   static navigationOptions = ({ navigation }) => {
    return{
      title: 'New List'
    }
  }

  onPressDesks = () => {
    this.props.navigation.navigate('NewDesks', {edit: false})
  }

  onPressCard = () => {
    this.props.navigation.navigate('NewCard', {edit:false})
  }

  render() {   
    return (
      <View style={{ justifyContent: 'space-between', width:wp(100), flex:1, flexDirection: 'column', padding: 30}}>
        <TouchableOpacity
          onPress={(e) => this.onPressDesks()}
        >
          <View  style={[StylesDeks.containerDeskItem, {backgroundColor: '#5b6374'} ]}>
            <View style={[StylesDeks.deskItem]}>
              <Text style={[StylesDeks.deskItemText]}>NEW DESK</Text>
            </View>
            <View style={[StylesDeks.deskRight]}>
                <Ionicons name={'md-arrow-dropright'} size={30} color={'#FFF'} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={(e) => this.onPressCard()}
        >
          <View  style={[StylesDeks.containerDeskItem, {backgroundColor: '#ec8557'} ]}>
            <View style={[StylesDeks.deskItem]}>
              <Text style={[StylesDeks.deskItemText]}>NEW CARD</Text>
            </View>
            <View style={[StylesDeks.deskRight]}>
                <Ionicons name={'md-arrow-dropright'} size={30} color={'#ffff'} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const StylesDeks = StyleSheet.create({
    containerDeskItem: {
      borderRadius: 10,
      padding: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems:'center',
      height: wp(55),
      width: wp(85)
    },
    deskRight:{
      flex: 1,
      alignItems: 'flex-end',
    },
    deskItem:{
      paddingRight: 5,
      justifyContent:'space-between',
      alignItems:'center',
    },
    deskItemText:{
      color: white,
      paddingRight: 5,
      fontWeight: 'bold',
      fontSize: 20,
      justifyContent:'space-between',
      alignItems:'center'
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