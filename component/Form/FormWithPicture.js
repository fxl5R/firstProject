import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

/** 
 * 
*/
interface Props {
  nickName: string,
  contactText: string,
  pictureUri: string,
  onFormClick:() => void,
}

export default class FormWithPicture extends Component<Props>{
  constructor(props){
    super(props);
  }
  render() {
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={() => {this.props.onFormClick()}}>
        <View style={[styles.container]}>
          <Image source={require('../../res/images/logo_peo.png')} style={styles.leftImage}/>
          <View style={styles.textContainer}>
            <Text style={[styles.nickNameText]}>
                {this.props.nickName}
            </Text>
            <Text style={[styles.contactText]}>
                {this.props.contactText}
            </Text>
          </View>
          <Image source={require('../../res/images/ic_center_right_arrow.png')} style={styles.rightImage}/>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor:'#FFFFFF',
    marginLeft: 15,
    paddingVertical: 5,
    paddingRight: 15,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#D3D3D3'
  },
  textContainer: {
    marginLeft: 8,
    flexDirection: 'column'
  },
  nickNameText: {
    fontSize: 14,
    color: '#404040'
  },
  contactText: {
    fontSize: 14,
    color:  '#A9A9A9',
    marginTop: 5
  },
  leftImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor:  '#FFFFFF'
  },
  rightImage: {
    height: 15,
    width: 15,
    position: 'absolute',
    right: 15,
  }
});
