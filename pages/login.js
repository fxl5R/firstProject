

import React, {Component} from 'react';
//import SplashScreen from "rn-splash-screen";

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

//关掉启动白屏
//SplashScreen.hide();
//const Realm = require('realm.js');
/*
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
*/

//初始化Realm
//let realm.js = new Realm({schema: [UserSchema]});
//realm.js.close();
export default class login extends Component {
    constructor(props) {
        super(props);
        this.state={
            text:'',
            password:'',
            online:''
        }
    }
    handle_loginClick(){
            let users=realm.objects('User').filtered('userName==$0',this.state.text.toString());
            let user=users[0];                                     //从realm中查询到的是results数组类型，需要指定某一个数来进行判断
            let password1=user.userPassword;                       //从realm中取出username为textinput中的密码
            if(this.state.password===password1){                   //判断密码
                ToastAndroid.show('登录成功',ToastAndroid.SHORT);
                realm.write(() => {
                    realm.create('User', {id:user.id,online: 1}, true);//更新在线状态
                });
                /*user.online=1;//更新在线状态*/
                this.props.navigation.navigate('TabPage');
                //realm.js.close();
            }else{
                ToastAndroid.show('登录失败，请检查用户名或者密码',ToastAndroid.SHORT)
            }
        console.log('name'+this.state.text+'password1'+this.state.password);

    }
    render() {
        return (
            <View style={{backgroundColor:'#DCDCDC',flex:1}}>
                <Image
                    style={styles.style_image}
                    source={require('../res/images/house.png')}/>
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
                    <Button text={'登录'} onPress={this.handle_loginClick.bind(this)}/>
                </View>

                <View style={{flex:1,flexDirection:'row',alignItems: 'flex-end',bottom:10}}>
                    <Text style={styles.style_view_unlogin}>
                        忘记密码?
                    </Text>
                    <Text style={styles.style_view_register}
                          onPress={()=>{
                              this.props.navigation.navigate('register');
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
        //borderRadius:35,
        height:80,
        width:120,
        marginTop:80,
        alignSelf:'center',
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