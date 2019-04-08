import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ToastAndroid,
    TouchableNativeFeedback, ScrollView, TextInput, Dimensions, Button
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import FormWithPairText from '../../component/Form/FormWithPairText';

import { createForm, formShape } from 'rc-form';

import BackHeader from "../../component/BackHeader";
import {SimpleItemsDialog,AreaPicker} from 'react-native-pickers';
import AreaJson from '../../res/data/Area.json'
import realm from "../../util/realm";
import {Input} from "teaset";
import PropTypes from "prop-types";


let userdatas=realm.objects('User').filtered("online == $0", 1);
let userdata=userdatas[0];
const { width } = Dimensions.get('window');

class FromItem extends Component {
    static propTypes = {
        label: PropTypes.string,
        onChange: PropTypes.func,
        value: PropTypes.string,
        error: PropTypes.array,
    };
    getError = error => {
        if (error) {
            return error.map(info => {
                return (
                    <Text style={styles.errorinfoText} key={info}>
                        {info}
                    </Text>
                );
            });
        }
        return null;
    };
    render() {
        const { label, onChange, value, error } = this.props;
        return (
            <View style={styles.input}>
                <Input
                    style={styles.inputView}
                    size='md'
                    value={value || ''}
                    //label={`${label}：`}
                    //duration={150}
                    //defaultValue={userdata.nickName}
                    onChangeText={onChange}
                    highlightColor="#40a9ff"
                    //underlineColorAndroid="#40a9ff"
                />
                <View style={styles.errorinfo}>{this.getError(error)}</View>
            </View>
        );
    }
}

class PersonalProfile extends Component<Props> {

    static propTypes = {
        form: PropTypes.object.isRequired,
    };

    //设置表单初始值
    componentDidMount(){
        this.props.form.setFieldsValue({
            uNickName: this.state.uNickName?this.state.uNickName:userdata.nickName,
            uTel:this.state.uTel?this.state.uTel:userdata.userTel,
            uMail:this.state.uMail?this.state.uMail:userdata.userEmail
        })
    }


    constructor(props: Props) {
    super(props);
    this.state={
        uNickName:'',
        uTel:'',
        uMail:'',
        uSex:'',
        uLocation:'',
        portrait:''
      }
  }


  render() {

      const { getFieldDecorator,getFieldError ,setFieldsValue } = this.props.form;

      return (
      <View style={styles.container}>
        <BackHeader navigation={this.props.navigation} title={'修改资料'}/>
        <View style={styles.partContainer}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => { this.onPictureClick() }}>
            <View style={styles.pictureContainer}>
              <Text style={[styles.leftText]}>头       像</Text>
                {/*当用户修改头像时，自动更新效果：未进行修改时显示数据库中的头像*/}
              <Image
                source={this.state.portrait?{uri:this.state.portrait}:{uri:userdata.portrait}}
                style={styles.image}
              />
            </View>
          </TouchableOpacity>
        </View>


            <View style={styles.listcontainer}>
                <View style={{borderBottomWidth: 0.5,borderBottomColor: '#D3D3D3',flexDirection:'row'}}>
                    <Text style={[styles.innerleftText,{marginBottom:-5}]}>昵       称</Text>
                    {getFieldDecorator('uNickName',  {
                        validateFirst: true,
                        rules: [
                            { required: true, message: '请输入昵称!' }
                        ],
                    })(
                        <FromItem
                            style={{marginTop:-5}}
                            autoFocus
                            placeholder="输入昵称"
                            onChange={text => this.setState({uNickName: text})}
                            error={getFieldError('uNickName')}
                        />
                    )}

                </View>

                <View style={{borderBottomWidth: 0.5,borderBottomColor: '#D3D3D3',flexDirection:'row'}}>
                    <Text style={styles.innerleftText}>联系电话</Text>
                    {getFieldDecorator('uTel', {
                        validateFirst: true,
                        rules: [
                            { required: true, message: '请输入手机号' },
                            {
                                pattern: /^1\d{10}$/,
                                message: '请输入正确的手机号',
                            },
/*                            {
                                validator: (rule, value, callback) => {
                                    this.checkUserNameOne(value, callback);
                                },
                                message: '手机号已经被注册!',
                            },*/
                        ],
                    })(
                        <FromItem
                            autoFocus
                            placeholder="手机号"
                            onChange={text => this.setState({uTel: text})}
                            error={getFieldError('uTel')}
                        />
                    )}
                </View>

                <View style={{flexDirection:'row',marginBottom:-5}}>
                    <Text style={styles.innerleftText}>邮件地址</Text>
                    {getFieldDecorator('uMail', {
                        validateFirst: true,
                        rules: [
                            { required: true, message: '请输入邮件地址' },
                            {
                                pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
                                message: '请输入正确的邮件地址',
                            },
                        ],
                    })(
                        <FromItem
                            autoFocus
                            placeholder="邮件地址"
                            onChange={text => this.setState({uMail: text})}
                            error={getFieldError('uMail')}
                        />
                    )}
                </View>
            </View>

        <View style={styles.partContainer}>
          <FormWithPairText
            leftText={'性       别'}
            rightText={this.state.uSex?this.state.uSex:userdata.userSex}
            onFormClick={() => { this.SimpleItemsDialog.show() }}
            style={{ paddingVertical: 15 }}
            arrowRight={true}
          />
          <FormWithPairText
            leftText={'所 在 地'}
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
                  this.props.form.validateFields((error) => {
                      if (error) {
                          return error;
                      }else {

                          realm.write(() => {
                              {/*更新用户头像*/}
                              if(this.state.portrait){
                                  realm.create('User',{id:userdata.id,portrait:this.state.portrait},true);}
                              alert(JSON.stringify(userdata));
                              ToastAndroid.show('用户头像更新为'+userdata.portrait,ToastAndroid.SHORT);
                              {/*更新用户昵称*/}
                              if(this.state.uNickName){
                                  realm.create('User', {id:userdata.id,nickName:this.state.uNickName}, true);}
                              {/*更新用户联系电话*/}
                              if(this.state.uTel){
                                  realm.create('User', {id:userdata.id,userTel:this.state.uTel}, true);}
                              {/*更新用户邮件地址*/}
                              if(this.state.uMail){
                                  realm.create('User', {id:userdata.id,userEmail:this.state.uMail}, true);}
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

                          /*alert('填写的昵称'+this.state.uNickName+'填写的号码'+this.state.uTel+'填写的邮箱'+this.state.uMail);*/
                          alert(JSON.stringify(userdata));
                      }
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

/*
    checkUserNameOne = (value, callback) => {
        setTimeout(() => {
            if (value === '15188888888') {
                callback('手机号已经被注册');
            } else {
                callback();
            }
        }, 2000);
    };*/

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
    paddingVertical: 5,
    marginBottom:-5
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
    //elevation: 1
  },
    listcontainer: {
        backgroundColor: '#fff',
        //alignItems: 'center',
        paddingLeft: 15,
        //marginLeft: 15,
        //justifyContent: 'center',
    },
    inputView: {
        marginTop:14,
        width: width - 100,
        //paddingLeft: 10,
        textAlign: 'right'
    },
    input: {
        height: 54,
        fontSize: 16,
        //alignItems: 'baseline'
    },
    errorinfo: {
        //marginTop: 10,
    },
    errorinfoText: {
        color: 'red',
    },
    innerleftText: {
        marginTop:14,
        fontSize: 15,
        color: '#404040'
    },
});
PersonalProfile = createForm()(PersonalProfile);
export default PersonalProfile;