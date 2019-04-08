

import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Button,
    Dimensions,
    TextInput,
    Text,
    View,
    Alert,
    ImageBackground,
    Image
} from 'react-native';

import { createForm } from 'rc-form';
import BackHeader from "../../component/BackHeader";
import realm from "../../util/realm";

const { height,width } = Dimensions.get('window');
let users=realm.objects('User').filtered("online == $0", 1);
let user=users[0];
class FromItem extends Component {
    static propTypes = {
        label: PropTypes.string,
        onChange: PropTypes.func,
        value: PropTypes.string,
        error: PropTypes.array,
    };
    getError = error => {
        if (error) {
            return error.map(info => {
                return (
                    <Text style={styles.errorinfoText} key={info}>
                        {info}
                    </Text>
                );
            });
        }
        return null;
    };
    render() {
        const { label, onChange, value, error } = this.props;
        return (
            <View style={styles.input}>
                <TextInput
                    style={styles.inputView}
                    size='md'
                    value={value || ''}
                    onChangeText={onChange}
                    highlightColor="#40a9ff"
                    underlineColorAndroid="#40a9ff"
                />
                <View style={styles.errorinfo}>{this.getError(error)}</View>
            </View>
        );
    }
}

class SecurityForm extends Component {
    static propTypes = {
        form: PropTypes.object.isRequired,
    };

    constructor(props){
        super(props);
        this.state={
            oldPwd:'',
            newPwd1:'',
            newPwd2:''
        }
    }

    render() {
        const { getFieldDecorator, getFieldError } = this.props.form;
        return (
            <View >
                <BackHeader navigation={this.props.navigation} title={'安全中心'}/>
                <ImageBackground source={require('../../res/images/about_bg.png')} style={{width:width/0.95,height:height}}>
                <View style={{marginTop: 30,alignItems:'center',justifyContent: 'center'}}>
                    <Image style={{height:150,width:150}} source={require('../../res/images/qr_code.png')}/>
                    <Text>扫描二维码联系我们</Text>
                </View>
                <View style={styles.listcontainer}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.innerleftText}>原密码：</Text>
                        {getFieldDecorator('oldPwd',  {
                            validateFirst: true,
                            rules: [
                                { required: true, message: '请输入原密码!' }
                            ],
                        })(
                            <FromItem
                                autoFocus
                                placeholder="输入原密码"
                                onChange={text => this.setState({oldPwd: text})}
                                error={getFieldError('oldPwd')}
                            />
                        )}
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.innerleftText}>新密码：</Text>
                        {getFieldDecorator('newPwd1', {
                            validateFirst: true,
                            rules: [
                                { required: true, message: '请输入新密码' },
    /*                            {
                                    pattern: /^1\d{10}$/,
                                    message: '请输入正确的手机号',
                                },*/
                            ],
                        })(
                            <FromItem
                                autoFocus
                                placeholder="输入新密码"
                                onChange={text => this.setState({newPwd1: text})}
                                error={getFieldError('newPwd1')}
                            />
                        )}
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.innerleftText}>新密码：</Text>
                        {getFieldDecorator('newPwd2', {
                            validateFirst: true,
                            rules: [
                                { required: true, message: '请再次确认新密码' },
                                {
                                    validator: (rule, value, callback) => {
                                        this.checkPasswordOne(value, callback);
                                    },
                                    message: '两次密码不一致!',
                                },
                            ],
                        })(
                            <FromItem
                                autoFocus
                                placeholder="再次确认新密码"
                                onChange={text => this.setState({newPwd2: text})}
                                error={getFieldError('newPwd2')}
                            />
                        )}
                    </View>

                    <View style={{marginTop:20}}>
                    <Button
                        color="#40a9ff"
                        onPress={this.submit} title="修改密码" />
                    </View>
                </View>

                </ImageBackground>
            </View>
        );
    }

    checkPasswordOne = (value, callback) => {
        setTimeout(() => {
            if (value !== this.state.newPwd1) {
                callback('两次输入密码不一致！');
            } else {
                callback();
            }
        }, 1000);
    };
    submit = () => {
        const oldPassword=user.userPassword;
        this.props.form.validateFields((error) => {
            if (error) {
                return error;
            }else if(oldPassword===this.state.oldPwd) {
                realm.write(() => {
                    {/*更新用户密码*/}
                    if(this.state.newPwd2){
                        realm.create('User',{id:user.id,userPassword:this.state.newPwd2},true);}
                    alert(JSON.stringify(user));
                });
                /*alert("通过了所有验证");*/
                alert('原密码'+this.state.oldPwd+'新密码'+this.state.newPwd1+'新密码2'+this.state.newPwd2);
            }else{
                alert('请检查原密码');
            }
        });
    };
}


const styles = StyleSheet.create({
    listcontainer: {
        //flex: 1,
        //backgroundColor:'rgba(248,248,255,0.9)',
        alignItems: 'center',
        padding: 30,
        marginLeft:2,
        justifyContent: 'center',
    },
    inputView: {
        width: width - 100,
        paddingLeft: 10,
        textAlign: 'right',
        color:'#fff'
    },
    input: {
        height: 42,
        fontSize: 16,
        alignItems: 'baseline'
    },
    errorinfo: {
        //marginTop: 10,
    },
    errorinfoText: {
        color: 'red',
    },
    innerleftText: {
        marginTop:10,
        fontSize: 15,
        //color: '#fff'//#404040
    },
});
const AboutSecurity=createForm()(SecurityForm);
export default AboutSecurity;