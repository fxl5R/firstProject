
import React, {Component} from 'react';
import {Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import realm from '../util/realm';
import {toastShort} from "../util/ToastUtil";



export default class CreateUser extends Component {

    constructor(props){
        super(props);
        this.state={
            account:'',
            password:'',
            nick:'',
            phone:'',
            email:'',
            loca:''

        }
    }

    create_User= () => {
        realm.write(() => {
            realm.create('User',
                {
                    id: realm.objects('User').length+1,
                    userName:this.state.account,
                    userPassword:this.state.password,
                    nickName:this.state.nick,
                    userTel:this.state.phone,
                    userEmail:this.state.email,
                    userLocation:this.state.loca,
                    cTime:new Date().toLocaleTimeString()
                });
            toastShort('添加成功');
        });
        let theUser=realm.objects('User').filtered('userName==$0',this.state.account)[0];
        this.props.navigation.navigate('UserDetail',{
            user_id: theUser.id});
    };

    render() {

        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:5}}>账号：</Text>
                    <TextInput
                        placeholder="账号"
                        style={styles.TextInputStyle}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => {
                            this.setState({account: text})
                        }}/>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:5}}>密码：</Text>
                    <TextInput
                        placeholder="密码"
                        style={styles.TextInputStyle}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => {
                            this.setState({password: text})
                        }}/>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:5}}>昵称：</Text>
                    <TextInput
                        placeholder="昵称"
                        style={styles.TextInputStyle}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => {
                            this.setState({nick: text})
                        }}/>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:5}}>电话：</Text>
                    <TextInput
                        placeholder="电话"
                        style={styles.TextInputStyle}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => {
                            this.setState({phone: text})
                        }}/>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:5}}>邮件：</Text>
                    <TextInput
                        placeholder="邮件"
                        style={styles.TextInputStyle}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => {
                            this.setState({email: text})
                        }}/>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:5}}>地址：</Text>
                    <TextInput
                        placeholder="地址"
                        style={styles.TextInputStyle}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => {
                            this.setState({loca: text})
                        }}/>
                </View>
                <TouchableOpacity onPress={this.create_User} activeOpacity={0.7}
                                  style={[styles.button, {marginBottom: 40}]}>
                    <Text style={styles.TextStyle}> 确定 </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    button: {
        width: '40%',
        height: 40,
        padding: 10,
        backgroundColor: '#C4D883',
        borderRadius:7,
        margin: 10
    },
    TextStyle:{
        color:'#fff',
        textAlign:'center',
    },
    TextInputStyle:
        {
            borderWidth: 1,
            borderColor: '#C4D883',
            width: '55%',
            height: 35,
            marginBottom: 10,
            textAlign: 'center',
        },
});
