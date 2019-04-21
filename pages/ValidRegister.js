'use strict';

import React,{Component} from 'react';
import {Button} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import {GiftedForm, GiftedFormManager, GiftedFormModal} from 'react-native-gifted-form';
//import realm from "../util/realm";
import {toastShort} from "../util/ToastUtil";
import {NormalHeader} from "../component/BackHeader";
import realm from "../util/realm.js";
import {User} from "../util/realm";


//insert the your connection information
const URL = 'comfirstproject.us1.cloud.realm.io';
const username = 'realm-admin';
const password = 'admin';
let userRealmPath = "~/userRealm";


const errorCallback = function errorCallback(message, isFatal, category, code) {
    console.log(`Message: ${message} - isFatal: ${isFatal} - category: ${category} - code: ${code}`)
};



class ValidRegister extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            form: {
                nickName: '',
                userName:'',
                userPassword:'',
                emailAddress:'',
                userTel:'',
                tos: false,
            },
        }
    }

    componentWillMount() {
        Realm.Sync.User.login('http://192.168.2.105:9080', 'test@user2.com', 'test')
            .then (user => {
                Realm.open({schema: [LogBook],
                    sync: {user: user, url: 'realm://192.168.2.105:9080/~/logbook',error: err => alert(err)}
                })
                    .then(realm => {
                        this.setState({ realm });
                    });
            });
    }


    handleValueChange(values) {
        this.setState({ form: values })}

    handle_registerClick(){
        console.log('昵称'+JSON.stringify(this.state.form.nickName)+'用户名'
            +this.state.form.username+'密码'+this.state.form.password+'邮箱地址'+this.state.form.emailAddress
            +'联系电话'+this.state.form.userTel
            +JSON.stringify(GiftedFormManager.validate('signupForm')));

        if(GiftedFormManager.validate('signupForm').isValid){

            realm.write(()=> {
                realm.create('User', {
                    id:realm.objects('User').length+1,
                    userName: [this.state.form.username].toString(),
                    userPassword: [this.state.form.password].toString(),
                    nickName:[this.state.form.nickName].toString(),
                    userEmail:[this.state.form.emailAddress].toString(),
                    userTel:[this.state.form.userTel].toString(),
                    userLocation:'所在地',
                    userSex: '性别',
                    cTime:new Date().toLocaleTimeString()
                });
            });

/*
            Realm.Sync.User.login(`https://${URL}`, username, password)
                .then((user) => {
                    Realm.open({
                        sync: {
                            url: `realms://${URL}${userRealmPath}`,
                            user: user,
                            error: errorCallback,
                            partial: true
                        },
                        schema: [User.schema]
                    }).then((realm) => {
                            //write to the realm
                            realm.write(()=> {
                                realm.create('User', {
                                    id:realm.objects('User').length+1,
                                    userName: [this.state.form.username].toString(),
                                    userPassword: [this.state.form.password].toString(),
                                    nickName:[this.state.form.nickName].toString(),
                                    userEmail:[this.state.form.emailAddress].toString(),
                                    userTel:[this.state.form.userTel].toString(),
                                    userLocation:'所在地',
                                    userSex: '性别',
                                    cTime:new Date().toLocaleTimeString()
                                });
                            });

                            realm.close()
                        })
                });

*/



            toastShort('用户'+this.state.form.username+'注册成功，'+'跳转至登录页面');
            this.props.navigation.navigate('Login');
        }else {
            toastShort('请检查输入')
        }
    }
    render() {
        const { nickName, tos, userName , userPassword ,emailAddress,userTel} = this.state.form;
        return (

            <GiftedForm
                formName='signupForm'
                openModal={(Second) => {
                    this.props.navigation.navigate('Second');
                }}
                clearOnClose={false}

                defaults={{
                    username: '',
                    password: ''
                }}
                onValueChange={this.handleValueChange.bind(this)}

                validators={{
                    nickName: {
                        title: '昵称',
                        validate: [{
                            validator: 'isLength',
                            arguments: [1, 23],
                            message: '{TITLE} 字符长度 {ARGS[0]} - {ARGS[1]} '
                        }]
                    },
                    username: {
                        title: '账号',
                        validate: [{
                            validator: 'isLength',
                            arguments: [3, 16],
                            message: '{TITLE} 字符长度 {ARGS[0]} - {ARGS[1]} 支持英文数字组合'
                        }, {
                            validator: 'matches',
                            arguments: /^[a-zA-Z0-9]*$/,
                            message: '{TITLE} 仅支持英文数字组合'
                        }]
                    },
                    password: {
                        title: '密码',
                        validate: [{
                            validator: 'isLength',
                            arguments: [6, 16],
                            message: '{TITLE} 字符长度 {ARGS[0]} - {ARGS[1]} 支持英文数字组合'
                        }]
                    },
                    emailAddress: {
                        title: '邮箱',
                        validate: [{
                            validator: 'isLength',
                            arguments: [6, 255],
                        }, {
                            validator: 'isEmail',
                        }]
                    },
                    userTel:{
                        title:'联系电话',
                        validate: [{
                            validator: 'isLength',
                            arguments: [11,11],
                            message: '{TITLE} 号码长度应为 11 位'
                        }, {
                            validator: 'matches',
                            arguments: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
                            message: '{TITLE} 非法'
                        }]
                    },

                }}
            >
                <GiftedForm.SeparatorWidget />

                <GiftedForm.TextInputWidget
                    name='nickName' // mandatory
                    title='昵称'
                    image={require('../res/icons/color/user.png')}
                    placeholder='用户123'
                    clearButtonMode='while-editing'
                    value={nickName}
                />

                <GiftedForm.TextInputWidget
                    name='username'
                    title='账号'
                    image={require('../res/icons/color/contact_card.png')}
                    placeholder='ABC123'
                    clearButtonMode='while-editing'
                    value={userName}
                    onTextInputFocus={(currentText = '') => {
                        if (!currentText) {
                            let nickName = GiftedFormManager.getValue('signupForm', 'nickName');
                            if (nickName) {
                                return nickName.replace(/[^a-zA-Z0-9-_]/g, '');
                            }
                        }
                        return currentText;
                    }}
                />

                <GiftedForm.TextInputWidget
                    name='password' // mandatory
                    title='密码'
                    placeholder='******'
                    clearButtonMode='while-editing'
                    secureTextEntry={true}
                    value={userPassword}
                    image={require('../res/icons/color/lock.png')}
                />

                <GiftedForm.TextInputWidget
                    name='emailAddress' // mandatory
                    title='邮件地址'
                    placeholder='example@email.com'
                    keyboardType='email-address'
                    clearButtonMode='while-editing'
                    value={emailAddress}
                    image={require('../res/icons/color/email.png')}
                />
                <GiftedForm.TextInputWidget
                    name='userTel' // mandatory
                    title='联系电话'
                    placeholder='134******12'
                    clearButtonMode='while-editing'
                    value={userTel}
                    image={require('../res/icons/color/telephone.png')}
                />

                <GiftedForm.SeparatorWidget />

                <GiftedForm.ErrorsWidget/>

                <Button
                    style={{
                        margin: 10,
                        backgroundColor: '#3498db',
                        borderWidth: 0,
                        borderRadius: 0,
                        height: 50,
                        width:210
                    }}
                    title={'注    册'}
                    onPress={this.handle_registerClick.bind(this)}
                />
                <GiftedForm.NoticeWidget title='' />
                <GiftedForm.HiddenWidget name='tos' value={true} />


            </GiftedForm>
        );
    }

}
export default ValidRegister = createStackNavigator(
    {
        First: {
            screen: ValidRegister,
            navigationOptions:{header:<NormalHeader  title={'欢迎注册租房平台'} />
            }
        },
        Second: { screen: GiftedFormModal }
    });