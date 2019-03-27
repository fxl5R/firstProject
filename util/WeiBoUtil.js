
import * as WeiboAPI from 'rn-weibo';
import Button from "../component/Button";
import {TouchableHighlight, View,Linking} from "react-native";
import React,{Component} from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class WeiboUtil extends Component{

open=()=>{
    let profilelink1='\'https://weibo.com/\'';
    let profilelink2='https://weibo.com/';
    let userIDD=2219202892;
    console.log( '个人主页链接'+profilelink1);
    console.log(profilelink2.toString());
    let url = profilelink2.toString()+userIDD;
    Linking.openURL(url)
};


render(){
    let config = {
        appKey:"925581119",
        scope: 'all',
        redirectURI: 'https://api.weibo.com/oauth2/default.html',
    };
    let data={
        type: 'text',
        text: '文字内容',
    };
    return(
        <View style={{marginTop: 10,flexDirection:'column',justifyContent:'center'}}>
            <Button text={'登录'} onPress={()=>{
                WeiboAPI.login(config)
                    .then(res=>{
                        console.log('login success:',res);
                        console.log('取出userID'+res.userID);
                        //登陆成功后打印出的数据如下：
                        // {
                        //     refreshToken: '2.00Gc2PbDcecpWC127d0bc690FE7TzD',
                        //     type: 'WBAuthorizeResponse',
                        //     expirationDate: 1686362993740.243,
                        //     userID: '3298780934',
                        //     errCode: 0,
                        //     accessToken: '2.00Gc2PbDcecpWCa981899f410o5hEX'
                        // }

                    }).catch(err=>{
                    console.log('login fail:',err)
                });

            }}/>

            <Button text={'分享'} onPress={()=>{

                WeiboAPI.share(data).then(res=>{
                    console.log('share success:',res)
                    //登陆成功后打印出的数据如下：
                    // {
                    //     refreshToken: '2.00Gc2PbDcecpWC127d0bc690FE7TzD',
                    //     type: 'WBAuthorizeResponse',
                    //     expirationDate: 1686362993740.243,
                    //     userID: '3298780934',
                    //     errCode: 0,
                    //     accessToken: '2.00Gc2PbDcecpWCa981899f410o5hEX'
                    // }
                }).catch(err=>{
                    console.log('share fail:',err)
                });

            }}/>
            <TouchableHighlight onPress={this.open}>
            <Icon name={"sina-weibo"} size={30} light/>
            </TouchableHighlight>
        </View>
    )
}


/*let data={
    type: 'text',
    text: 文字内容,
};
WeiboAPI.share(data);// 分享文字*/
}