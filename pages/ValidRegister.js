'use strict';

import moment from 'moment';
import React,{Component} from 'react';
import {ToastAndroid, View} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import {GiftedForm, GiftedFormManager, GiftedFormModal} from 'react-native-gifted-form';
import Button from "../component/Button";
import realm from "../util/realm";
import {toastShort} from "../util/ToastUtil";

class ValidRegister extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            form: {
                nickName: '',//FullName
                userName:'',
                userPassword:'',
                emailAddress:'',
                tos: false,
            }
        }
    }
    handleValueChange(values) {
        //console.log('handleValueChange', values)
        this.setState({ form: values })
    }
    handle_registerClick(){
        /*realm.write(()=> {
            realm.create('User', {
                id:realm.objects('User').length,
                userName: [this.state.text].toString(),
                userPassword: [this.state.password].toString(),
                userSex: '性别',
                portrait:'',
                nickName:'安租用户'+Math.floor(Math.random() * 10000),
                userLocation:'所在地',
                cTime:new Date().toLocaleTimeString()
            });
        });*/
        //realm.js.close();
        if(GiftedFormManager.validate(this.props.GiftedForm.formName))
        {console.log('昵称'+JSON.stringify(this.state.form.fullName)+'用户名'
            +this.state.form.username+'密码'+this.state.form.password+JSON.stringify(GiftedFormManager.validate(this.props.formName)))
        }else {
            toastShort('请检查输入')
        }
        //this.props.navigation.navigate('Login');

    }
    render() {
        const { nickName, tos, userName , userPassword ,emailAddress} = this.state.form;
        //console.log('render', this.state.form);
        return (

            <GiftedForm
                formName='register' // GiftedForm instances that use the same name will also share the same states
                openModal={(Second) => {
                    this.props.navigation.navigate(Second); // The ModalWidget will be opened using this method. Tested with ExNavigator
                }}
                clearOnClose={false} // delete the values of the form when unmounted

                defaults={{
                    username: '',
                    'gender{M}': true,
                    password: '',
                    country: '所在地',
                    birthday: new Date(((new Date()).getFullYear() - 18) + ''),
                }}
                onValueChange={this.handleValueChange.bind(this)}

                validators={{
                    fullName: {
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
                    gender: {
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
                    }
                }}
            >
                <GiftedForm.SeparatorWidget />

                <GiftedForm.TextInputWidget
                    name='fullName' // mandatory
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
                            let fullName = GiftedFormManager.getValue('signupForm', 'fullName');
                            if (fullName) {
                                return fullName.replace(/[^a-zA-Z0-9-_]/g, '');
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
                    placeholder='example@nomads.ly'
                    keyboardType='email-address'
                    clearButtonMode='while-editing'
                    value={emailAddress}
                    image={require('../res/icons/color/email.png')}
                />

                <GiftedForm.SeparatorWidget />

                <GiftedForm.ModalWidget
                    title='性别'
                    displayValue='gender'
                    image={require('../res/icons/color/gender.png')}
                >
                    <GiftedForm.SeparatorWidget />

                    <GiftedForm.SelectWidget name='gender' title='Gender' multiple={false}>
                        <GiftedForm.OptionWidget image={require('../res/icons/color/female.png')} title='Woman' value='W'/>
                        <GiftedForm.OptionWidget image={require('../res/icons/color/male.png')} title='Man' value='M'/>
                        <GiftedForm.OptionWidget image={require('../res/icons/color/other.png')} title='Other' value='O'/>
                    </GiftedForm.SelectWidget>
                </GiftedForm.ModalWidget>

                {/*<GiftedForm.ModalWidget
                    title='Birthday'
                    displayValue='birthday'
                    image={require('../res/icons/color/birthday.png')}

                    scrollEnabled={false}
                >
                    <GiftedForm.SeparatorWidget/>
                    <GiftedForm.DatePickerIOSWidget
                        name='birthday'
                        mode='date'

                        getDefaultDate={() => {
                            return new Date(((new Date()).getFullYear() - 18) + '');
                        }}
                    />
                </GiftedForm.ModalWidget>*/}

                <GiftedForm.ModalWidget
                    title='所在地'
                    displayValue='country'
                    image={require('../res/icons/color/passport.png')}
                    scrollEnabled={false}

                >
                {/*    <GiftedForm.SelectCountryWidget
                        code='alpha2'
                        name='country'
                        title='Country'
                        autoFocus={true}
                    />*/}
                </GiftedForm.ModalWidget>

                {/*<GiftedForm.ModalWidget
                    title='Biography'
                    displayValue='bio'

                    image={require('../res/icons/color/book.png')}

                    scrollEnabled={true} // true by default
                >
                    <GiftedForm.SeparatorWidget/>
                    <GiftedForm.TextAreaWidget
                        name='bio'

                        autoFocus={true}

                        placeholder='Something interesting about yourself'
                    />
                </GiftedForm.ModalWidget>*/}

                <GiftedForm.ErrorsWidget/>
                <GiftedForm.SubmitWidget
                    title='Sign up'
                    widgetStyles={{
                        submitButton: {
                            backgroundColor:'#4682B4',
                        }
                    }}
                    onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
                        if (isValid === true) {
                            // prepare object
                            values.gender = values.gender[0];
                            values.birthday = moment(values.birthday).format('YYYY-MM-DD');

                            /* Implement the request to your server using values variable
                            ** then you can do:
                            ** postSubmit(); // disable the loader
                            ** postSubmit(['An error occurred, please try again']); // disable the loader and display an error message
                            ** postSubmit(['Username already taken', 'Email already taken']); // disable the loader and display an error message
                            ** GiftedFormManager.reset('signupForm'); // clear the states of the form manually. 'signupForm' is the formName used
                            */
                        }
                    }}
                />
                <Button
                    style={{
                        margin: 10,
                        backgroundColor: '#3498db',
                        borderWidth: 0,
                        borderRadius: 0,
                        height: 40,}}
                    text={'注册'} onPress={this.handle_registerClick.bind(this)}/>
                <GiftedForm.NoticeWidget
                    title=''
                />
                <GiftedForm.HiddenWidget name='tos' value={true} />

            </GiftedForm>
        );
    }

}
export default ValidRegister = createStackNavigator(
    {
        First: { screen: ValidRegister },

        Second: { screen: GiftedFormModal }
    });
//export default ValidRegister;