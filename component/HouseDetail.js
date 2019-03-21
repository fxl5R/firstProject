
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
    ImageBackground
} from 'react-native';
import BackHeader from "./BackHeader";
import realm from "../util/realm";
import ExpandableText from 'rn-expandable-text';
//import MyCarousel from "./MyCarousel";

const winWidth=Dimensions.get('window').width;
const winHeight=Dimensions.get('window').height;
export default class HouseDetail extends Component<Props> {
    GoToGallery(house_id) {
        this.props.navigation.navigate('ImageBrowers',{
            itemId: house_id});
    };
    //渲染房屋图片和简介
    renderHousePic(){
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        console.log('itemId'+itemId);
        let houses=realm.objects('House_Info').filtered('house_id==$0',itemId);//取出从HouseCell传递的对应id的房屋信息
        let house=houses[0];
        return(
            <View style={{alignItems: 'center'}}>
                {/*<View style={{width:winWidth,height:winHeight/3}}><MyCarousel /></View>*/}
                <ImageBackground source={house.house_pic?{uri:house.house_pic}:require('../res/images/detailbg.jpg')}
                                 style={{width:winWidth,height:winHeight/3}}>
                    <View style={{alignItems:'flex-end',marginRight:10,flexDirection:'row'}}>
                        <Image source={require('../res/images/store/merchants/ic_merchants_location.png')}
                               style={{width:16,height:20}}/>
                        <Text style={{color:'white',fontSize:13,backgroundColor:'rgba(1,1,1,0)'}}>{house.house_location}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.cardcontainer}>
                    <View style={styles.leftContainer}>
                        <View style={styles.briefInfoContainer}>
                            {/*<TouchableOpacity style={{marginVertical: 5}} onPress={() => {this.props.navigation.navigate('LandLordPage')}}>
                                <Image style={styles.avatarImage} source={require('../res/images/bathroom.jpeg')}/>source={{uri: musicDetailData.author.web_url} height: 240,
                            </TouchableOpacity>
                            resizeMode="contain"*/}
                            <Text style={{marginVertical: 5,fontSize:18,color:'black'}}>{house.area_name}{house.lease_type}</Text>
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
        return(
            <View style={{margin: 20}}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {
                    this.props.navigation.navigate('LandLordPage')
                }}>
                    <View>
                    <View style={styles.container}>
                        <Image source={require('../res/images/logo_dog.png')} style={styles.MidImage}/>
                        <Text style={{fontSize:17}}>{house.house_publisher}</Text>
                        <Text style={{fontSize:12,color:'#708090'}}>{house.certification===1?'已认证':''}</Text>
                    </View>
                        {/*<View style={{justifyContent:'flex-end'}}>
                        <Image source={require('../res/images/ic_center_right_arrow.png')} style={styles.rightImage}/>
                        </View>*/}
                    </View>
                </TouchableOpacity>


            </View>
        );
    }
    //基本信息
    renderBaseInfo(){
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        console.log('itemId'+itemId);
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
                <View style={{backgroundColor:'white',height:65,marginEnd:20}}>
                    <ExpandableText
                        numberOfLines={10}
                        style={styles.expandText}
                        unexpandView={()=>null}
                        expandView={()=>(<View style={styles.arrow}/>)}>
                        {house.house_description}{house.house_description}{house.house_description}{house.house_description}
                        {house.house_description}{house.house_description}{house.house_description}{house.house_description}
                        ceshiceshiceshiceshiceshiceshiceshiceshiceshiceshiceshiceshiceshiceshiceshiceshiceshiceshiceshiceshi
                        ceshiceshiceshiceshiceshiceshiceshiceshiceshiceshiceshiceshiceshiceshiceshiceshiceshiceshiceshiceshi
                    </ExpandableText>
                </View>
                <View style={{height:Platform.OS === 'ios' ? 0:30,}}/>
            </View>
                </ScrollView>
            );
    }

    //配套设施

    render() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        console.log('itemId'+itemId);
        let houses=realm.objects('House_Info').filtered('house_id==$0',itemId);//取出从HouseCell传递的对应id的房屋信息
        let house=houses[0];
        return (
            <View>
                <BackHeader navigation={this.props.navigation} title={'房屋详情'}/>
                <ScrollView>
                {this.renderHousePic()}
                {this.renderBaseInfo()}
                <Image style={{padding:4}}  source={require('../res/images/ic_center_line.png')}/>
                <View style={{height:35,justifyContent:'center'}}>
                    <Text style={{color:'#777',marginLeft:8}}>房东信息</Text>
                </View>
                <Image source={require('../res/images/ic_center_line.png')}/>
                {this.renderOwner()}
                    <View style={{height:Platform.OS === 'ios' ? 0:30,}}/>
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
        borderBottomWidth: 0.5,
        borderBottomColor: '#D3D3D3'
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
    }

});
