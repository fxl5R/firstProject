/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

/**
 * 商家详情
 */
'use strict';
import React from 'react';
import {
    Dimensions,
    Image,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ListView,
    InteractionManager,
    ImageBackground
} from 'react-native';

import { toastShort } from '../util/ToastUtil';
import ShortLine from '../component/ShortLine';
import {COMMENT_DATA} from '../res/data/VirtualData'
import GridView from '../component/GridView';
import BackHeader from '../component/BackHeader';
import realm from "../util/realm";

let {height, width} = Dimensions.get('window');

class LandLordPage extends React.Component {

    constructor(props) {
        super(props);
        this.buttonItemAction=this.buttonItemAction.bind(this);
        //this.renderItem = this.renderItem.bind(this);
        this.renderHeaderContent = this.renderHeaderContent.bind(this);
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');//从房屋详情获取发布房屋的用户的ID
        let user_publisher=realm.objects('User').filtered('id==$0',itemId)[0];//用发布人ID关联User表查询该用户的相关信息
        let comments=realm.objects('Comments').filtered('to_uid==$0',itemId);//查询该用户的收到的所有评论
        this.state={
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            commentList:[comments],
        }
    }
    static statusBar:{
        color:'#B0C4DE',
        barStyle: 'light-content',
        hidden:false
    };

