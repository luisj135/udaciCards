import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native'
import PropTypes from 'prop-types'
import { ParallaxImage } from 'react-native-snap-carousel'
import styles from '../styles/sliderCard.style'

import { FormLabel, FormInput, Button } from 'react-native-elements'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addCardPoints } from '../actions'

import Carousel, { Pagination } from 'react-native-snap-carousel';

const stringSimilarity = require('string-similarity')

class SliderEntry extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ansSel: '',
      ansInitText: '',
      animateinit: 0,
      viewBack:false,
      points:0,
      response:false
    }
  }

  componentWillMount(){
    this.animatedValue = new Animated.Value(0)
    this.animatedValue.addListener((value) => {
      this.setState({
        animateinit: value.value
      })
    })

    this.frontInterpolateInit = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })

    this.backInterpolateInit = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    })

    this.setState({
      ansInitText: this.props.data.answer
    })
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object
  };

  get image () {
    const { parallax, parallaxProps, even } = this.props;
    const illustration = 'http://cdn.codemyui.com/wp-content/uploads/2015/06/iMessage-Typing-Indicator-in-CSS.gif'

    return parallax ? (
        <Image
          source={{ uri: illustration }}
          style={styles.image}
        />
    ) : (
        <Image
          source={{ uri: illustration }}
          style={styles.image}
        />
    );
  }

  get imageAns () {
    const { parallax, parallaxProps, even } = this.props;
    const awnswerilust = 'https://cdn.codemyui.com/wp-content/uploads/2016/10/Gooey-Scroll-Arrow.gif'

    return parallax ? (
        <Image
          source={{ uri: awnswerilust }}
          style={styles.image}
        />
    ) : (
        <Image
          source={{ uri: awnswerilust }}
          style={styles.image}
        />
    );
  }

  compareAns = (value) => {
    let numbsub = 0
    if(this.state.ansSel !== value){
      this.setState({
        ansSel: value
      })
      if(this.props.pointsact > 0){
        numbsub = this.props.pointsact
      }
    }else{
      numbsub = (this.state.points + 10) + this.props.pointsact
    }
    if(numbsub <= this.props.pointsAll){
      this.props.addCardPoints(this.props.idDesks, numbsub)
      this.props.numPoints(numbsub)
    }

    if(this.state.animateinit <= 90){
      Animated.timing(this.animatedValue, {
        toValue: 180,
        duration: 800
      }).start()

      this.setState({
        viewBack: true
      })
    }else{
      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 800
      }).start()
       this.setState({
        viewBack: false
      })
      this.setState({
        response: true
      })
    }
  }

  compareback = (value) => {

    let numbsub = 0
    if(this.state.ansSel !== value){
      this.setState({
        ansSel: value
      })
      numbsub = (this.state.points + 10) + this.props.pointsact
    }else{
      numbsub = (this.state.points + 10) + this.props.pointsact
    }
    if(numbsub <= this.props.pointsAll){
      this.props.addCardPoints(this.props.idDesks, numbsub)
      this.props.numPoints(numbsub)
      this.setState({
        points: numbsub
      })
    }else{
      this.setState({
        points: this.props.pointsAll
      })
    }
    this.setState({
      response: true
    })

    
  }

  render () {
    const { data: {question, subtitle, answer, points }, even } = this.props
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolateInit }
      ]
    }
    
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolateInit }
      ]
    }

    return (
      <View>
        <Animated.View style={[styles.flipCard, frontAnimatedStyle, this.state.viewBack ? {zIndex:0}:{zIndex:1}]}>
          <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
              { this.image }
              <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
          </View>
          <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
              <FormLabel style={{fontSize:22, marginBottom:20}}>{ question }</FormLabel>
               <Button
                large
                title='Correct'
                backgroundColor='#4CAF50'
                containerViewStyle={[styles.btnform]}
                onPress={()=> this.compareAns(true)}
               />
              <Button
                large
                title='Incorrect'
                backgroundColor='#F44336'
                containerViewStyle={[styles.btnform]}
                onPress={()=> this.compareAns(false)}
               />
          </View>
        </Animated.View>
        <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack, this.state.viewBack ? {zIndex:1}:{zIndex:0}]}>
          <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
              { this.imageAns }
              <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
          </View>
          <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
            <Text style={!this.state.response ? {fontSize:12} : {fontSize:22}}>{ answer }</Text>
            <View>
              {
                !this.state.response && (
                  <View>
                    <Button
                      large
                      title='Correct'
                      backgroundColor='#4CAF50'
                      containerViewStyle={[styles.btnform]}
                      onPress={()=> this.compareback(true)}
                     />
                    <Button
                      large
                      title='Incorrect'
                      backgroundColor='#F44336'
                      containerViewStyle={[styles.btnform]}
                      onPress={()=> this.compareback(false)}
                     />
                  </View>
                )
              }

              {
                this.state.response && (
                  <Text style={{fontSize:22, marginTop:20}}>
                    Your points in this questions is : { this.state.points }
                  </Text>
                )
              }
            </View>
          </View>
        </Animated.View>
      </View>
    );
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
)(SliderEntry)