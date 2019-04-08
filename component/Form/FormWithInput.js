/* eslint react/no-multi-comp:0, no-console:0, react/no-multi-comp:0 */

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
} from 'react-native';

import { createForm } from 'rc-form';

const { width } = Dimensions.get('window');


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
                            //label={`${label}：`}
                            //duration={150}
                            onChangeText={onChange}
                            highlightColor="#40a9ff"
                            //underlineColorAndroid="#40a9ff"
                        />
                    <View style={styles.errorinfo}>{this.getError(error)}</View>
                </View>
        );
    }
}

class FormWithInput1 extends Component {
    static propTypes = {
        form: PropTypes.object.isRequired,
    };

    constructor(props){
        super(props);
        this.state={
            uNickName:'',
            uTel:'',
            uMail:''
        }
    }

    render() {
        const { getFieldDecorator, getFieldError } = this.props.form;
        return (
            <View style={styles.listcontainer}>
                <View style={{borderBottomWidth: 0.5,borderBottomColor: '#D3D3D3',flexDirection:'row'}}>
                    <Text style={styles.innerleftText}>昵        称：</Text>
                    {getFieldDecorator('uNickName',  {
                        validateFirst: true,
                        rules: [
                            { required: true, message: '请输入昵称!' }
                        ],
                    })(
                        <FromItem
                            autoFocus
                            placeholder="输入昵称"
                            onChange={text => this.setState({uNickName: text})}
                            error={getFieldError('uNickName')}
                        />
                    )}
                </View>

                <View style={{borderBottomWidth: 0.5,borderBottomColor: '#D3D3D3',flexDirection:'row'}}>
                    <Text style={styles.innerleftText}>联系电话：</Text>
                    {getFieldDecorator('uTel', {
                        validateFirst: true,
                        rules: [
                            { required: true, message: '请输入手机号' },
                            {
                                pattern: /^1\d{10}$/,
                                message: '请输入正确的手机号',
                            },
                            {
                                validator: (rule, value, callback) => {
                                    this.checkUserNameOne(value, callback);
                                },
                                message: '手机号已经被注册!',
                            },
                        ],
                    })(
                        <FromItem
                            autoFocus
                            placeholder="手机号"
                            onChange={text => this.setState({uTel: text})}
                            error={getFieldError('uTel')}
                        />
                    )}
                </View>

                <View style={{borderBottomWidth: 0.5,borderBottomColor: '#D3D3D3',flexDirection:'row'}}>
                    <Text style={styles.innerleftText}>邮件地址：</Text>
                    {getFieldDecorator('uMail', {
                        validateFirst: true,
                        rules: [
                            { required: true, message: '请输入邮件地址' },
                            {
                                pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
                                message: '请输入正确的邮件地址',
                            },
                        ],
                    })(
                        <FromItem
                            autoFocus
                            placeholder="邮件地址"
                            onChange={text => this.setState({uMail: text})}
                            error={getFieldError('uMail')}
                        />
                    )}
                </View>

                <Button color="#40a9ff" onPress={this.submit} title="登陆" />
            </View>
        );
    }

    checkUserNameOne = (value, callback) => {
        setTimeout(() => {
            if (value === '15188888888') {
                callback('手机号已经被注册');
            } else {
                callback();
            }
        }, 2000);
    };
    submit = () => {
        this.props.form.validateFields((error) => {
            if (error) {
                return error;
            }else {
            /*alert("通过了所有验证");*/
                alert('填写的昵称'+this.state.uNickName+'填写的号码'+this.state.uTel+'填写的邮箱'+this.state.uMail);
            }
        });
    };
}
/*
class FormWithInput extends Component{

    render(){
        const WrappedForm=createForm()(FormWithInput1);
        return(
                <WrappedForm form={FormWithInput1} {this.props.form.getFieldDecorator}/>
        )
    }
}*/

const styles = StyleSheet.create({
    listcontainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 50,
        marginLeft: 15,
        justifyContent: 'center',
    },
    inputView: {
        width: width - 100,
        paddingLeft: 10,
        textAlign: 'right'
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
        color: '#404040'
    },
});
const WrappedForm=createForm()(FormWithInput1);
export default WrappedForm;