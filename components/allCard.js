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
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      slider1Ref: null
    }
  }

  componentDidMount () {

    const { dispatch } = this.props;

    let datafilter = Object.keys(this.props.desks).map((item) => {
      if (this.props.desks[item].id === this.props.navigation.state.params.idDesks){
        this.setState({
          cardfilter: this.props.desks[item].questions
        });
      }
       
    })
  }

  _renderItem ({item, index}) {
    return (
      <View key={index}  style={[desksStyles.containerDeskItem]}>
          <Text style={[desksStyles.deskItem]}>{item['question']}</Text>
          <Ionicons name={'md-arrow-round-forward'} size={17} color={'#FFF'} />
      </View>
    )
  }

  render () {
    const SLIDER_1_FIRST_ITEM = 1;
    const { slider1ActiveSlide, slider1Ref } = this.state;
    console.log(this.props.navigation.state.params.idDesks)
    console.log(this.state.cardfilter)

    return (
      <View style={styles.exampleContainer}>
        <Text style={styles.title}>Example 1</Text>
        <Text style={styles.subtitle}>
            No momentum | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots
        </Text>
        <Carousel
          ref={(c) => { if (!this.state.slider1Ref) { this.setState({ slider1Ref: c }); } }}
          data={this.state.cardfilter}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          enableMomentum={false}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={2}
          autoplay={true}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
        />
        <Pagination
          dotsLength={this.state.cardfilter.length}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          dotColor={'rgba(255, 255, 255, 0.92)'}
          dotStyle={styles.paginationDot}
          inactiveDotColor={colors.black}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={slider1Ref}
          tappableDots={!!slider1Ref}
        />
    </View>
    );
  }
}


const desksStyles = StyleSheet.create({
    containerDeskItem: {
        borderColor: white,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        margin: 10,
        marginTop: 0,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    deskItem:{
        color: white,
        paddingRight: 5
    },
    deskItemNumber:{
        marginLeft: 'auto'
    }
})

function mapStateToProps (state) {
    return {
        desks: state.desks
    }
  }
  
export default connect(
    mapStateToProps,
)(AllCard)