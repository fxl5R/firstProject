
import React, {Component} from 'react';

import {
    Navigator,
    TouchableOpacity,
    Image,
    Text,
    View,
    StyleSheet,
    ImageBackground,
    ScrollView,
    Dimensions
} from 'react-native';
import BackHeader from "./BackHeader";
import realm from "../util/realm";
import ExpandableText from 'rn-expandable-text';

let {height, width} = Dimensions.get('window');
export default class HouseDetail extends Component<Props> {
    //渲染房屋图片
    renderHousePic(){
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        console.log('itemId'+itemId);
        let houses=realm.objects('House_Info').filtered('house_id==$0',itemId);//取出从HouseCell传递的对应id的房屋信息
        let house=houses[0];
        return(
            <View style={{height: 240,alignItems: 'center', justifyContent: 'center' }}>
                <ImageBackground source={require('../res/images/detailbg.jpg')} style={{width:width,height:240}}>
                     <View style={{alignItems:'flex-end',marginRight:10,flexDirection:'row'}}>
                         <Image source={require('../res/images/store/merchants/ic_merchants_location.png')}
                                style={{width:16,height:20}}/>
                         <Text style={{color:'white',fontSize:13,backgroundColor:'rgba(1,1,1,0)'}}>{house.house_location}</Text>
                     </View>
                </ImageBackground>
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
                <ScrollView>
            <View>
                <View style={{height:35,justifyContent:'center'}}>
                    <Text style={{color:'#777',marginLeft:8}}>房屋信息</Text>
                </View>
                <Image source={require('../res/images/ic_center_line.png')}/>
                <View style={{flexDirection:'row',backgroundColor:'white',height:35,alignItems:'center'}}>
                    <Text style={{marginLeft:10}}>户型</Text>
                    <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                        <Text style={{fontSize:14}}>面积</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',backgroundColor:'white',height:35,alignItems:'center'}}>
                    <Text style={{marginLeft:10}}>楼层</Text>
                    <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                        <Text style={{fontSize:14}}>装修</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',backgroundColor:'white',height:35,alignItems:'center'}}>
                    <Text style={{marginLeft:10}}>朝向</Text>
                    <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                        <Text style={{fontSize:14}}>环境</Text>
                    </View>
                </View>
                <Image style={{padding:10}} source={require('../res/images/ic_center_line.png')}/>
                <View style={{height:35,justifyContent:'center'}}>
                    <Text style={{color:'#777',marginLeft:8}}>出租需求</Text>
                </View>
                <Image source={require('../res/images/ic_center_line.png')}/>
                <View style={{flexDirection:'row',backgroundColor:'white',height:35,alignItems:'center'}}>
                    <Text style={{marginLeft:10}}>租金</Text>
                    <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                        <Text style={{fontSize:14}}>违约金</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',backgroundColor:'white',height:35,alignItems:'center'}}>
                    <Text style={{marginLeft:10}}>交租周期</Text>
                    <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                        <Text style={{fontSize:14}}>最短租期</Text>
                    </View>
                </View>
                <Image style={{padding:10}} source={require('../res/images/ic_center_line.png')}/>
                <View style={{height:35,justifyContent:'center'}}>
                    <Text style={{color:'#777',marginLeft:8}}>房屋描述</Text>
                </View>
                <Image source={require('../res/images/ic_center_line.png')}/>
                <View style={{backgroundColor:'white',height:35,marginEnd:20}}>
                    <ExpandableText
                        numberOfLines={5}
                        style={styles.expandText}
                        unexpandView={()=>null}
                        expandView={()=>(
                            <View style={styles.arrow}/>
                            )}>
                        {house.house_description}
                    </ExpandableText>
                </View>
                <Image style={{padding:10}} source={require('../res/images/ic_center_line.png')}/>
                <View style={{height:35,justifyContent:'center'}}>
                    <Text style={{color:'#777',marginLeft:8}}>房屋描述</Text>
                </View>
                <Image source={require('../res/images/ic_center_line.png')}/>
                <View style={{backgroundColor:'white',height:35,marginEnd:20}}>
                    <ExpandableText
                        numberOfLines={5}
                        style={styles.expandText}
                        unexpandView={()=>null}
                        expandView={()=>(
                            <View style={styles.arrow}/>
                        )}>
                        {house.house_description}
                    </ExpandableText>
                </View>
            </View>
                </ScrollView>
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
                    <TouchableOpacity activeOpacity={0.5} onPress={() => {this.props.navigation.navigate('LandLordPage')}}>
                        <View style={[styles.container]}>
                            <Image source={require('../res/images/logo_dog.png')} style={styles.MidImage}/>
                                <Text style={{fontSize:17}}>姓名123</Text>
                                <Text style={{fontSize:12,color:'#708090'}}>实名认证</Text>
                        </View>
                        {/*<View style={{alignItems:'flex-end'}}>
                            <Image source={require('../res/images/ic_center_right_arrow.png')} style={styles.rightImage}/>
                        </View>*/}
                    </TouchableOpacity>

                </View>
            );
        }
    //房源描述

    //配套设施

    render() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        console.log('itemId'+itemId);
        let {height, width} = Dimensions.get('window');
        let houses=realm.objects('House_Info').filtered('house_id==$0',itemId);//取出从HouseCell传递的对应id的房屋信息
        let house=houses[0];
        return (
            <View>
                <BackHeader navigation={this.props.navigation} title={'房屋详情'}/>
                <ScrollView>
                {this.renderHousePic()}
                <View style={{height:35,justifyContent:'center'}}>
                    <Text style={{color:'#777',marginLeft:8}}>房东信息</Text>
                </View>
                <Image source={require('../res/images/ic_center_line.png')}/>
                {this.renderOwner()}
                <Image style={{padding:10}}  source={require('../res/images/ic_center_line.png')}/>
                    {this.renderBaseInfo()}
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

});
