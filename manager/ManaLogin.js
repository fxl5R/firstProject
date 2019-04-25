

import React, {Component} from 'react';
//import SplashScreen from "rn-splash-screen";

import {
    StyleSheet,
    Text,
    Image,
    View,
    TextInput, ToastAndroid, ImageBackground, Dimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from '../component/Button';
import realm from '../util/realm.js';
import {toastShort} from "../util/ToastUtil";

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
let {height, width} = Dimensions.get('window');

export default class ManaLogin extends Component {
    constructor(props) {
        super(props);
        this.state={
            text:'',
            password:'',
            online:''
        }
    }

    handle_loginClick(){
            if(this.state.password==='admin'&&this.state.text==='admin'){
                this.props.navigation.navigate('Home');
            }else{
                toastShort('登录失败，请检查用户名或者密码');
            }
            console.log('name'+this.state.text+'password1'+this.state.password);
    }
    render() {
        return (
            <ImageBackground source={require('../res/images/about_bg.png')} style={{width:width,height:height}}>
                <View style={{backgroundColor:'rgba(248,248,255,0.8)',flex:1,flexDirection:'column'}}>
                    <View style={{flex:1}}/>
                    <View  style={{flex:2}}>
                        <KeyboardAwareScrollView contentContainerStyle = {{flex:1}}>

                            <View style={styles.username}>
                                <TextInput
                                    style={styles.edit}
                                    placeholder='账号'
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
                            <View style={{marginTop: 10}}>
                                <Button text={'登  录'} onPress={this.handle_loginClick.bind(this)}/>
                            </View>
                        </KeyboardAwareScrollView>
                    </View>

                </View>
            </ImageBackground>
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
        fontSize:13,
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