import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text, ToastAndroid,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import FormArrowToDetail from '../component/Form/FormArrowToDetail';
import FormWithPicture from '../component/Form/FormWithPicture';
import FormWithPairText from '../component/Form/FormWithPairText';
import realm from '../util/realm.js';
import { WhiteSpace, WingBlank,Button} from "@ant-design/react-native";
import platform from "../util/platform";
import {AlertDialog} from "react-native-pickers";

let userdatas=realm.objects('User').filtered("online == $0", 1);
let userdata=userdatas[0];
export default class MinePage extends Component {

    constructor(props) {
        super(props);
        let userdatas=realm.objects('User').filtered("online == $0", 1);
        let userdata=userdatas[0];
        this.state = {
            thisUser:userdata
        }
        //this._loginOut=this._loginOut.bind(this);
        //this.logout=this.logout.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{height:48,backgroundColor:'#B0C4DE',flexDirection:'row',alignItems:'center'}}>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:18,color:'white',alignSelf:'center'}}>个人中心</Text>
                    </View>
                    <View style={{height:48,width:48}}/>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.partContainer}>
                        <FormWithPicture
                            nickName={this.state.thisUser.nickName}
                            contactText={this.state.thisUser.userName}
                            pictureUri={{uri:this.state.thisUser.portrait}}
                            onFormClick={() => this.personalProfile()}
                        />
                        <FormWithPairText
                            leftText="实名认证"
                            onFormClick={() => {this.props.navigation.navigate('RealConfirm')}}
                            cutOffLine={false}
                        />
                    </View>
                    <View style={styles.partContainer}>
                        <FormArrowToDetail
                            leftText={'房屋管理'}
                            onFormClick={() => this.myPublishHouse()}
                            cutOffLine={false}
                        />
                    </View>
                    <View style={styles.partContainer}>
                        <FormArrowToDetail
                            leftText={'我的评论'}
                            onFormClick={() => this.myComments()}
                        />
                        <FormArrowToDetail
                            leftText={'我的收藏'}
                            onFormClick={() => this.evaluateApp()}
                        />
                        <FormArrowToDetail
                            leftText={'安全中心'}
                            onFormClick={() => this.aboutTheApp()}
                            cutOffLine={false}
                        />
                    </View>
                    {/*<Button
                        style={{ marginTop: 15,paddingTop:20}}
                        text="退出登录"
                        onPress={() => {
                            this.props.navigation.navigate('Login')
                            realm.write(() => {
                                realm.create('User', {id:this.state.thisUser.id,online: 0}, true);//更新离线状态
                                ToastAndroid.show('在线状态为'+this.state.thisUser.online,ToastAndroid.SHORT);
                            });
                        }}
                    />*/}
                    <WhiteSpace size="xl" />
                    <WingBlank >
                        <Button style={{ borderWidth: platform.borderH }}
                                onPress={() => {

                                    this.props.navigation.navigate('Login');
                                    realm.write(() => {
                                        realm.create('User', {id:this.state.thisUser.id,online: 0}, true);//更新离线状态
                                        ToastAndroid.show('在线状态为'+this.state.thisUser.online,ToastAndroid.SHORT);
                                    });

                                }}>退出登录</Button>
                        {/*<Button style={{ borderWidth: platform.borderH }}
                                onPress={() => { this.AlertDialog.show() }}>退出登录</Button>*/}
                    </WingBlank>
                </ScrollView>
                <AlertDialog
                    messageText={'确定退出登录？'}
                    showAnimationType='timing'
                    onPress={(isOK) => {
                        alert(isOK ? '退出' : '取消');
                    }}
                    ref={ref => this.AlertDialog = ref}
                />
            </View>
        )
    }

    /**
     * 跳转至 个人资料
     */
    /*personalProfile = () => {
        console.log('点击了个人资料');
        this.props.navigation.navigate('PersonalProfile', {
            nickName: this.state.thisUser.nickName,
            id:this.state.thisUser.id
        });
    };*/
    personalProfile = () => {
        console.log('点击了个人资料');
        this.props.navigation.navigate('PersonalProfile', {
            nickName: this.state.thisUser.nickName,
            id:this.state.thisUser.id
        });
    };

    /**
     * 跳转至 房屋管理
     */
    myPublishHouse = () => {
        this.props.navigation.navigate('HouseManager',{
            itemId: userdata.id});
    };

    /**
     * 跳转至 评论管理
     */
    myComments = () => {
        console.log('点击了评论管理');
        this.props.navigation.navigate('CommentManager',{
            itemId: userdata.id});
    };

    /**
     * 跳转至 我的收藏
     */
    evaluateApp = () => {
        console.log('点击了我的收藏页面');
        this.props.navigation.navigate('EvaluateApp');
    };

    /**
     * 跳转至 安全中心
     */
    aboutTheApp = () => {
        console.log('点击了安全中心');
        this.props.navigation.navigate('AboutApp');
    };

    /**
     * 跳转至 登录页面
     */
    logout = () => {
        //ToastAndroid.show('在线状态为'+this.state.thisUser.online,ToastAndroid.SHORT);
        console.log('点击了退出登录');
        realm.write(() => {
            realm.create('User', {id:this.state.thisUser.id,online: 0}, true);//更新离线状态
            ToastAndroid.show('在线状态为'+this.state.thisUser.online,ToastAndroid.SHORT);
        });
        this.props.navigation.navigate('Login');
    }

/*    _loginOut=() =>{
        Modal.alert(
            '确定退出登录？',
            '',
            [
                { text: '取消', onPress: () => { }, style: 'cancel' },
                {
                    text: '确定', onPress: () => {
                        this.props.navigation.navigate('Login');
                        realm.write(() => {
                            realm.create('User', {id:this.state.thisUser.id,online: 0}, true);//更新离线状态
                            ToastAndroid.show('在线状态为'+this.state.thisUser.online,ToastAndroid.SHORT);
                        });
                    }
                },
            ],
        );
    }*/
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FFFFFF',
    },
    partContainer: {
        marginTop: 10,
        borderTopColor:'#D3D3D3',
        borderTopWidth: 0.5,
        borderBottomColor:'#D3D3D3',
        borderBottomWidth: 0.5,
        paddingVertical: 5
    }
});

