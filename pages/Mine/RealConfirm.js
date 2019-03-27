/**
 * 房屋信息提交结果
 */


'use strict';
import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    TextInput,
    ToastAndroid,
    Alert, TouchableHighlight, Linking
} from 'react-native';
import BackHeader from '../../component/BackHeader';
import realm from '../../util/realm.js';
import {toastShort} from "../../util/ToastUtil";
import {Checkbox} from "teaset";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as WeiboAPI from "rn-weibo";

let {height, width} = Dimensions.get('window');

class RealConfirm extends Component {
    constructor(props) {
        super(props);
        this.state={
            checkedEmpty:false,
            sinaID:'',
            realName:'',
            IDCardNO:'',
        }
    }

    open=()=>{
        let profilelink1='\'https://weibo.com/\'';
        let profilelink2='https://weibo.com/';
        let userIDD=2219202892;
        console.log( '个人主页链接'+profilelink1);
        console.log(profilelink2.toString());
        let url = profilelink2.toString()+userIDD;
        Linking.openURL(url)
    };


    //onPress function
    ClickConfirm(){

    }
    render() {
        let users=realm.objects('User').filtered("online == $0", 1);
        let user=users[0];
        let config = {
            appKey:"925581119",
            scope: 'all',
            redirectURI: 'https://api.weibo.com/oauth2/default.html',
        };

        return (
            <View style={{backgroundColor:'#f5f5f5',flex:1}}>
                <BackHeader navigation={this.props.navigation} title={'实名认证'} />
                <View style={{marginTop:20,backgroundColor:'white',height:'55%'}}>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <TouchableHighlight onPress={()=>{
                            WeiboAPI.login(config)
                                .then(res=>{
                                    console.log('login success:',res);
                                    console.log('取出userID'+res.userID);
                                    realm.write(() => {
                                        realm.create('User', {
                                            id:user.id,sinaID:res.userID}, true);/*更新用户微博认证信息*/
                                        toastShort('成功认证新浪账号，'+res.userID+'跳转至实名认证页面');
                                        this.props.navigation.navigate('RealConfirm');
                                    })
                                }).catch(err=>{
                                console.log('login fail:',err)
                            });
                        }}>
                            <View style={{alignItems:'center',justifyContent:'center'}}>
                                <Icon name={"sina-weibo"} color="#FF0000" size={40} light/>
                                <Text>微博认证</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <Image source={require('../../res/images/ic_center_line.png')} style={{height:1,width:'100%',marginTop:22}}/>
                    <View style={{justifyContent:'center',alignItems:'center',height:120,marginTop:10}}>
                        <Image source={require('../../res/images/ic_account.png')} style={{width:30,height:30,marginTop:40}}/>
                        <Text>实名信息</Text>
                        <TextInput
                            placeholder="真实姓名"
                            style = { styles.TextInputStyle }
                            underlineColorAndroid = "transparent"
                            onChangeText = { ( text ) => { this.setState({ realName: text })} }/>
                        <TextInput
                            placeholder="身份证号"
                            style = { styles.TextInputStyle }
                            underlineColorAndroid = "transparent"
                            onChangeText = { ( text ) => { this.setState({ IDCardNO: text })} }/>
                    </View>

                    <View style={{marginTop:22,marginLeft:13,marginRight:13}}>
                        <View style={styles.ButtonContainer}>
                            <View style={{flexDirection: 'row',justifyContent:'center',marginTop:20}}>
                                <Checkbox
                                    checked={this.state.checkedEmpty}
                                    onChange={value => this.setState({checkedEmpty: value})}
                                />
                                <Text style={{fontSize:13.5,color:'#999'}}>我同意《认证服务协议》</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                console.log(this.state.checkedEmpty);
                                if(this.state.checkedEmpty===true){
                                    realm.write(() => {
                                        realm.create('User', {
                                            id:user.id,
                                            realName:this.state.realName,
                                            IDCardNO:this.state.IDCardNO,
                                            isRealPeople:1}, true);/*更新用户实名认证信息*/
                                        toastShort('用户真实姓名'+this.state.realName+'身份证号'+this.state.IDCardNO);
                                        this.props.navigation.navigate('TabPage');
                                        toastShort('授权成功，返回个人主页');
                                    })
                                }else{
                                    Alert.alert('请同意认证服务协议');
                                }
                                }}
                                activeOpacity={0.7}
                                style={styles.button1} >
                                <Text style={{ textAlign:'center',color:'#B0C4DE',fontSize:15,}}> 立即授权 </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FFFFFF',
    },
    ButtonContainer: {
        flexDirection:'column',
        alignItems:'center'
    },
    button0: {
        width: '80%',
        height: 40,
        padding: 10,
        backgroundColor: '#B0C4DE',
        borderRadius:7,
        marginTop: 14,
        elevation: 1
    },
    button1: {
        width: '80%',
        height: 40,
        padding: 10,
        backgroundColor: '#F5F5F5',
        borderRadius:7,
        marginTop: 14,
        marginBottom:15,
        elevation: 1
    },

    TextStyle:{
        fontSize:15,
        color:'#fff',
        textAlign:'center',
    },
    TextInputStyle:
        {
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#6495ED',
            width: '80%',
            height: 40,
            marginTop:10,
            marginBottom: 10,
            textAlign: 'center',
        },

});

export default RealConfirm;
