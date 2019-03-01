/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, View,TextInput,Text,Image,PixelRatio} from 'react-native';
import Button from '../component/Button';

type Props = {};
export default class login extends Component<Props> {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
        };
    }
    render() {
        return (
            <View style={styles.view}>
                <View style={styles.editGroup}>
                    <View style={styles.username}>
                        <TextInput
                            style={styles.edit}
                            placeholder="用户名"
                            placeholderTextColor='#4682B4'
                            onChangeText={(text)=>this.setState({text})}
                        />
                    </View>

                    <View style={{height:1/PixelRatio.get(),backgroundColor: '#c4c4c4'}}/>

                    <View style={styles.password}>
                        <TextInput
                            style={styles.edit}
                            placeholder='密码'
                            placeholderTextColor='#4682B4'
                            secureTextEntry={true}
                            onChangeText={(password)=>this.setState({password})}
                        />
                    </View>

                    <View style={{marginTop: 10}}>
                        <Button text={'登录'} onPress={this._handleClick.bind(this)}/>
                    </View>

                </View>
            </View>
        );
    }
    _handleClick(){
        console.log('username:'+ this.state.text);
        console.log('password'+ this.state.password);
        alert('username:'+this.state.text+'password:'+this.state.password);
    }
}

const styles = StyleSheet.create({
    view:{
        flex:1,
        backgroundColor: '#BAE4F5'
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
        marginTop:100,
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
