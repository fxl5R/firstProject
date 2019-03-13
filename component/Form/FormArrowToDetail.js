import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image, ViewStyle
} from 'react-native';

/** 
 * 
*/
interface Props {
    leftText: string,
    onFormClick:() => void,
    cutOffLine?: boolean
}

export default class FormArrowToDetail extends Component<Props> {
  constructor(props){
    super(props);
  }
  render() {
      const defaultCutOffLineStyle: ViewStyle = { borderBottomWidth: 0.5, borderBottomColor: '#D3D3D3' }
      let cutOffLineStyle: ViewStyle
      cutOffLineStyle = this.props.cutOffLine === undefined ? defaultCutOffLineStyle : this.props.cutOffLine ? defaultCutOffLineStyle : {}
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={() => {this.props.onFormClick()}}>
        <View style={[styles.container, cutOffLineStyle]}>
          <Text style={[styles.text]}>
              {this.props.leftText}
          </Text>
          <Image source={require('../../res/images/ic_center_right_arrow.png')} style={styles.image}/>
        </View>
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginLeft: 15,
    paddingVertical: 10,
    paddingRight: 15,
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    color: '#404040'
  },
  image: {
    height: 15,
    width: 15,
    position: 'absolute',
    right: 15,
  }
});
