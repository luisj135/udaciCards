import React, { Component } from 'react'
import { 
  AppRegistry,
  StyleSheet,
  Image
} from 'react-native'

class ImageElement extends Component {
  render() {
    return (
      <Image source={this.props.imgsource} style={styles.image}></Image>
    )
  }
}

export default ImageElement

const styles = StyleSheet.create(
  {
    image:{
      flex:1,
      width:150,
      height:200,
      alignSelf: 'center'
    }
  }
)