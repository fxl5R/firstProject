import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ToastAndroid,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import FormWithPairText from '../../component/Form/FormWithPairText';
import BackHeader from "../../component/BackHeader";
import {SimpleItemsDialog,AreaPicker} from 'react-native-pickers';
import AreaJson from '../../res/data/Area.json'
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
      const nickName = navigation.getParam('nickName', 'NO-Name');/*接收从MinePage传递的NickName*/
      return (
      <View style={styles.container}>
        <BackHeader navigation={this.props.navigation} title={'修改资料'}/>
        <View style={styles.partContainer}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => { this.onPictureClick() }}>
            <View style={styles.pictureContainer}>
              <Text style={[styles.leftText]}>头像</Text>
                {/*当用户修改头像时，自动更新效果：未进行修改时显示数据库中的头像*/}
              <Image
                source={this.state.portrait?{uri:this.state.portrait}:{uri:userdata.portrait}}
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
            {/*<FormWithPairText
                leftText={'密码'}
                rightText={nickName}
                onFormClick={() => this.onNickNameClick()}
                style={{ paddingVertical: 15 }}
                arrowRight={true}
            />*/}
          <FormWithPairText
            leftText={'性别'}
            rightText={this.state.uSex?this.state.uSex:userdata.userSex}
            onFormClick={() => { this.SimpleItemsDialog.show() }}
            style={{ paddingVertical: 15 }}
            arrowRight={true}
          />
          <FormWithPairText
            leftText={'所在地'}
            rightText={this.state.uLocation?this.state.uLocation:userdata.userLocation}
            onFormClick={() => { this.AreaPicker.show() }}
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
                      {/*更新用户头像*/}
                      if(this.state.portrait){
                      realm.create('User',{id:userdata.id,portrait:this.state.portrait},true);}
                      ToastAndroid.show('用户头像更新为'+userdata.portrait,ToastAndroid.SHORT);
                      {/*更新用户昵称*/}
                      if(this.state.uNickName){
                      realm.create('User', {id:userdata.id,nickName:this.state.uNickName}, true);}
                      {/*更新用户性别*/}
                      {/*realm.create('User', {id:userdata.id,userSex:this.state.uSex==='男'?'男':'女'}, true);*/}
                      if(this.state.uSex==='男'){
                          realm.create('User', {id:userdata.id,userSex:'男'}, true);
                      }else if(this.state.uSex==='女'){
                          realm.create('User', {id:userdata.id,userSex:'女'}, true);
                      }
                      {/*更新用户所在地*/}
                      if(this.state.uLocation){
                      realm.create('User', {id:userdata.id,userLocation: this.state.uLocation}, true);}
                  });
              }}
          >
              <Text style={styles.TextStyle}>确认提交</Text>
          </TouchableOpacity>
        </View>

          {/*弹出选择用户性别窗口*/}
          <SimpleItemsDialog
              items={['男' , '女' ]}
              ref={ref => this.SimpleItemsDialog = ref}
              onPress={(items) => {
                  this.setState({uSex:items===1?'女':'男'});
                  console.log('items:'+items+'state:'+this.state.uSex);
              }} />
          {/*弹出选择用户所在地窗口*/}
          <AreaPicker
              areaJson={AreaJson}
              onPickerCancel={() => { }}
              onPickerConfirm={(value) => {
                  this.setState({uLocation:value.join("")});
                  console.log(JSON.stringify(value));
                  console.log(value.join(""));
                  {/*alert(value.join(""));*/}
              }}
              ref={ref => this.AreaPicker = ref} />
      </View>
    )
  }



  /**
   * 点击了头像
   */
  onPictureClick = () => {
    console.log('点击了头像');
      ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true
      }).then(image => {
          this.setState({portrait:image.path});
        console.log(' 图片路径：'+ this.state.portrait);
          /*realm.write(() => {
              realm.create('User', {id:userdata.id,portrait:this.state.portrait}, true);
              ToastAndroid.show('用户头像更新为'+userdata.portrait,ToastAndroid.SHORT);
          });*/
      });
      /*ImagePicker.openCamera({
          width:300,
          height:400,
          cropping:true}).then(image => {
          let source = {uri:image.path};
          this._fetchImage(image);
          this.setState({
              portrait: source
          });
      });*/

  };



  /**
   * 点击了昵称
   */
  onNickNameClick = () => {
    console.log('点击了昵称');
    this.props.navigation.navigate('ChangeNickName')
  }


  /**
   * 点击了地址
   */
  onAddressClick = () => {
    console.log('点击了地址');
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

});

export default PersonalProfile;