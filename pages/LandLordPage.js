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

import { NaviGoBack } from '../util/CommonUtils';
import { toastShort } from '../util/ToastUtil';
import ShortLine from '../component/ShortLine';
import {COMMENT_DATA} from '../res/data/VirtualData'
import GridView from '../component/GridView';
import Comment from  '../component/Comment';
import BackHeader from '../component/BackHeader';

let {height, width} = Dimensions.get('window');

class LandLordPage extends React.Component {
    constructor(props) {
        super(props);
        this.buttonBackAction=this.buttonBackAction.bind(this);
        this.buttonItemAction=this.buttonItemAction.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.renderHeaderContent = this.renderHeaderContent.bind(this);
        this.state={
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            commentList:eval(COMMENT_DATA).data,
        }
    }
    static statusBar:{
        color:'#B0C4DE',
        barStyle: 'light-content',
        hidden:false
    }

    //返回
    buttonBackAction(){
        const {navigator} = this.props;
        return NaviGoBack(navigator);
    }
    buttonItemAction(position){
        const {navigator} = this.props.navigator;
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
            InteractionManager.runAfterInteractions(() => {
                navigator.push({
                    component: Comment,
                    name: 'Comment'
                });
            });
        }
    }
    //渲染房东基本信息布局
    renderStoreBasic(){
        const {navigator,route} = this.props;
        return (
            <View style={{height: 160,alignItems: 'center', justifyContent: 'center' }}>
                <ImageBackground source={require('../res/images/beed.jpeg')} style={{width:width,height:160}}>
                    <View style={{flexDirection:'row',marginLeft:24,height:68,alignItems:'center',marginTop:12}}>
                        <Image source={require('../res/images/logo_dog.png')}
                               style={{width:68,height:68,borderRadius:34}}/>
                        <View style={{marginLeft:15}}>
                            <Text style={{color:'#708090',fontSize:16,marginTop:8,backgroundColor:'rgba(1,1,1,0)'}}>姓名123</Text>
                            <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                                <Image source={require('../res/images/fire-fill.png')}
                                       style={{width:14,height:14}}/>
                                <Text style={{color:'#708090',fontSize:13,marginLeft:5,backgroundColor:'rgba(1,1,1,0)'}}>66条评论</Text>
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
        return (
            <View style={{backgroundColor:'white'}}>
                <View style={{flexDirection:'row',height:45}}>
                    <View style={{flex:1}}>
                        <TouchableOpacity style={{justifyContent:'center',alignItems:'center',flex:1}}
                                          onPress={()=>{this.buttonItemAction(0)}}>
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
                               style={{width:16,height:18,marginLeft:15}}/>
                        <Text style={{color:'#000',fontSize:12,marginLeft:8}}>测试房主地址123号</Text>
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
                        <Text style={{color:'#000',fontSize:12,marginLeft:8}}>+(86)13800138000</Text>
                        <View style={{flex:1,alignItems:'flex-end'}}>
                            <Image source={require('../res/images/ic_center_right_arrow.png')}
                                   style={{width:12,height:18,marginRight:15}}/>
                        </View>
                    </View>
                </TouchableOpacity>
                {/*<Image source={require('../res/images/ic_center_line.png')}/>
                <View style={{height:45,flex:1,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>{this.buttonItemAction(5)}} style={styles.share_img}>
                        <Text style={styles.share_btn_tv}>开始点餐</Text>
                    </TouchableOpacity>
                </View>*/}
            </View>
        );
    }
    //渲染底部评论信息模块
    renderBottomComment(){
        return (
            <View style={{flex:1}}>
                {this.renderContent(this.state.dataSource.cloneWithRows(
                    this.state.commentList === undefined ? [] : this.state.commentList))}
            </View>
        );
    }
    //进行渲染数据
    renderContent(dataSource) {
        return (
            <ListView
                initialListSize={1}
                dataSource={dataSource}
                renderRow={this.renderItem}
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
    renderItem(comment) {
        return (
            <View>
                <View style={{flexDirection:'row',margin:10}}>
                    <Image source={require('../res/images/logo_house.png')} style={{width:35,height:35}}/>
                    <View style={{flex:1,marginLeft:8}}>
                        <Text style={{color:'black',fontSize:15}}>{comment.nickname}</Text>
                        <Text style={{color:'#777',fontSize:12,marginTop:5}}>{comment.content}</Text>
                    </View>
                    <View style={{marginLeft:5}}><Text style={{color:'#777',fontSize:12}}>{comment.createTime}</Text></View>
                </View>
                {this.renderCommentImage(comment.imges)}
            </View>
        );
    }
    //渲染图片布局
    renderCommentImage(imges){
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
    }
    //渲染ListView的Header布局
    renderHeaderContent(){
        return (
            <View>
                {this.renderStoreBasic()}
                {this.renderCenterBar()}
                <View style={{height:32,alignItems:'center',flexDirection:'row',backgroundColor:'#f5f5f5'}}>
                    <Text style={{marginLeft:10}}>评论信息</Text>
                    <View style={{flex:1,alignItems:'flex-end'}}>
                        <TouchableOpacity onPress={()=>{this.buttonItemAction(6)}}>
                            <View style={{flexDirection:'row',height:32,alignItems:'center'}}>
                                <Text style={{fontSize:12}}>添加评论</Text>
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
    }
});
export default LandLordPage;