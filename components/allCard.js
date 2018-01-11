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

import * as cardsActions from '../actions/cards'
import * as API from '../utils/api'

import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../styles/sliderCard.style';
import CardItem from './cardItem';
import styles, { colors } from '../styles/index.style';


function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}>
      <Text>GO PLAY</Text>
    </TouchableOpacity>
  )
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
      title: 'item'
    }
  }

  componentDidMount () {

    const { dispatch } = this.props;

    let datafilter = Object.keys(this.props.desks).map((item) => {
      if (this.props.desks[item].id === this.props.navigation.state.params.idDesks){
        this.setState({
          cardfilter: this.props.desks[item].questions
        });
        this.setState({
          elementRef: this.props.desks[item]
        });
        this.setState({
          title: this.props.desks[item].title
        });
      }
       
    })

    this.setState({
      slider1ActiveSlide: this.state.first_item
    });
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
    console.log(this.props.navigation.state.params.idDesks)
    console.log(this.state.cardfilter)

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
          loop={true}
          loopClonesPerSide={2}
          autoplay={false}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
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
      </View>
    );
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