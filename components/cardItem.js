import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { ParallaxImage } from 'react-native-snap-carousel'
import styles from '../styles/sliderCard.style'

import { FormLabel, FormInput, Button } from 'react-native-elements'

export default class SliderEntry extends Component {


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

  compareAns = () => {
    console.log('aaa')
  }

  render () {
    const { data: {question, subtitle }, even } = this.props
    return (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.slideInnerContainer}
          onPress={() => { alert(`You've clicked '${question}'`); }}
          >
            <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                { this.image }
                <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
            </View>
            <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                <Text style={{fontSize:22}}>{ question }</Text>
                <FormInput onChangeText={this.compareAns} inputStyle={{width:null, justifyContent:'space-between', }}/>
                <Button
                  large
                  title='Next'
                  backgroundColor='#292477'
                  containerViewStyle={[styles.btnform]}
                 />
            </View>xº
        </TouchableOpacity>
    );
  }
}