    buttonItemAction(position){
        if(position === 1){
            //收藏
            toastShort('点击收藏...');
        }else if(position === 2){
            //分享
            toastShort('点击分享...');
        }else if(position === 3){
            //地点
            toastShort('点击地点...');
        }else if(position === 4){
            //拨打电话
            toastShort('点击拨打电话...');
        }else if(position === 5 || position ===0){
            //点击评论
            this.props.navigation.navigate('CommentManager');
            /*InteractionManager.runAfterInteractions(() => {
                navigator.push({
                    component: Comment,
                    name: 'Comment'
                });
            });*/
        }
    }
    //渲染房东基本信息布局
    renderStoreBasic(){
        const {navigator,route} = this.props;
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');//从房屋详情获取发布房屋的用户的ID
        let comments=realm.objects('Comments').filtered('to_uid==$0',itemId);
        let user_publisher=realm.objects('User').filtered('id==$0',itemId)[0];//用发布人ID关联User表查询该用户的相关信息
        let commentNum=comments.length;//查找用户收到的评论数目require('../res/images/logo_dog.png')
        console.log('评论条数'+commentNum);
        return (
            <View style={{height: 160,alignItems: 'center', justifyContent: 'center' }}>
                <ImageBackground source={require('../res/images/beed.jpeg')} style={{width:width,height:160}}>
                    <View style={{flexDirection:'row',marginLeft:24,height:68,alignItems:'center',marginTop:12}}>
                        <Image source={{uri:user_publisher.portrait}}
                               style={{width:68,height:68,borderRadius:34}}/>
                        <View style={{marginLeft:15}}>
                            <Text style={{color:'#708090',fontSize:16,marginTop:8,backgroundColor:'rgba(1,1,1,0)'}}>{user_publisher.nickName}</Text>
                            <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                                <Image source={require('../res/images/fire-fill.png')}
                                       style={{width:14,height:14}}/>
                                <Text style={{color:'#708090',fontSize:13,marginLeft:5,backgroundColor:'rgba(1,1,1,0)'}}>收到{commentNum}条评论</Text>
                            </View>
                            <View style={{flexDirection:'row',marginTop:5,alignItems:'center'}}>
                                <Image source={require('../res/images/time-circle-fill.png')}
                                       style={{width:14,height:14}}/>
                                <Text style={{color:'#708090',fontSize:13,marginLeft:5,backgroundColor:'rgba(1,1,1,0)'}}>最快回复：6小时</Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
    //渲染中间部分功能界面布局
    renderCenterBar(){
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');//从房屋详情获取发布房屋的用户的ID
        let user_publisher=realm.objects('User').filtered('id==$0',itemId)[0];
        return (
            <View style={{backgroundColor:'white'}}>
                <View style={{flexDirection:'row',height:45}}>
                    <View style={{flex:1}}>
                        <TouchableOpacity style={{justifyContent:'center',alignItems:'center',flex:1}}
                                          onPress={()=>{this.props.navigation.navigate('CommentApp',{
                                              itemId: user_publisher.id})}}>{/*onPress={()=>{this.buttonItemAction(0)}}*/}
                            <View style={{justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../res/images/ic_hmsg2.png')}
                                       style={{width:20,height:20}}/>
                                <Text style={{fontSize:12,color:'black',marginTop:3}}>评论</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Image source={require('../res/images/store/ic_store_shu.png')} style={{height:30,width:1,marginTop:7}}/>
                    <View style={{flex:1}}>
                        <TouchableOpacity style={{justifyContent:'center',alignItems:'center',flex:1}}
                                          onPress={()=>{this.buttonItemAction(1)}}>
                            <View style={{justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../res/images/ic_collect.png')}
                                       style={{width:20,height:20}}/>
                                <Text style={{fontSize:12,color:'black',marginTop:3}}>收藏</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Image source={require('../res/images/store/ic_store_shu.png')} style={{height:30,width:1,marginTop:7}}/>
                    <View style={{flex:1}}>
                        <TouchableOpacity style={{justifyContent:'center',alignItems:'center',flex:1}}
                                          onPress={()=>{this.buttonItemAction(2)}}>
                            <View style={{justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../res/images/ic_share.png')}
                                       style={{width:20,height:20}}/>
                                <Text style={{fontSize:12,color:'black',marginTop:3}}>分享</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <Image source={require('../res/images/ic_center_line.png')}/>
                <TouchableOpacity onPress={()=>{this.buttonItemAction(3)}}>
                    <View style={{flexDirection:'row',height:35,alignItems:'center',flex:1}}>
                        <Image source={require('../res/images/store/merchants/ic_merchants_location.png')}
                               style={{width:16,height:20,marginLeft:15}}/>
                        <Text style={{color:'#000',fontSize:12,marginLeft:8}}>{user_publisher.userLocation}</Text>
                        <View style={{flex:1,alignItems:'flex-end'}}>
                            <Image source={require('../res/images/ic_center_right_arrow.png')}
                                   style={{width:12,height:18,marginRight:15}}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <ShortLine/>
                <TouchableOpacity onPress={()=>{this.buttonItemAction(4)}}>
                    <View style={{flexDirection:'row',height:35,alignItems:'center',flex:1}}>
                        <Image source={require('../res/images/store/merchants/ic_merchants_phone.png')}
                               style={{width:16,height:18,marginLeft:15}}/>
                        <Text style={{color:'#000',fontSize:12,marginLeft:8}}>{user_publisher.userTel}</Text>
                        <View style={{flex:1,alignItems:'flex-end'}}>
                            <Image source={require('../res/images/ic_center_right_arrow.png')}
                                   style={{width:12,height:18,marginRight:15}}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    //渲染底部评论信息模块
    renderBottomComment(){
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');//从房屋详情获取发布房屋的用户的ID
        let comments=realm.objects('Comments').filtered('to_uid==$0',itemId);
        console.log('renderBottomComment!!!!'+JSON.stringify(this.state.dataSource)+JSON.stringify(comments));
        return (
            <View style={{flex:1}}>
                {this.renderContent(this.state.dataSource.cloneWithRows(
                    comments === undefined ? [] : comments))}
            </View>
        );
    }
    //进行渲染数据
    renderContent(dataSource) {
        return (
            <ListView
                initialListSize={1}
                dataSource={dataSource}
                //renderRow={this.renderItem}
                renderRow={(rowData) =>
                    <View>
                    <View style={{flexDirection:'row',margin:10}} >
                        <Image source={{uri:rowData.from_portrait}} style={{width:35,height:35}}/>
                        <View style={{flex:1,marginLeft:8}}>
                            <Text style={styles.comment_username}>{rowData.from_nickName}</Text>
                            <Text style={{color:'#777',fontSize:12,marginTop:5}}>{rowData.content}</Text>
                        </View>
                        <View style={{marginLeft:5}}><Text style={{color:'#777',fontSize:12}}>{rowData.createTime}</Text></View>
                    </View>
                    {/*{this.renderCommentImage(comment.imges)}*/}
                </View>}
                style={{backgroundColor:'white',flex:1}}
                onEndReachedThreshold={10}
                enableEmptySections={true}
                renderSeparator={this._renderSeparatorView}
                renderHeader={this.renderHeaderContent}
            />
        );
    }
    /**
     * Render a separator between rows
     */
    _renderSeparatorView(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
        return (
            <View key={`${sectionID}-${rowID}`} style={styles.separator} />
        );
    }
    //渲染评论
/*    renderItem(comments) {
        comments=this.state.commentList;
        console.log('renderItem22'+JSON.stringify(comments));
        return (
            <View>
                <View style={{flexDirection:'row',margin:10}} key={index}>
                    {/!*<Image source={{uri:comments.}} style={{width:35,height:35}}/>*!/}
                    <View style={{flex:1,marginLeft:8}}>
                        <Text style={{color:'black',fontSize:15}}>{comments.from_uid}</Text>
                        <Text style={{color:'#777',fontSize:12,marginTop:5}}>{comments.content}</Text>
                    </View>
                    <View style={{marginLeft:5}}><Text style={{color:'#777',fontSize:12}}>{comments.createTime}</Text></View>
                </View>
                {/!*{this.renderCommentImage(comment.imges)}*!/}
            </View>
        );
    }*/
    //渲染图片布局
/*    renderCommentImage(imges){
        return (
            <View style={{marginLeft:50,marginBottom:5}}>
                <GridView
                    items={Array.from(imges)}
                    itemsPerRow={3}
                    renderItem={this.renderImageItem}
                />
            </View>
        );
    }
    renderImageItem(rowData) {
        return (
            <Image  key={rowData.imgUrl} source={{uri:rowData.imgUrl}} style={{width:70,height:70,margin:5}}/>
        );
    }*/
    //渲染ListView的Header布局
    renderHeaderContent(){
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');//从房屋详情获取发布房屋的用户的ID
        let user_publisher=realm.objects('User').filtered('id==$0',itemId)[0];//用发布人ID关联User表查询该用户的相关信息
        return (
            <View>
                {this.renderStoreBasic()}
                {this.renderCenterBar()}
                <View style={{height:32,alignItems:'center',flexDirection:'row',backgroundColor:'#f5f5f5'}}>
                    <Text style={{marginLeft:10}}>评论信息</Text>
                    <View style={{flex:1,alignItems:'flex-end'}}>
                        <TouchableOpacity onPress={()=>{this.buttonItemAction(6)}}>
                            <View style={{flexDirection:'row',height:32,alignItems:'center'}}>
                                <Text style={{fontSize:12}} onPress={()=>{
                                    this.props.navigation.navigate('CommentDisplay',{
                                        itemId: user_publisher.id
                                    });
                                    /*alert('test success');*/
                                }}>查看所有评论</Text>
                                <Image source={require('../res/images/ic_center_right_arrow.png')}
                                       style={{width:12,height:18,marginRight:15}}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
    render() {

        return (
            <View style={{backgroundColor:'#f5f5f5',flex:1}}>
                <BackHeader navigation={this.props.navigation} title={'房主信息'}/>
                {this.renderBottomComment()}
            </View>
        );
    }
}
let styles = StyleSheet.create({
    share_img:{
        width:260,
        height:35,
        backgroundColor:'red',
        justifyContent:'center',
    },
    share_btn_tv:{
        color:'white',
        alignSelf:'center',
        backgroundColor:'#00000000'
    },
    separator: {
        height: 1,
        backgroundColor: '#eee'
    },
    comment_username:{
        color:'#00a3cf',
        fontStyle:'italic'
    },
});
export default LandLordPage;