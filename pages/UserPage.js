/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

/**
 * 个人主页详情
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
    ImageBackground, Linking, ScrollView, Platform, Alert
} from 'react-native';

import { toastShort } from '../util/ToastUtil';
import ShortLine from '../component/ShortLine';
import BackHeader from '../component/BackHeader';
import realm from "../util/realm";

import * as WeiboAPI from 'rn-weibo';
import Icon from "react-native-vector-icons/FontAwesome5";
import {SegmentedControl, Tabs} from '@ant-design/react-native';
import {Menu} from "teaset";


let {height, width} = Dimensions.get('window');
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class UserPage extends React.Component {

    constructor(props) {
        super(props);
        this.buttonItemAction=this.buttonItemAction.bind(this);
        //this.renderItem = this.renderItem.bind(this);
        this.renderHeaderContent = this.renderHeaderContent.bind(this);
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');//从评论列表详情获取发布评论的用户的ID
        let user_publisher=realm.objects('User').filtered('id==$0',itemId)[0];//用发布人ID关联User表查询该用户的相关信息
        let comments=realm.objects('Comments').filtered('to_uid==$0',itemId);//查询该用户的收到的所有评论
        this.state={
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            commentList:[comments],
        };

        this.GoToUserDetail=this.GoToUserDetail.bind(this);
        this.GoToHouseDetail=this.GoToHouseDetail.bind(this);

        this.onValueChange = value => {
            this.setState({bottomValue:value});
            console.log(value);
        };
    }
    static statusBar:{
        color:'#B0C4DE',
        barStyle: 'light-content',
        hidden:false
    };
    /**
     * 根据用户id跳转用户个人主页
     **/
    GoToUserDetail(from_uid) {
        this.props.navigation.navigate('UserPage',{
            itemId: from_uid});
    };
    /**
     * 根据house_id跳转房源详情
     **/
    GoToHouseDetail(house_id) {
        this.props.navigation.navigate('HouseDetail',{
            itemId: house_id,
            //isEdit:1 只能在管理房屋页面对房屋进行修改
        });
    };
    buttonItemAction(position){
        if(position === 1){
            //收藏
            toastShort('点击收藏...');
        }else if(position === 2){
            //分享
            toastShort('点击分享...');
            let data={
                type: 'text',
                text: '文字内容',
            };
            WeiboAPI.share(data).then(res=>{
                console.log('share success:',res)
            }).catch(err=>{
                console.log('share fail:',err)
            });
        }else if(position === 3){
            //地点
            toastShort('点击地点...');
        }else if(position === 4){
            //拨打电话
            toastShort('点击拨打电话...');
        }else if(position === 5 || position ===0){
            //点击评论
            this.props.navigation.navigate('CommentManager');
        }
    }
    //渲染微博认证信息
    renderWeibo(){

        let weibo_user=realm.objects('User').filtered('id==$0',
            this.props.navigation.getParam('itemId', 'NO-ID'))[0];
        if(weibo_user.sinaID){
            return(
                <TouchableOpacity onPress={()=>{
                    let profilelink='https://weibo.com/';
                    console.log( '个人主页链接'+profilelink);
                    let url = profilelink.toString()+weibo_user.sinaID;
                    Linking.openURL(url)
                }}>
                    <View style={{flexDirection:'row',marginTop:5,alignItems:'center'}}>
                        <Icon name="weibo" size={16} color="rgb(220,20,60)" light/>
                        <Text style={{color:'#708090',fontSize:13,marginLeft:5,backgroundColor:'rgba(1,1,1,0)'}}>已认证微博</Text>
                    </View>
                </TouchableOpacity>
            )
        }else {
            return(
                <View style={{flexDirection:'row',marginTop:5,alignItems:'center'}}>
                    <Icon name="weibo" size={16} color="rgb(220,20,60)" light/>
                    <Text style={{color:'#708090',fontSize:13,marginLeft:5,backgroundColor:'rgba(1,1,1,0)'}}>未进行微博认证</Text>
                </View>
            )
        }

    }
    //渲染房东基本信息布局
    renderStoreBasic(){
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');//从评论列表详情获取发布评论的用户的ID
        let comments=realm.objects('Comments').filtered('to_uid==$0',itemId);
        let user_publisher=realm.objects('User').filtered('id==$0',itemId)[0];//用发布人ID关联User表查询该用户的相关信息
        let commentNum=comments.length;//查找用户收到的评论数目require('../res/images/logo_dog.png')
        console.log('评论条数'+commentNum);
        return (
            <View style={{height: 160,alignItems: 'center',justifyContent: 'center',backgroundColor:'rgba(248,248,255,0.9)'}}>
                <ImageBackground source={require('../res/images/beed1.png')} style={{width:width,height:160}}>
                    <View style={{flexDirection:'row',marginLeft:24,height:68,alignItems:'center',marginTop:12}}>
                        <Image source={{uri:user_publisher.portrait}}
                               style={{width:68,height:68,borderRadius:34}}/>
                        <View style={{marginLeft:15}}>
                            <Text style={{color:'#708090',fontSize:16,marginTop:8,backgroundColor:'rgba(1,1,1,0)'}}>{user_publisher.nickName}</Text>
                            <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                                <Image source={require('../res/images/fire-fill.png')}
                                       style={{width:16,height:16}}/>
                                <Text style={{color:'#708090',fontSize:13,marginLeft:5,backgroundColor:'rgba(1,1,1,0)'}}>收到{commentNum}条评论</Text>
                            </View>
                            {/*<View style={{flexDirection:'row',marginTop:5,alignItems:'center'}}>
                                <Image source={require('../res/images/time-circle-fill.png')} style={{width:14,height:14}}/>
                                <Text style={{color:'#708090',fontSize:13,marginLeft:5,backgroundColor:'rgba(1,1,1,0)'}}>最快回复：6小时</Text>
                            </View>*/}
                            {this.renderWeibo()}
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
    //渲染中间部分功能界面布局
    renderCenterBar(){
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');//从评论列表详情获取发布评论的用户的ID
        const houseID=navigation.getParam('houseID','No-houseID');
        let user_publisher=realm.objects('User').filtered('id==$0',itemId)[0];
        let house_pulisher=realm.objects('House_Info').filtered('house_id==$0',houseID)[0];
        let comment=realm.objects('Comments').filtered('to_uid==$0',itemId).filtered('from_uid==$0',house_pulisher.publisher_id);
        return (
            <View style={{backgroundColor:'white'}}>
                <View style={{flexDirection:'row',height:45}}>
                    <View style={{flex:1}}>
                        <TouchableOpacity style={{justifyContent:'center',alignItems:'center',flex:1}}
                                          onPress={()=>{
                                              if(comment.length<1){
                                                  this.props.navigation.navigate('CommentApp',{
                                                      itemId: user_publisher.id,
                                                      houseID: houseID,
                                                      user_publisherId:user_publisher.id
                                                  })
                                              }else {
                                                  toastShort('你已进行评论')
                                              }
                                              }}>{/*onPress={()=>{this.buttonItemAction(0)}}*/}
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
        const itemId = navigation.getParam('itemId', 'NO-ID');//从评论列表详情获取发布评论的用户的ID
        let comments=realm.objects('Comments').filtered('to_uid==$0',itemId);
        console.log('renderBottomComment!!!!'+JSON.stringify(this.state.dataSource)+JSON.stringify(comments));
        return (
            <View style={{flex:1}}>
                {this.renderContent(this.state.dataSource.cloneWithRows(
                    comments === undefined ? [] : comments))}
            </View>
        );
    }

    //渲染底部房源信息模块
    renderHouse(){
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');//从上级页面（评论列表或房源详情页面）中获取用户的ID
        let ishisHouseData=realm.objects('House_Info').filtered("publisher_id==$0", itemId)
            .sorted("publish_time", true);
        return (
            <ScrollView>
                <View style={{flex:1}}>
                    <View style = {styles.MainContainer }>
                        <ListView
                            enableEmptySections = {true}
                            dataSource={ds.cloneWithRows(ishisHouseData)}
                            /*renderSeparator={this.ListViewItemSeparator}*/
                            renderRow={(rowData) =>
                                <View style={{flex:1, flexDirection: 'column',borderWidth: 1 ,borderColor:'#f1f1f1',}}>
                                    <TouchableOpacity onPress={
                                        this.GoToHouseDetail.bind(this,rowData.house_id)}>
                                        <View style={{backgroundColor: '#FFF'}}>
                                            <View style={{padding: 10, flexDirection: 'row'}}>
                                                <Image style={styles.thumb} source={rowData.house_pic?
                                                    {uri:rowData.house_pic}:require('../res/images/detailbg.jpg')}/>
                                                <View style={{flex: 2, paddingLeft: 10}}>
                                                    <Text style={{fontSize: 16}}>{rowData.area_name}</Text>
                                                    <Text style={{marginTop: 8, marginBottom: 8}}>{rowData.lease_type}</Text>
                                                    <Text style={{color: '#999'}}>{rowData.house_floor}</Text>
                                                </View>

                                                <View style={{flex: 1, paddingLeft: 10}}>
                                                    <Text style={{color: '#999', textAlign: 'right'}}>{rowData.publish_time}</Text>
                                                    <Text style={{marginTop: 8, color: 'red', textAlign: 'right'}}>{rowData.rent_fee}</Text>
                                                </View>
                                            </View>

                                            <View style={{padding: 10, flexDirection: 'row'}}>
                                                <Text style={styles.houseTag}>{rowData.house_decorate}</Text>
                                                <Text style={styles.houseTag}>{rowData.total_area}</Text>
                                                <Text style={styles.houseTag}>{rowData.toward_direct}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                            renderHeader={this.renderHeaderContent}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }

    //渲染底部模块
    renderBottom(){
        if(this.state.bottomValue==='发布的房源'){
            return(
                <View style={{ flex: 1 }}>
                    <ScrollView>{this.renderHouse()}</ScrollView>
                </View>)
        }else {
            return (
                <View style={{ flex: 1 }}>
                    <ScrollView>{this.renderBottomComment()}</ScrollView>
                </View>);
        }
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
                            <TouchableOpacity onPress={this.GoToUserDetail.bind(this,rowData.from_uid)}>
                                <Image source={{uri:rowData.from_portrait}} style={{width:35,height:35}}/>
                            </TouchableOpacity>
                            <View style={{flex:1,marginLeft:8}}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.comment_username}>{rowData.from_nickName}</Text>
                                    <TouchableOpacity onPress={
                                        this.GoToHouseDetail.bind(this,rowData.to_hid)}>
                                        <Text style={styles.link_housetext}>{rowData.h_tile}►</Text>
                                    </TouchableOpacity>
                                </View>
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

    //渲染ListView的Header布局
    renderHeaderContent(){
        const { navigation } = this.props;
        //从上级页面（评论列表或房源详情页面）中获取用户的ID
        const itemId = navigation.getParam('itemId', 'NO-ID');
        //用发布人ID关联User表查询该用户的相关信息
        let user_publisher=realm.objects('User').filtered('id==$0',itemId)[0];
        return (
            <View>
                {this.renderStoreBasic()}
                {this.renderCenterBar()}
                <View style={{height:32,alignItems:'center',flexDirection:'row',backgroundColor:'#f5f5f5'}}>
                    <Text style={{marginLeft:10}}>平台信息</Text>
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
                <SegmentedControl
                    values={['收到的评论', '发布的房源']}
                    //onChange={this.onChange}
                    onValueChange={this.onValueChange}
                />
            </View>
        );
    }
    renderBackHeader(){
        const { navigation } = this.props;
        //从上级页面（评论列表或房源详情页面）中获取用户的ID
        const itemId = navigation.getParam('itemId', 'NO-ID');
        //用发布人ID关联User表查询该用户的相关信息
        let user_applier=realm.objects('User').filtered('id==$0',itemId)[0];
        const appliersym = navigation.getParam('appliersym', 'NO-SYM');
        if(appliersym===1){
            return(
                <View style={{height:48,backgroundColor:'#B0C4DE',flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity onPress={() => {this.props.navigation.goBack();}}
                                      style={{width:48,height:48,alignItems:'center',justifyContent:'center'}}>
                        <Image
                            style={{width:13,height:20}}
                            source={require('../res/images/ic_center_back.png')}
                        />
                    </TouchableOpacity>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:18,color:'white',alignSelf:'center'}}>个人主页</Text>
                    </View>
                    <TouchableOpacity ref='edit' onPress={() => this.show(this.refs['edit'],'end')}
                                      style={{width:48,height:48,alignItems:'center',justifyContent:'center'}}>
                        <Icon name="hand-holding-usd" size={20} color="rgb(248,248,255)" light/>
                    </TouchableOpacity>
                </View>
            )
        }else{
            return(
                    <BackHeader navigation={this.props.navigation} title={'个人主页'}/>
                )
        }
    }
    show(view,align) {
        const { navigation } = this.props;
        //从上级页面（评论列表或房源详情页面）中获取用户的ID
        const tradeID=navigation.getParam('tradeID','No-Id');
        const isRenting=navigation.getParam('isRenting','No-status');
        const itemId = navigation.getParam('itemId', 'NO-ID');
        let house_rented=realm.objects('Rent_Relate').filtered('relate_id==$0', tradeID)[0];
        //用发布人ID关联User表查询该用户的相关信息
        let user_applier=realm.objects('User').filtered('id==$0',itemId)[0];
        const houseID=navigation.getParam('houseID','No-houseID');
        let user_publisher=realm.objects('User').filtered('id==$0',itemId)[0];
        let house_pulisher=realm.objects('House_Info').filtered('house_id==$0',houseID)[0];
        let comment=realm.objects('Comments').filtered('to_uid==$0',itemId).filtered('from_uid==$0',house_pulisher.publisher_id);
        view.measure((x, y, width, height, pageX, pageY) => {
            let items = [
                isRenting==='2'?
                    {title: '同意交易', icon: require('../res/images/ic_selected.png'), onPress: () => {
                            /*if(this.state.newPwd2){}*/
                            realm.write(() => {
                                realm.create('Rent_Relate', {relate_id: tradeID, isRenting: '1'}, true);
                                toastShort('已同意交易')
                            });

                    }}:
                    isRenting==='1'?
                    {title: '交易完成', icon: require('../res/images/ic_finish.png'), onPress: () => {
                            realm.write(() => {
                                realm.create('Rent_Relate', {relate_id: tradeID, isRenting: '0',isFinish:'1'}, true);
                            });
                            realm.write(() => {
                                realm.create('Rent_Relate', {relate_id: tradeID, isRenting: '0',isFinish:'1'}, true);
                            });
                            realm.write(() => {
                                realm.create('House_Info',{house_id:house_rented.rented_id,certification:null},true);//重新放出房源
                            });
                            toastShort('交易已完成');
                        }}:
                        {title: '评价房客', icon: require('../res/images/ic_finish.png'), onPress: () => {
                                if(comment.length<1){
                                    this.props.navigation.navigate('CommentApp',{
                                        itemId: user_publisher.id,
                                        houseID: houseID,
                                        user_publisherId:user_publisher.id
                                    })
                                }else {
                                    toastShort('你已进行评论')
                                }
                            }},
                {title: '清除交易', icon: require('../res/images/ic_del.png'), onPress: () =>{this.delete_Trade()}},
            ];
            Menu.show({x: pageX, y: pageY, width, height}, items,{align});
        });
    }

    delete_Trade(){
        const { navigation } = this.props;
        const houseID=navigation.getParam('houseID','No-Id');
        //从上级页面（评论列表或房源详情页面）中获取用户的ID
        const itemId = navigation.getParam('itemId', 'NO-ID');
        //用发布人ID关联User表查询该用户的相关信息
        let user_applier=realm.objects('User').filtered('id==$0',itemId)[0];
        Alert.alert(
            '提示',
            '确定清除交易？',
            [
                {text:'取消',onPress:(()=>{}),style:'cancel'},
                {text:'确定',onPress: (()=>{
                        realm.write(() => {
                            let withrent = realm.objects('Rent_Relate').filtered('roomer_id==$0', user_applier.id)
                                .filtered('isRenting == $0', '2').filtered('rented_id==$0', houseID);
                            realm.delete(withrent);
                            toastShort('已拒绝交易');
                        });
                        this.props.navigation.navigate('HouseManager');
                    })}]
        );
    }
    render() {

        return (
            <View style={{backgroundColor:'#f5f5f5',flex:1}}>
                {this.renderBackHeader()}
                {this.renderBottom()}
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
    MainContainer :{
        flex:1,
        //justifyContent: 'center',
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
        margin: 0,
        backgroundColor: '#F5FCFF'
    },
    thumb: {
        width: 80,
        height: 80,
    },
    houseTag: {
        color: '#999',
        fontSize: 12,
        marginLeft: 5,
        marginRight: 5,
        height: 20,
        paddingTop: 3,
        paddingLeft: 5,
        paddingRight: 5,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: '#E8E8E8'
    },
    link_housetext:{
        color:'black',
        fontStyle:'italic',
        fontSize:12,
        marginLeft:30
    }
});
export default UserPage;