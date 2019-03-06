

import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    Image,
    View,
    TextInput, ToastAndroid,
} from 'react-native';
import Button from '../component/Button';
const Realm = require('realm');

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
let realm = new Realm({schema: [UserSchema]});
export default class login extends Component {
    constructor(props) {
        super(props);
        this.state={
            text:'',
            password:''
        }
    }
    handle_loginClick(){
            let users=realm.objects('User').filtered('userName==$0',this.state.text.toString());
            let user=users[0];
            let password1=user.userPassword;
            if(this.state.password===password1){
                ToastAndroid.show('登录成功',ToastAndroid.SHORT);
                this.props.navigation.navigate('TabPage');
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
    style_view_commit:{
        marginTop:15,
        marginLeft:10,
        marginRight:10,
        backgroundColor:'#63B8FF',
        height:35,
        borderRadius:5,
        justifyContent: 'center',
        alignItems: 'center',
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
    editGroup:{
        margin:20
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