

import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    Image,
    View,
    TextInput, ToastAndroid,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from '../component/Button';
import realm from '../util/realm.js';
//const Realm = require('realm.js');

const UserSchema = {
    name: 'User',                          // 表名
    primaryKey: 'id',                           // 设置id为主键
    properties: {                               // 属性
        id: { type:'int', indexed: true },        // 用户ID
        userName: 'string',                        // 用户名称
        userPassword: 'string',                    // 用户密码
        userSex: 'string',                      // 用户性别
        portrait: 'string',               // 头像
        cTime: { type: 'date', optional: true } // 创建时间
    },
};
//初始化Realm
//let realm.js = new Realm({schema: [UserSchema]});
//realm.js.close();
export default class register extends Component {
    constructor(props) {
        super(props);
        this.state={
            text:'',
            password:''
        }

    }

    handle_registerClick(){
        realm.write(()=> {
            realm.create('User', {
                id:realm.objects('User').length,
                userName: [this.state.text].toString(),
                userPassword: [this.state.password].toString(),
                userSex: 'female',
                portrait:'https://b-ssl.duitang.com/uploads/item/201901/09/20190109121033_lxkdt.thumb.300_300_c.jpg',
                cTime:new Date()
            });
        });
        //realm.js.close();
        console.log('name'+this.state.text+'password'+this.state.password);
        ToastAndroid.show("用户"+this.state.text+"成功注册，跳转中", ToastAndroid.SHORT);
        this.props.navigation.navigate('Login');

    }
    render() {
        return (
            <View style={{backgroundColor:'#F5F5F5',flex:1}}>
                <Image
                    style={styles.style_image}
                    source={require('../res/images/logo_peo.png')}/>
                <KeyboardAwareScrollView>
                <View style={styles.username}>
                <TextInput
                    style={styles.edit}
                    placeholder='手机号/邮箱'
                    numberOfLines={1}
                    autoFocus={true}
                    underlineColorAndroid={'transparent'}
                    textAlign='center'
                    onChangeText={(text)=>this.setState({text})}
                /></View>
                <View
                    style={{height:1,backgroundColor:'#f4f4f4'}}
                />
                <View style={styles.password}>
                <TextInput
                    style={styles.edit}
                    placeholder='密码'
                    numberOfLines={1}
                    underlineColorAndroid={'transparent'}
                    secureTextEntry={true}
                    textAlign='center'
                    onChangeText={(password)=>this.setState({password})}
                /></View>
                </KeyboardAwareScrollView>
                <View style={{marginTop: 10}}>
                    <Button text={'注册'} onPress={this.handle_registerClick.bind(this)}/>
                </View>

                <View style={{flex:1,flexDirection:'row',alignItems: 'flex-end',bottom:10}}>
                    {/*<Text style={styles.style_view_unlogin}>
                        忘记密码?
                    </Text>*/}
                    <Text style={styles.style_view_unlogin}
                          onPress={()=>{
                              this.props.navigation.navigate('Login');
                              /*alert('test success');*/
                          }}>
                        已有账号
                    </Text>
                    <Text style={styles.style_view_register}
                          onPress={()=>{
                              this.props.navigation.navigate('AddHousePage');
                              /*alert('test success');*/
                          }}>
                        新用户
                    </Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    style_image:{
        borderRadius:35,
        height:70,
        width:70,
        marginTop:70,
        alignSelf:'center',
    },
    style_user_input:{
        backgroundColor:'#fff',
        marginTop:10,
        height:35,
    },
    style_pwd_input:{
        backgroundColor:'#fff',
        height:35,
    },
    style_view_unlogin:{
        fontSize:12,
        color:'#63B8FF',
        marginLeft:10,
    },
    style_view_register:{
        fontSize:12,
        color:'#63B8FF',
        marginRight:10,
        alignItems:'flex-end',
        flex:1,
        flexDirection:'row',
        textAlign:'right',
    },
    edit:{
        height: 40,
        fontSize:13,
        backgroundColor:'#fff',
        paddingRight:15,
        paddingLeft:15
    },
    username:{
        marginTop:50,
        height:48,
        backgroundColor:'white',
        justifyContent:'center',
        borderTopLeftRadius:3,
        borderTopRightRadius:3
    },
    password: {
        height:48,
        backgroundColor:'white',
        justifyContent: 'center',
        borderBottomLeftRadius:3,
        borderBottomRightRadius:3
    }
});