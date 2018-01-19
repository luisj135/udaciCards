import React, { Component } from 'react'
import { 
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  Dimensions
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

import { addCardPoints } from '../actions'


const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

class AllCard extends Component {

  constructor(props){
    super(props)
    this.state = {
      cardfilter: {},
      widthSlider: Dimensions.get('window').width,
      slider1ActiveSlide: 1,
      slider1Ref: null,
      first_item: 0,
      elementRef: [],
      indexItem: 0,
      title: 'item',
      newItem: false,
      resum: false,
      points: 0
    }
  }

  componentWillMount () {

    const { dispatch } = this.props;

    let datafilter = Object.keys(this.props.desks).map((item) => {
      if (this.props.desks[item].id === this.props.navigation.state.params.catid){
        this.setState({
          cardfilter: this.props.desks[item].questions
        })
        this.setState({
          elementRef: this.props.desks[item]
        })
        this.setState({
          points: this.props.desks[item].points
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

  static navigationOptions = ({ navigation }) => {
    return{
      title: navigation.state.params.title
    }
  }

  numprops = (value) =>{
    console.log(value)
    this.setState({
      points: value
    })
  }

  renderItemWithParallax = ({item, index}, parallaxProps) => {

    return (
      <CardItem
        data={item}
        even={(index + 1) % 1 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
        pointsAll = {this.state.cardfilter.length * 10}
        pointsact= {this.state.points}
        idDesks = {this.props.navigation.state.params.catid}
        next = {() => this.refs.carousel.snapToNext()}
        numPoints = {this.numprops}
      />
    )
  }

  reset = () => {
    this.props.addCardPoints(this.props.navigation.state.params.catid, 0)
    this.props.navigation.navigate('Home')
  }

  
  render () {
    return (
      <View style={styles.Container}>
        <Carousel
          ref={(c) => { if (!this.state.slider1Ref) { this.setState({ slider1Ref: c }); } }}
          data={this.state.cardfilter}
          renderItem={this.renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={this.state.first_item}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          enableMomentum={false}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={false}
          loopClonesPerSide={2}
          autoplay={false}
          autoplayDelay={500}
          autoplayInterval={300000}
          onSnapToItem={(index) => { 
            this.setState({ slider1ActiveSlide: index }) 
            this.setState({ indexItem: (index + 1) }) 
          }}
        />
        <Pagination
          dotsLength={this.state.cardfilter.length}
          activeDotIndex={this.state.slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          dotColor={'rgba(255, 255, 255, 0.92)'}
          dotStyle={styles.paginationDot}
          inactiveDotColor={colors.black}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this.state.slider1Ref}
          tappableDots={!!this.state.slider1Ref}
        />
        { 
          !this.state.newItem && (
            <View style={{marginTop: 20, justifyContent: 'space-between', height:60, flexDirection:'row'}}>
              <View style={{ width: 170}}>
                {
                  (this.state.cardfilter.length * 10) !==  this.state.points && (
                    <Button
                      large
                      title='New Card'
                      backgroundColor='#292477'
                      containerViewStyle={[styles.btnform]}
                      onPress={() => { this.props.navigation.navigate('NewCard', {cat:true, catid: this.props.navigation.state.params.catid})}}
                     />
                 )
                }
                {
                  (this.state.cardfilter.length * 10) ===  this.state.points && (
                    <Button
                      large
                      title='Reset'
                      backgroundColor='#F44336'
                      containerViewStyle={[styles.btnform]}
                      onPress={this.reset}
                     />
                 )
                }
              </View>
                <View style={{flexDirection:'column', width:90, height:90, justifyContent: 'space-between', alignItems: 'center'}}>
                  <Text style={{fontSize:28, flexDirection:'row', flex:1, height:60, marginBottom:5}}>
                    { this.state.points } / {this.state.cardfilter.length * 10 }
                  </Text>
                  <Text style={{fontSize:10, flexDirection:'row', flex:1, height:5}}>
                    Points
                  </Text>
                </View>
                <View>
                  <Text style={{fontSize:35, margin:10, flexDirection:'row', flex:1, height:50}}>
                    {this.state.indexItem} / {this.state.cardfilter.length}
                  </Text>
                </View>
            </View>
          )
        }
        { 
          this.state.newItem && (
            <View style={{marginTop: 20, justifyContent: 'space-between', height:60, flexDirection:'row'}}>
              <View style={{ width: wp(100)}}>
                <Button
                  large
                  title='New Card'
                  backgroundColor='#292477'
                  containerViewStyle={[styles.btnform]}
                  onPress={() => { this.props.navigation.navigate('NewCard', {cat:true, catid: this.props.navigation.state.params.catid})}}
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