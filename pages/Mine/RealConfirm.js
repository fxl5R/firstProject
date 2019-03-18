
/**
 * 房屋信息提交结果
 */
'use strict';
import React, { Component } from 'react';
import {
    Image,
    ImageBackground,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ListView,
    ScrollView, TextInput, ToastAndroid,
} from 'react-native';
import BackHeader from '../../component/BackHeader';
import realm from '../../util/realm.js';

let {height, width} = Dimensions.get('window');
console.log('pingmugao:'+height+'pingmukuan:'+width);

class RealConfirm extends Component {
    constructor(props) {
        super(props);
        this.state={
            realName:'',
            IDCardNO:'',
        }
    }

    //onPress function
    ClickConfirm(){

    }
    render() {
        let users=realm.objects('User').filtered("online == $0", 1);
        let user=users[0];
        const {navigator,route} = this.props;
        return (
            <View style={{backgroundColor:'#f5f5f5',flex:1}}>
                <BackHeader navigation={this.props.navigation} title={'实名认证'} />
                <View style={{marginTop:10,marginLeft:10,marginRight:10,backgroundColor:'white'}}>
                    <View style={{justifyContent:'center',alignItems:'center',height:100}}>
                        <Image source={require('../../res/images/ic_account.png')} style={{width:40,height:40}}/>
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
                    <Image source={require('../../res/images/ic_center_line.png')} style={{height:1,width:'100%',marginTop:22}}/>
                    <View style={{marginTop:22,marginLeft:13,marginRight:13}}>
                        <View style={styles.ButtonContainer}>
                            <Text style={{marginTop:10,fontSize:13.5,color:'#999'}}>我同意《认证服务协议》</Text>
                            <TouchableOpacity
                                onPress={realm.write(() => {
                                    realm.create('User', {
                                        id:user.id,
                                        realName:this.state.realName,
                                        IDCardNO:this.state.IDCardNO,
                                        isRealPeople:1}, true);/*更新用户实名认证信息*/
                                    ToastAndroid.show('用户真实姓名'+this.state.realName+'身份证号'+this.state.IDCardNO,ToastAndroid.SHORT);
                                })}
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
});

export default RealConfirm;
