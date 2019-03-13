import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Image
} from 'react-native';

/** 
 * 
*/
interface Props {
    leftText: string,
    rightText: string,
    onFormClick:() => void,
    arrowRight?: boolean,
    cutOffLine?: boolean,
    style?: ViewStyle
}

export default class FormWithPairText extends Component<Props> {
  constructor(props: Props){
    super(props);
  }
  render() {
      const defaultCutOffLineStyle: ViewStyle = { borderBottomWidth: 0.5, borderBottomColor: '#D3D3D3' }
      let cutOffLineStyle: ViewStyle
      cutOffLineStyle = this.props.cutOffLine === undefined ? defaultCutOffLineStyle : this.props.cutOffLine ? defaultCutOffLineStyle : {}
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={() => {this.props.onFormClick()}}>
        <View style={[styles.container,this.props.style, cutOffLineStyle]}>
          <Text style={[styles.leftText]}>
              {this.props.leftText}
          </Text>
          {
            this.props.arrowRight ?
              this.renderArrowRight()
            : 
              <Text style={[styles.rightText]}>
                {this.props.rightText}
              </Text>
          }
        </View>
      </TouchableOpacity>
    );
  }

  renderArrowRight = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={[styles.rightText]}>
          {this.props.rightText}
        </Text>          
        <Image
          style={styles.image}
          source={require('../../res/images/ic_center_right_arrow.png')}
        /> 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginLeft: 15,
    paddingVertical: 5,
    paddingRight: 15,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  leftText: {
    fontSize: 15,
    color: '#404040'
  },
  rightText: {
    fontSize: 14,
    color: '#A9A9A9'
  },
  image: {
    height: 15,
    width: 15,
    marginLeft: 10
  }
});
