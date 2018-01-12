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

  static navigationOptions = ({ navigation }) => {
    return{
      title: navigation.state.params.title
    }
  }

  _renderItemWithParallax ({item, index}, parallaxProps) {
        return (
            <CardItem
              data={item}
              even={(index + 1) % 2 === 0}
              parallax={true}
              parallaxProps={parallaxProps}
            />
        );
    }

  
  render () {
    return (
      <View style={styles.Container}>
        <Carousel
          ref={(c) => { if (!this.state.slider1Ref) { this.setState({ slider1Ref: c }); } }}
          data={this.state.cardfilter}
          renderItem={this._renderItemWithParallax}
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
                <Button
                  large
                  title='New Card'
                  backgroundColor='#292477'
                  containerViewStyle={[styles.btnform]}
                  onPress={() => { this.props.navigation.navigate('NewCard', {cat:true, catid: this.props.navigation.state.params.idDesks})}}
                 />
              </View>
                <View style={{flexDirection:'column', width:90, height:60, justifyContent: 'space-between', alignItems: 'center'}}>
                  <Text style={{fontSize:28, flexDirection:'row', flex:1, height:60, marginBottom:5}}>
                    0 / {this.state.cardfilter.length * 10 }
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
                  onPress={() => { this.props.navigation.navigate('NewCard', {cat:true, catid: this.props.navigation.state.params.idDesks})}}
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
  
export default connect(
    mapStateToProps,
)(AllCard)