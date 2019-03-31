'use strict';

import moment from 'moment';
import React,{Component} from 'react';
import {Button} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import {GiftedForm, GiftedFormManager, GiftedFormModal} from 'react-native-gifted-form';
import realm from "../util/realm";
import {toastShort} from "../util/ToastUtil";
import {NormalHeader} from "../component/BackHeader";
import SimpleItemsDialog from "react-native-pickers/view/SimpleItemsDialog";

class ValidRegister extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            form: {
                nickName: '',//FullName
                userName:'',
                userPassword:'',
                emailAddress:'',
                userTel:'',
                tos: false,
            },
            //uSex:'',
        }
    }
    handleValueChange(values) {
        //console.log('handleValueChange', values)
        this.setState({ form: values })
    }
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
            toastShort('用户'+this.state.form.username+'注册成功，'+'跳转至登录页面');
            this.props.navigation.navigate('Login');
        }else {

            toastShort('请检查输入')
        }
    }
    render() {
        const { nickName, tos, userName , userPassword ,emailAddress,userTel} = this.state.form;
        //console.log('render', this.state.form);
        return (

            <GiftedForm
                formName='signupForm'// GiftedForm instances that use the same name will also share the same states
                openModal={(Second) => {
                    this.props.navigation.navigate('Second'); // The ModalWidget will be opened using this method. Tested with ExNavigator
                }}
                clearOnClose={false} // delete the values of the form when unmounted

                defaults={{
                    username: '',
                    password: '',
                    //country: '123'
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
/*                    gender: {
                        title: 'Gender',
                        validate: [{
                            validator: (...args) => {
                                if (args[0] === undefined) {
                                    return false;
                                }
                                return true;
                            },
                            message: '{TITLE} is required',
                        }]
                    },
                    country: {
                        title: '所在地',
                        validate: [{
                            validator: 'isLength',
                            arguments: [2],
                            message: '{TITLE} is required'
                        }]
                    }*/
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
{/*               <TouchableOpacity
                    onPress={() => { this.SimpleItemsDialog.show() }} >
                <GiftedForm.ModalWidget
                    title='性别'
                    displayValue='gender'
                    image={require('../res/icons/color/gender.png')}
                    openModal={this.onPress}
                >
                <GiftedForm.SeparatorWidget />

                </GiftedForm.ModalWidget>
                </TouchableOpacity>

                <SimpleItemsDialog
                    items={['男' , '女' ]}
                    ref={ref => this.SimpleItemsDialog = ref}
                    onPress={(items) => {
                        this.setState({uSex:items===1?'女':'男'});
                        console.log('items:'+items+'state:'+this.state.uSex);
                    }} />*/}

  {/*              <GiftedForm.ModalWidget
                    title='所在地'
                    displayValue='country'
                    image={require('../res/icons/color/passport.png')}
                    scrollEnabled={false}

                >
                    <GiftedForm.SelectCountryWidget
                        code='alpha2'
                        name='country'
                        title='Country'
                        autoFocus={true}
                    />
                </GiftedForm.ModalWidget>
*/}

                <GiftedForm.ErrorsWidget/>
{/*                <GiftedForm.SubmitWidget
                    title='Sign up'
                    widgetStyles={{
                        submitButton: {
                         backgroundColor:'#4682B4',
                        }
                    }}
                    onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
                        if (isValid === true) {
                            values.gender = values.gender[0];
                            values.birthday = moment(values.birthday).format('YYYY-MM-DD');

                            /* Implement the request to your server using values variable
                            ** then you can do:
                            ** postSubmit(); // disable the loader
                            ** postSubmit(['An error occurred, please try again']); // disable the loader and display an error message
                            ** postSubmit(['Username already taken', 'Email already taken']); // disable the loader and display an error message
                            ** GiftedFormManager.reset('signupForm'); // clear the states of the form manually. 'signupForm' is the formName used
                            */
         /*               }

                    }}

                />
*/}
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
//export default ValidRegister;