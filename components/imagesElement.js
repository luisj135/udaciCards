import React, { Component } from 'react'
import { 
  AppRegistry,
  StyleSheet,
  Image
} from 'react-native'

class ImageElement extends Component {
  constructor(props){
    super(props)
    this.state ={
      imgact: '../images/1.png'
    }
  }

  componentDidMount(){
    console.log(this.props.imgsource)
    this.setState({
      imgact: this.props.imgsource
    })
  }

  render() {
    return (
      <Image source={this.state.imgact} style={styles.image}></Image>
    )
  }
}

export default ImageElement

const styles = StyleSheet.create(
  {
    image:{
      flex:1,
      width:null,
      alignSelf: 'stretch'
    }
  }
)