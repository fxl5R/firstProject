import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Platform,
    Alert, ToastAndroid
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import FormWithPairText from '../../component/Form/FormWithPairText';
import BackHeader from "../../component/BackHeader";
import { Modal} from '@ant-design/react-native';
import {SimpleItemsDialog} from 'react-native-pickers';
import realm from "../../util/realm";

let userdatas=realm.objects('User').filtered("online == $0", 1);
let userdata=userdatas[0];
class PersonalProfile extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
    this.state={
        uNickName:'',
        uSex:'',
        uLocation:'',
        portrait:''
      }
  }
//this.props.loginParams.user ? this.props.loginParams.user.sex :
  render() {
      const { navigation } = this.props;
      const nickName = navigation.getParam('nickName', 'NO-Name');//接收从MinePage传递的NickName
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
                source={this.state.portrait?{uri:this.state.portrait}:{uri:userdata.portrait}}/*当用户修改头像时，自动更新效果：未进行修改时显示数据库中的头像*/
                style={styles.image}
              />
            </View>
          </TouchableOpacity>
          <FormWithPairText
            leftText={'昵称'}
            rightText={nickName}
            onFormClick={() => this.onNickNameClick()}
            style={{ paddingVertical: 15 }}
            arrowRight={true}
          />
            <FormWithPairText
                leftText={'密码'}
                rightText={nickName}
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
        <View style={{alignItems:'center',justifyContent: 'center',paddingTop:20}}>
          <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button0}
              onPress={()=>{
                  realm.write(() => {

                      realm.create('User', {id:userdata.id,online: 1}, true);//更新用户昵称头像

                      /*更新用户性别*/
                      if(symboll==='0'){
                          realm.create('User', {id:userdata.id,userSex:'男'}, true);
                      }else if(symboll==='1'){
                          realm.create('User', {id:userdata.id,userSex:'女'}, true);
                      }

                      realm.create('User', {id:userdata.id,online: 1}, true);//更新用户所在地


                  });
              }}
          >
              <Text style={styles.TextStyle}> 确认提交 </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }//onPress={this.itemButtonAction(0)}



  /**
   * 点击了头像
   */
  onPictureClick = () => {
    //this.props.navigation.navigate('selectPhoto');
    console.log('点击了头像');
      ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true
      }).then(image => {
          let source = {uri: image.path};
          this.setState({portrait:image.path});
        console.log(' 图片路径：'+ this.state.portrait);
          realm.write(() => {
              realm.create('User', {id:userdata.id,portrait:this.state.portrait}, true);//更新touxiang
              ToastAndroid.show('用户头像更新为'+userdata.portrait,ToastAndroid.SHORT);
          });
      });
      /*ImagePicker.openCamera({
          width:300,
          height:400,
          cropping:true}).then(image => {
          let source = {uri:image.path};
          this._fetchImage(image);
          this.setState({
              portrait: source  // 将图片存于本地
          });
      });*/

  };



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
    console.log('点击了性别');
    SimpleItemsDialog.show();
  };

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
  },
  TextStyle:{
    fontSize:15,
    color:'#fff',
    textAlign:'center',
  },
  button0: {
    width: '100%',
    height: 40,
    padding: 10,
    backgroundColor: '#B0C4DE',
    borderRadius:7,
    marginTop: 14,
    elevation: 1
  },
alertBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
    // 如果要遮罩要显示成半透明状态，这里一定要设置，reba中的a控制透明度，取值在 0.0 ～ 1.0 范围内。
    alertBox: {
        width: 200,
        height: 175,
        backgroundColor: 'white',
    },

});

export default PersonalProfile;