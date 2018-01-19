import React, { Component } from 'react'
import { 
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  Dimensions,
  Image
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { white } from '../utils/colors';

import * as API from '../utils/api'

import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../styles/sliderCard.style';
import CardItem from './cardItem';
import styles, { colors } from '../styles/index.style';
import { FormLabel, FormInput, Button } from 'react-native-elements'

import ImageElement from './imagesElement'

import { clearLocalNotifications, setLocalNotifications } from '../utils/helpers'
import { addCardPoints } from '../actions'


const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}>
      <Text>GO PLAY</Text>
    </TouchableOpacity>
  )
}

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

class AllCard extends Component {

  constructor(props){
    super(props)
    this.state = {
      cardfilter: [],
      widthSlider: Dimensions.get('window').width,
      slider1ActiveSlide: 1,
      slider1Ref: null,
      first_item: 1,
      elementRef: [],
      indexItem: 0,
      title: 'item',
      newItem: false
    }
  }

  componentDidMount () {

    const { dispatch } = this.props;

    let datafilter = Object.keys(this.props.desks).map((item) => {
      if (this.props.desks[item].id === this.props.navigation.state.params.idDesks){
        this.setState({
          cardfilter: this.props.desks[item].questions
        })
        this.setState({
          elementRef: this.props.desks[item]
        })
        this.setState({
          title: this.props.desks[item].title
        })
        if(this.props.desks[item].questions.length === 0){
          this.setState({
           newItem:true
          })
        }
      }
       
    })

    this.setState({
      indexItem: this.state.slider1ActiveSlide
    })    
  }

  componentWillReceiveProps(nextProps){
    let datafilter = Object.keys(nextProps.desks).map((item) => {
      if (nextProps.desks[item].id === nextProps.navigation.state.params.idDesks){
        this.setState({
          cardfilter: nextProps.desks[item].questions
        })
        this.setState({
          elementRef: nextProps.desks[item]
        })
        this.setState({
          title: nextProps.desks[item].title
        })
        if(nextProps.desks[item].questions.length === 0){
          this.setState({
           newItem:true
          })
        }
      }
       
    })
  }

  reset = () => {
    this.props.addCardPoints(this.state.elementRef.id, 0)
    this.props.navigation.navigate('Home')
  }


  render () {
    console.log(this.state.elementRef.points)
    return (
      <View style={styles.Container}>
      
        { 
          !this.state.newItem && (
            <View style={{marginTop: 20, justifyContent: 'space-between', height:60, flexDirection:'column'}}>
              <View style={{justifyContent: 'space-between', flexDirection:'row', marginBottom:20, marginLeft:20, marginRight:20}}>
                <ImageElement imgsource={this.state.elementRef.ico}>Image</ImageElement>
              </View>
              <View style={{justifyContent: 'center', flexDirection:'row', marginBottom:20, marginLeft:20, marginRight:20}}>
                <Text style={{fontSize:25, fontWeight:'bold'}}>{this.state.elementRef.title}</Text>
              </View>
              <View style={{ width: wp(100), marginBottom:20}}>
                <Button
                  large
                  title='New Card'
                  backgroundColor='#292477'
                  containerViewStyle={[styles.btnform]}
                  onPress={() => { this.props.navigation.navigate('NewCard', {cat:true, catid: this.props.navigation.state.params.idDesks})}}
                 />
              </View>
              <View style={{ width: wp(100), marginBottom:20}}>
                <Button
                  large
                  title='Start Game'
                  backgroundColor='#26a69a'
                  containerViewStyle={[styles.btnform]}
                  onPress={() => { this.props.navigation.navigate('DesksDetail', {cat:true, catid: this.props.navigation.state.params.idDesks, title: this.state.elementRef.title})}}
                 />
              </View>
              {
                (this.state.cardfilter.length * 10) ===  this.state.elementRef.points && (
                  <View style={{ width: wp(100), marginBottom:20}}>
                    <Button
                      large
                      title='Reset Desks'
                      backgroundColor='#F44336'
                      containerViewStyle={[styles.btnform]}
                      onPress={this.reset}
                     />
                  </View>
                )
              }
              
              <View style={{justifyContent: 'space-between', height:90, flexDirection:'row'}}>
                <View style={{flexDirection:'column', width:90, height:90, justifyContent: 'space-between', alignItems: 'center'}}>
                  <Text style={{fontSize:28, flexDirection:'row', flex:1, height:60, marginBottom:5}}>
                    { this.state.elementRef.points } / {this.state.cardfilter.length * 10 }
                  </Text>
                  <Text style={{fontSize:10, flexDirection:'row', flex:1, height:5}}>
                    Points
                  </Text>
                </View>
                <View>
                  <Text style={{fontSize:35, margin:10, flexDirection:'row', flex:1, height:50}}>
                    {this.state.cardfilter.length} { this.state.cardfilter.length > 1 && (<Text>Card`s</Text>)} { this.state.cardfilter.length <= 1 && (<Text>Card</Text>)}
                  </Text>
                </View>
              </View>
            </View>
          )
        }
        { 
          this.state.newItem && (
            <View style={{marginTop: 20, justifyContent: 'space-between', height:60, flexDirection:'column'}}>
              <View style={{justifyContent: 'space-between', flexDirection:'row', marginBottom:20, marginLeft:20, marginRight:20}}>
                <ImageElement imgsource={this.state.elementRef.ico}>Image</ImageElement>
              </View>
              <View style={{justifyContent: 'center', flexDirection:'row', marginBottom:20, marginLeft:20, marginRight:20}}>
                <Text style={{fontSize:25, fontWeight:'bold'}}>{this.state.elementRef.title}</Text>
              </View>
              <View style={{ width: wp(100), marginBottom:20}}>
                <Button
                  large
                  title='New Card'
                  backgroundColor='#292477'
                  containerViewStyle={[styles.btnform]}
                  onPress={() => { this.props.navigation.navigate('NewCard', {cat:true, catid: this.props.navigation.state.params.idDesks})}}
                 />
              </View>

              <View style={{ width: wp(100), marginBottom:20}}>
                <Button
                  large
                  title='Remember me'
                  backgroundColor='#2196F3'
                  containerViewStyle={[styles.btnform]}
                  onPress={() => { 
                    clearLocalNotifications()
                      .then(setLocalNotifications)
                  }}
                 />
              </View>

              <View style={{ width: wp(100)}}>
                <Button
                  large
                  title='Home'
                  backgroundColor='#26a69a'
                  containerViewStyle={[styles.btnform]}
                  onPress={() => { this.props.navigation.navigate('Home')}}
                 />
              </View>
            </View>
          )
        }
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
    addCardPoints: (key, data) => dispatch(addCardPoints(key, data))
  }
}
  
export default connect(
    mapStateToProps,
    mapDispathToProps
)(AllCard)