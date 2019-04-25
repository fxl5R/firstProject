
import React, {Component} from 'react';
import {Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import realm from '../util/realm';
import {toastShort} from "../util/ToastUtil";

export default class UserDetail extends Component {

    constructor(props){
        super(props);
        this.state={
            nick:'',
            phone:'',
            email:'',
            loca:''
        }
    }
    delete_User= () => {
        const {navigation}=this.props;
        const user_id=navigation.getParam('user_id','NO_USER');
        Alert.alert(
            '提示',
            '删除后信息无法找回',
            [
                {text:'取消',onPress:(()=>{}),style:'cancel'},
                {text:'确定',onPress: (()=>{
                        realm.write(() => {
                            let theuser = realm.objects('User').filtered('id==$0',user_id)[0];
                            realm.delete(theuser);
                            toastShort('删除成功');
                        });
                        this.props.navigation.navigate('UserTable');
                    })}]
        );
    };
    edit_User = () => {
        const {navigation}=this.props;
        const user_id=navigation.getParam('user_id','NO_USER');
        realm.write(() => {
            //let theuser = realm.objects('User').filtered('id==$0',user_id)[0];
            if(this.state.nick) {
                realm.create('User',{id:user_id,nickName:this.state.nick},true);
            }
            if(this.state.phone) {
                realm.create('User',{id:user_id,userTel:this.state.phone},true);
            }
            if(this.state.email){
                realm.create('User',{id:user_id,userEmail:this.state.email},true);
            }
            if(this.state.loca){
                realm.create('User',{id:user_id,userLocation:this.state.loca},true);
            }
        })
    };

    render() {
        const {navigation}=this.props;
        const user_id=navigation.getParam('user_id','NO_USER');
        let theUser=realm.objects('User').filtered('id==$0',user_id)[0];
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:5}}>I    D：</Text>
                    <TextInput
                        editable={false}
                        style={styles.TextInputStyle}
                        value={theUser.nickName}
                        underlineColorAndroid="transparent"/>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:5}}>账号：</Text>
                    <TextInput
                        editable={false}
                        style={styles.TextInputStyle}
                        value={theUser.userName}
                        underlineColorAndroid="transparent"/>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:5}}>密码：</Text>
                    <TextInput
                        editable={false}
                        style={styles.TextInputStyle}
                        value={theUser.userPassword}
                        underlineColorAndroid="transparent"/>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:5}}>昵称：</Text>
                    <TextInput
                        placeholder="昵称"
                        style={styles.TextInputStyle}
                        value={this.state.nick?this.state.nick:theUser.nickName}
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
                        value={this.state.phone?this.state.phone:theUser.userTel}
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
                        value={this.state.email?this.state.email:theUser.userEmail}
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
                        value={this.state.loca?this.state.loca:theUser.userLocation}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => {
                            this.setState({loca: text})
                        }}/>
                </View>
                <TouchableOpacity onPress={this.edit_User} activeOpacity={0.7}
                                  style={[styles.button, {marginBottom: 10}]}>
                    <Text style={styles.TextStyle}> 修改并提交 </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.delete_User} activeOpacity={0.7}
                                  style={[styles.button, {marginBottom: 10}]}>
                    <Text style={styles.TextStyle}> 删除 </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('CreateUser')}} activeOpacity={0.7}
                                  style={[styles.button, {marginBottom: 40}]}>
                    <Text style={styles.TextStyle}> 新增用户 </Text>
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
        margin: 2
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
