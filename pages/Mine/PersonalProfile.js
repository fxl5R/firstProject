import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform
} from 'react-native';
import FormWithPairText from '../../component/Form/FormWithPairText';
import BackHeader from "../../component/BackHeader";


class PersonalProfile extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }
//this.props.loginParams.user ? this.props.loginParams.user.sex :
  render() {
    return (
      <View style={styles.container}>
        <BackHeader navigation={this.props.navigation} title={'修改资料'}/>
        <View style={styles.partContainer}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => { this.onPictureClick() }}>
            <View style={styles.pictureContainer}>
              <Text style={[styles.leftText]}>
                {'头像'}
              </Text>
              <Image
                source={require('../../res/images/logo_peo.png')}
                style={styles.image}
              />
            </View>
          </TouchableOpacity>
          <FormWithPairText
            leftText={'昵称'}
            rightText={'暂无填写'}
            onFormClick={() => this.onNickNameClick()}
            style={{ paddingVertical: 15 }}
            arrowRight={true}
          />
          <FormWithPairText
            leftText={'性别'}
            rightText={'暂无填写'}
            onFormClick={() => this.onSexClick()}
            style={{ paddingVertical: 15 }}
            arrowRight={true}
          />
          <FormWithPairText
            leftText={'所在地'}
            rightText={'暂无填写'}
            onFormClick={() => this.onAddressClick()}
            cutOffLine={false}
            style={{ paddingVertical: 15 }}
            arrowRight={true}
          />
        </View>
      </View>
    )
  }

  /**
   * 点击了头像
   */
  onPictureClick = () => {
    console.log('点击了头像');
  }

  /**
   * 点击了昵称
   */
  onNickNameClick = () => {
    console.log('点击了昵称')
    this.props.navigation.navigate('ChangeNickName')
  }

  /**
   * 点击了性别
   */
  onSexClick = () => {
    console.log('点击了性别')
  }

  /**
   * 点击了地址
   */
  onAddressClick = () => {
    console.log('点击了地址')
    this.props.navigation.navigate('ChangeAddress')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  partContainer: {
    marginTop: 10,
    borderTopColor: '#D3D3D3',
    borderTopWidth: 0.5,
    borderBottomColor:'#D3D3D3',
    borderBottomWidth: 0.5,
    paddingVertical: 5
  },
  pictureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    marginLeft: 15,
    paddingRight: 15,
    borderBottomColor:'#D3D3D3',
    borderBottomWidth: 0.5,
  },
  leftText: {
    fontSize: 15,
    color:'#404040'
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor:'white'
  }
});

export default PersonalProfile;