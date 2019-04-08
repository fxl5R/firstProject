
import React, {Component} from 'react';

import {
    TouchableOpacity,
    Image,
    Text,
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    Platform,
    ImageBackground, Alert
} from 'react-native';
import BackHeader from "./BackHeader";
import realm from "../util/realm";
import ExpandableText from 'rn-expandable-text';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Menu} from 'teaset';
import {toastShort} from "../util/ToastUtil";
import * as WeiboAPI from "rn-weibo";
import {NavigationPage, ListRow, ActionSheet, Label} from 'teaset';
const winWidth=Dimensions.get('window').width;
const winHeight=Dimensions.get('window').height;

export default class HouseDetail extends Component<Props> {

    constructor(props){
        super(props);
        this.state={

        }
    }

    GoToGallery(house_id) {
        this.props.navigation.navigate('ImageBrowers',{
            itemId: house_id});
    };
    //渲染房屋图片和简介
    renderHousePic(){
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        let houses=realm.objects('House_Info').filtered('house_id==$0',itemId);//取出从HouseCell传递的对应id的房屋信息
        let house=houses[0];
        return(
            <View style={{alignItems: 'center'}}>
                <ImageBackground source={house.house_pic?{uri:house.house_pic}
                                        :require('../res/images/detailbg.jpg')}
                                 style={{width:winWidth,height:winHeight/3}}>
                    <View style={{alignItems:'flex-end',marginRight:10,flexDirection:'row'}}>
                        <Image source={require('../res/images/store/merchants/ic_merchants_location.png')}
                               style={{width:16,height:20}}/>
                        <Text style={{color:'white',fontSize:13,backgroundColor:'rgba(1,1,1,0)'}}>
                            {house.house_location}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={styles.cardcontainer}>
                    <View style={styles.leftContainer}>
                        <View style={styles.briefInfoContainer}>
                            <Text style={{marginVertical: 5,fontSize:18,color:'black'}}>
                                {house.area_name}{house.lease_type}
                            </Text>
                            <View style={styles.timeInfo}>
                                <Text numberOfLines={2} style={styles.putoutTime}>{house.publish_time}发布</Text>
                            </View>
                        </View>
                        <Text numberOfLines={2} style={styles.doorText}>{house.door_model}</Text>
                        <Text style={styles.feeText}>{house.rent_fee}</Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <TouchableOpacity onPress={this.GoToGallery.bind(this,house.house_id)}>
                            <Image style={styles.enterImage} source={require('../res/images/still_default1.png')} />
                            <View style={{justifyContent:'flex-end'}}>
                                <Text style={{color: '#5CACEE',fontSize: 12}}>更多图片</Text>
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.areaText}>{house.total_area}</Text>
                    </View>
                </View>
                <Text style={{color:'black',fontSize:13,backgroundColor:'rgba(1,1,1,0)'}}>地址：{house.house_location}{house.area_name}</Text>
            </View>
        );
    }
    //渲染房主卡片布局
    renderOwner(){
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        console.log('itemId'+itemId);
        let houses=realm.objects('House_Info').filtered('house_id==$0',itemId);//取出从HouseCell传递的对应id的房屋信息
        let house=houses[0];
        let publisherID=house.publisher_id;
        let user_publisher=realm.objects('User').filtered('id==$0',publisherID)[0];//使用发布人ID关联User表取出发布房屋的用户的信息
        let userPortrait=user_publisher.portrait;
        let isRealPeople=user_publisher.isRealPeople;
        return(
            <View style={{margin: 28}}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {
                    this.props.navigation.navigate('LandLordPage',{
                        itemId: publisherID});
                }}>
                    <View>
                    <View style={styles.container}>
                        <Image source={{uri:userPortrait}} style={styles.MidImage}/>
                        <Text style={{fontSize:17}}>{house.house_publisher}</Text>
                        <Text style={{fontSize:13,color:'#708090'}}>联系电话：{house.owner_tel?house.owner_tel:'暂未填写'}</Text>
                        <Text style={{fontSize:12,color:'#708090'}}>{isRealPeople===1?'已实名认证':''}</Text>
                    </View>
                        {/*<View style={{justifyContent:'flex-end'}}>
                        <Image source={require('../res/images/ic_center_right_arrow.png')} style={styles.rightImage}/>
                        </View>*/}
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    //渲染配套设施项目
    rendershower(){
        let house=realm.objects('House_Info')
            .filtered('house_id==$0',this.props.navigation.getParam('itemId', 'NO-ID'))
            .filtered('support_set CONTAINS[c] "热水淋浴"');
        if(house.length>0){return(
            <View style={styles.brick}>
                <Image style={styles.brickIcon} source={require('../res/setting/sd_shower.png')}/>
                <Text style={styles.brickText}>热水淋浴</Text>
            </View>
        )}
    }
    renderwasher(){
        let house=realm.objects('House_Info')
            .filtered('house_id==$0',this.props.navigation.getParam('itemId', 'NO-ID'))
            .filtered('support_set CONTAINS[c] "洗衣机"');
        if(house.length>0){return(
                <View style={styles.brick}>
                    <Image style={styles.brickIcon} source={require('../res/setting/sd_washer.png')}/>
                    <Text style={styles.brickText}>洗衣机</Text>
                </View>
            )}
    }
    renderbathtub(){
        let house=realm.objects('House_Info')
            .filtered('house_id==$0',this.props.navigation.getParam('itemId', 'NO-ID'))
            .filtered('support_set CONTAINS[c] "浴缸"');
        if(house.length>0){return(
            <View style={styles.brick}>
                <Image style={styles.brickIcon} source={require('../res/setting/sd_bathtub.png')}/>
                <Text style={styles.brickText}>浴缸</Text>
            </View>
        )}
    }
    renderlinewifi(){
        let house=realm.objects('House_Info')
            .filtered('house_id==$0',this.props.navigation.getParam('itemId', 'NO-ID'))
            .filtered('support_set CONTAINS[c] "有线网络"');
        if(house.length>0){return(
            <View style={styles.brick}>
                <Image style={styles.brickIcon} source={require('../res/setting/sd_linewifi.png')}/>
                <Text style={styles.brickText}>有线网络</Text>
            </View>
        )}
    }
    renderTV(){
        let house=realm.objects('House_Info')
            .filtered('house_id==$0',this.props.navigation.getParam('itemId', 'NO-ID'))
            .filtered('support_set CONTAINS[c] "电视"');
        if(house.length>0){return(
            <View style={styles.brick}>
                <Image style={styles.brickIcon} source={require('../res/setting/sd_TV.png')}/>
                <Text style={styles.brickText}>电视</Text>
            </View>
        )}
    }
    renderWiFi(){
        let house=realm.objects('House_Info')
            .filtered('house_id==$0',this.props.navigation.getParam('itemId', 'NO-ID'))
            .filtered('support_set CONTAINS[c] "无线网络"');
        if(house.length>0){return(
            <View style={styles.brick}>
                <Image style={styles.brickIcon} source={require('../res/setting/sd_wifi.png')}/>
                <Text style={styles.brickText}>无线网络</Text>
            </View>
        )}
    }
    renderfreezer(){
        let house=realm.objects('House_Info')
            .filtered('house_id==$0',this.props.navigation.getParam('itemId', 'NO-ID'))
            .filtered('support_set CONTAINS[c] "冰箱"');
        if(house.length>0){return(
            <View style={styles.brick}>
                <Image style={styles.brickIcon} source={require('../res/setting/sd_freezer.png')}/>
                <Text style={styles.brickText}>冰箱</Text>
            </View>
        )}
    }
    renderair(){
        let house=realm.objects('House_Info')
            .filtered('house_id==$0',this.props.navigation.getParam('itemId', 'NO-ID'))
            .filtered('support_set CONTAINS[c] "空调"');
        if(house.length>0){return(
            <View style={styles.brick}>
                <Image style={styles.brickIcon} source={require('../res/setting/sd_aircon.png')}/>
                <Text style={styles.brickText}>空调</Text>
            </View>
        )}
    }
    renderWarm(){
        let house=realm.objects('House_Info')
            .filtered('house_id==$0',this.props.navigation.getParam('itemId', 'NO-ID'))
            .filtered('support_set CONTAINS[c] "暖气"');
        if(house.length>0){return(
            <View style={styles.brick}>
                <Image style={styles.brickIcon} source={require('../res/setting/sd_warm.png')}/>
                <Text style={styles.brickText}>暖气</Text>
            </View>
        )}
    }
    renderSafe(){
        let house=realm.objects('House_Info')
            .filtered('house_id==$0',this.props.navigation.getParam('itemId', 'NO-ID'))
            .filtered('support_set CONTAINS[c] "门禁系统"');
        if(house.length>0){return(
            <View style={styles.brick}>
                <Image style={styles.brickIcon} source={require('../res/setting/sd_safed.png')}/>
                <Text style={styles.brickText}>门禁系统</Text>
            </View>
        )}
    }
    renderLift(){
        let house=realm.objects('House_Info')
            .filtered('house_id==$0',this.props.navigation.getParam('itemId', 'NO-ID'))
            .filtered('support_set CONTAINS[c] "电梯"');
        if(house.length>0){return(
            <View style={styles.brick}>
                <Image style={styles.brickIcon} source={require('../res/setting/sd_lift.png')}/>
                <Text style={styles.brickText}>电梯</Text>
            </View>
        )}
    }
    renderPark(){
        let house=realm.objects('House_Info')
            .filtered('house_id==$0',this.props.navigation.getParam('itemId', 'NO-ID'))
            .filtered('support_set CONTAINS[c] "停车位"');
        if(house.length>0){return(
            <View style={styles.brick}>
                <Image style={styles.brickIcon} source={require('../res/setting/sd_park.png')}/>
                <Text style={styles.brickText}>停车位</Text>
            </View>
        )}
    }
    renderWater(){
        let house=realm.objects('House_Info')
            .filtered('house_id==$0',this.props.navigation.getParam('itemId', 'NO-ID'))
            .filtered('support_set CONTAINS[c] "饮水设备"');
        if(house.length>0){return(
            <View style={styles.brick}>
                <Image style={styles.brickIcon} source={require('../res/setting/sd_waterww.png')}/>
                <Text style={styles.brickText}>饮水设备</Text>
            </View>
        )}
    }
    //渲染配套设施
    renderSettings(){
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        console.log('itemId'+itemId);
        let houses=realm.objects('House_Info').filtered('house_id==$0',itemId);//取出从HouseCell传递的对应id的房屋信息
        let house=houses[0];
        return(
            <View style={{backgroundColor:'white',height:180,marginEnd:20}}>
                <View style={{flexDirection:'row', flexWrap: 'wrap'}}>
                    {this.rendershower()}
                    {this.renderwasher()}
                    {this.renderbathtub()}
                    {this.renderlinewifi()}
                    {this.renderTV()}
                    {this.renderWiFi()}
                    {this.renderfreezer()}
                    {this.renderair()}
                    {this.renderWarm()}
                    {this.renderSafe()}
                    {this.renderLift()}
                    {this.renderPark()}
                    {this.renderWater()}
                </View>
            </View>
        )
    }
    //基本信息
    renderBaseInfo(){
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        let houses=realm.objects('House_Info').filtered('house_id==$0',itemId);//取出从HouseCell传递的对应id的房屋信息
        let house=houses[0];
            return(
                <ScrollView style={{marginTop:10}}>
            <View>
                <View style={{height:35,justifyContent:'center'}}>
                    <Text style={{color:'#777',marginLeft:8}}>房屋信息</Text>
                </View>
                <Image source={require('../res/images/ic_center_line.png')}/>
                <View style={[styles.detailContainer,{height:80}]}>
                    <View style={{flex:2}}>
                        <Text style={styles.itemForm1}>朝向</Text>
                        <Text style={styles.itemForm1}>面积</Text>
                    </View>
                    <View style={{flex:3}}>
                        <Text style={styles.itemForm2}>{house.toward_direct}</Text>
                        <Text style={styles.itemForm2}>{house.total_area}</Text>
                    </View>

                    <View style={{flex:2}}>
                        <Text style={styles.itemForm3}>楼层</Text>
                        <Text style={styles.itemForm3}>装修</Text>
                    </View>
                    <View style={{flex:2}}>
                        <Text style={styles.itemForm2}>{house.house_floor}</Text>
                        <Text style={styles.itemForm2}>{house.house_decorate}</Text>
                    </View>
                </View>

                    <View style={{flexDirection:'row',height:35,backgroundColor:'white'}}>
                        <Text style={[styles.itemForm1,{flex:1.5,marginBottom:8}]}>户型</Text>
                        <Text style={[styles.itemForm2,{flex:5.7,marginBottom:8}]}>{house.door_model}</Text>
                    </View>

                <Image style={{padding:4}} source={require('../res/images/ic_center_line.png')}/>
                <View style={{height:35,justifyContent:'center'}}>
                    <Text style={{color:'#777',marginLeft:8}}>出租需求</Text>
                </View>
                <Image source={require('../res/images/ic_center_line.png')}/>
                <View style={[styles.detailContainer,{height:75}]}>
                    <View style={{flex:2}}>
                        <Text style={styles.itemForm1}>租金</Text>
                        <Text style={[styles.itemForm1,{marginBottom:8}]}>交租周期</Text>
                    </View>
                    <View style={{flex:3}}>
                        <Text style={styles.itemForm2}>{house.rent_fee}</Text>
                        <Text style={[styles.itemForm2,{marginBottom:8}]}>{house.fee_period}</Text>
                    </View>
                    <View style={{flex:2}}>
                        <Text style={styles.itemForm3}>违约金</Text>
                        <Text style={[styles.itemForm3,{marginBottom:8}]}>最短租期</Text>
                    </View>
                    <View style={{flex:2}}>
                        <Text style={styles.itemForm2}>{house.default_fine}</Text>
                        <Text style={[styles.itemForm2,{marginBottom:8}]}>{house.rent_limit}</Text>
                    </View>
                </View>
                <Image style={{padding:4}} source={require('../res/images/ic_center_line.png')}/>
                <View style={{height:35,justifyContent:'center'}}>
                    <Text style={{color:'#777',marginLeft:8}}>房屋描述</Text>
                </View>
                <Image source={require('../res/images/ic_center_line.png')}/>
                <View style={{backgroundColor:'white',height:100,marginEnd:20}}>
                    <ExpandableText
                        numberOfLines={8}
                        style={styles.expandText}
                        unexpandView={()=>null}
                        expandView={()=>(<View style={styles.arrow}/>)}
                    >
                        {house.house_description}
                        ceshiceshiceshiceshiceshiceshiceshiceshice
                        shiceshiceshiceshiceshiceshiceshiceshiceshiceshices
                    </ExpandableText>
                </View>
                <Image style={{padding:4}} source={require('../res/images/ic_center_line.png')}/>
                <View style={{height:35,justifyContent:'center'}}>
                    <Text style={{color:'#777',marginLeft:8}}>配套设施</Text>
                </View>
                <Image source={require('../res/images/ic_center_line.png')}/>
                {this.renderSettings()}
                {/*<View style={{height:Platform.OS === 'ios' ? 0:45}}/>*/}
            </View>
                </ScrollView>
            );
    }

    //标题栏
    renderHeader(){


        const { navigation } = this.props;
        const isEdit = navigation.getParam('isEdit', 'NO-Edit');
        const itemId = navigation.getParam('itemId', 'NO-ID');
        console.log('itemId'+itemId);
        let houses=realm.objects('House_Info').filtered('house_id==$0',itemId);//取出从HouseCell传递的对应id的房屋信息
        let house=houses[0];
        let user=realm.objects('User').filtered("online == $0", 1);
        if(isEdit===1){
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
                        <Text style={{fontSize:18,color:'white',alignSelf:'center'}}>管理房屋</Text>
                    </View>
                    {/*<View style={{height:48,width:48}}/>*/}
                    <TouchableOpacity ref='edit' onPress={() => this.show(this.refs['edit'],'end')}
                                      style={{width:48,height:48,alignItems:'center',justifyContent:'center'}}>
                        <Icon name="edit" size={20} color="rgb(248,248,255)" light/>
                    </TouchableOpacity>
                </View>
            )
        }else {
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
                        <Text style={{fontSize:18,color:'white',alignSelf:'center'}}>房屋详情</Text>
                    </View>
                    {/*<View style={{height:48,width:48}}/>  // style={{width:48,height:48,alignItems:'center',justifyContent:'center'}} */}
                    <TouchableOpacity ref='edit'
                                      style={{width:48,height:48,alignItems:'center',justifyContent:'center'}}
                                      onPress={() => this.showaction(true)}>
                        <Icon name="ellipsis-v" size={20} color="rgb(248,248,255)" light/>
                    </TouchableOpacity>
                </View>
            )
        }
    }
    show(view,align) {
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        view.measure((x, y, width, height, pageX, pageY) => {
            let items = [
                {title: '修改', icon: require('../res/images/ic_edit.png'), onPress: () => {
                    this.props.navigation.navigate('EditHouse',{
                    itemId:itemId});}},
                {title: '删除', icon: require('../res/images/ic_del.png'), onPress: () =>{this.delete_House()}},
            ];
            Menu.show({x: pageX, y: pageY, width, height}, items,{align});
        });
    }

    delete_House(){
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        Alert.alert(
            '提示',
            '确定移除此房屋？',
            [
                {text:'取消',onPress:(()=>{}),style:'cancel'},
                {text:'确定',onPress: (()=>{
                        realm.write(() => {
                            let thehouse = realm.objects('House_Info').filtered('house_id==$0',itemId)[0];
                            realm.delete(thehouse);
                            toastShort('删除成功');
                        });
                        this.props.navigation.navigate('HouseManager');
                })}]
        );

    }

    showaction(modal) {
        let user=realm.objects('User').filtered("online == $0", 1)[0];//获取当前用户，存储collector_id
        const itemId = this.props.navigation.getParam('itemId', 'NO-ID');//获取HouseCell中的house_id作为collect_id
        let thehouse = realm.objects('House_Info').filtered('house_id==$0',itemId)[0];
        //分享图文信息到新浪
        let items = [
            {title: '分享到微博',  onPress:()=>{
                        WeiboAPI.share({
                            type: 'image',
                            text: '发现了一家房屋在出租:'+'地址：'+thehouse.house_location+
                                '楼层：'+thehouse.house_floor
                                +'小区：'+thehouse.area_name+'月租：'+thehouse.rent_fee,
                            //imageUrl:'https://dwz.cn/lm7OADew',
                        })
                    }
                },
            {title: '收藏此房屋', onPress:()=>{
                let thiscollect=realm.objects('Collections').filtered('collector_id==$0',user.id);
                console.log('收藏后收藏者id：'+thiscollect.collector_id+'测试userid'+user.id);
                if(thiscollect.collect_id===itemId){
                    console.log('测试收藏者id1'+thiscollect.collector_id);
                    toastShort('你已成功收藏此房屋');
                }else{
                    realm.write(() => {
                        realm.create('Collections', {
                            id:realm.objects('Collections').length+1,
                            collect_id:itemId,
                            collector_id:user.id,
                            collect_time:new Date().toLocaleTimeString()
                        });
                        console.log('测试收藏者id22'+thiscollect.collector_id+itemId);
                        toastShort('收藏成功');
                    });}
                }},
            /*{title: 'Disabled', disabled: true},*/
        ];
        let cancelItem = {title: '取消'};
        ActionSheet.show(items, cancelItem, {modal});
    }

    render() {
/*        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        console.log('itemId'+itemId);
        let houses=realm.objects('House_Info').filtered('house_id==$0',itemId);//取出从HouseCell传递的对应id的房屋信息
        let house=houses[0];*/
        return (
            <View>
                {/*<BackHeader navigation={this.props.navigation} title={'房屋详情'}/>*/}
                {this.renderHeader()}
                <ScrollView>
                {this.renderHousePic()}
                {this.renderBaseInfo()}
                <Image style={{padding:4}}  source={require('../res/images/ic_center_line.png')}/>
                <View style={{height:35,justifyContent:'center'}}>
                    <Text style={{color:'#777',marginLeft:8}}>房东信息</Text>
                </View>
                <Image source={require('../res/images/ic_center_line.png')}/>
                {this.renderOwner()}
                    <View style={{height:Platform.OS === 'ios' ? 0:40}}/>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor:'#FFFFFF',
        //marginLeft: 15,
        //paddingVertical: 5,
        paddingRight: 15,
        alignItems: 'center',
        justifyContent:'center',
        //borderBottomWidth: 0.5,
        //borderBottomColor: '#D3D3D3'
    },
    MidImage: {
        height: 68,
        width: 68,
        borderRadius: 34,
        backgroundColor:  '#FFFFFF'
    },
    rightImage: {
        height: 15,
        width: 15,
        position: 'absolute',
        right: 15,
        marginBottom: 10
    },
    cardcontainer: {
        flexDirection: 'row',
        marginBottom: 10,
        marginHorizontal: 10,
        marginTop: -20,
        padding: 8,
        borderWidth: 1,
        borderColor: '#DADADA',
        backgroundColor: 'white',
        //elevation: 1
    },
    leftContainer: {
        justifyContent: 'space-between',
        flex: 1
    },
    rightContainer: {
        //justifyContent: 'space-between',
        alignItems: 'flex-end',
        justifyContent:'flex-end'
    },
    briefInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeInfo: {
        flex: 1,
        marginLeft: 10
    },
    putoutTime: {
        color: '#5CACEE',
        fontSize: 12
    },
    doorText: {
        color:'#79767C',
        marginTop: 5,
        fontSize: 14
    },
    avatarImage: {
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    areaText: {
        color: 'orange',
        marginTop: 5,
        fontSize: 16
    },
    enterImage: {
        height: 38,
        width: 38,
    },
    feeText: {
        color: 'orange',
        fontSize: 16,
        marginTop: 5
    },
    detailContainer:{
        flexDirection:'row',
        backgroundColor:'white',
        alignItems:'center',
        //justifyContent:'space-around'
    },
    itemForm1:{
        fontSize:14,
        marginLeft:10,
        marginTop:10
    },
    itemForm2:{
        fontSize:14,
        color:'black',
        marginTop:10
    },
    itemForm3:{
        fontSize:14,
        marginTop:10
    },
    brick:{
        flexDirection:'column',
        height:50,
        width:50,
        margin:5,
        justifyContent:'center',
        alignItems:'center'
    },
    brickText:{
        fontSize:12,
        color:'grey',
    },
    brickIcon:{
        height:32,
        width:32
    }

});
