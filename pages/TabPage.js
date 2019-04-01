/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
    Dimensions,
    ScrollView,
    Platform,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import TabNavigator from 'react-native-tab-navigator';
import HouseCell from '../component/HouseCell';
import MinePage from './MinePage';

import {MsgCard } from '../component/antComponent';
import MDropDown from '../component/ActionMenu/MDropDown';
import {SearchBar} from "@ant-design/react-native";
import { requestWithToken } from '../util/request';
import ActionButton from "react-native-action-button";
import {NormalHeader} from "../component/BackHeader";
import MyCarousel from "../component/MyCarousel";
import {Carousel} from 'teaset';
import CollectList from "../component/CollectList";

const {width,height}=Dimensions.get("window");

export default class TabPage extends Component<Props> {
    //构造函数
    constructor(props){
        super(props);
        this.state={
            selectedTab:'tb_home',
            refreshing: false,
            searchString:'',
            dataVersion: 0,
            //dataSource:ds.cloneWithRows(mydata),
            value1: '',
            typee:'',
            door:'',
            decorate:'',
            sort:''
        };
        this.onChange = value1 => { this.setState({ value1 });};
        //this.clear = () => { this.setState({ value1: '' }); };
        this._renderHeader = this._renderHeader.bind(this);
    }

    //TabPage父组件接收MDropDown子组件的参数，并改变state，
    // 用作传递给HouseCell中更新dataSource
    setValue1 = typee => {
        this.setState({typee});
    };
    setValue2 = door => {
        this.setState({door});
    };
    setValue3 = decorate => {
        this.setState({decorate});
    };
    setValue4 = sort => {
        this.setState({sort});
    };

    //设置第一栏（暂不用）
    _renderHeader = () => {
        return (
            <View>
                <View style={[styles.headerBody,{flexDirection:'row'}]}>
                    <TouchableHighlight style={styles.headerClick}
                                        onPress={()=>{this.props.navigation.navigate('ProtocolPage')}} >
                        <View>
                            <Icon name="city" size={40} color="#E6E6FA" light />
                            <Text style={styles.fontClick}>添加房屋</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.headerClick}
                                        onPress={()=>{this.props.navigation.navigate('MapLocation')}}>
                        <View>
                            <Icon name="map-marked-alt" size={40} color="#E6E6FA" light/>
                            <Text style={styles.fontClick}>地图找房</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
            )
    };
    //渲染添加房屋按钮
    _renderActionBtn=()=>{
        return(
            <View style={{flex:1}}>
                <ActionButton buttonColor='#B0C4DE'>
                    <ActionButton.Item buttonColor='#6495ED' title="添加房屋" onPress={()=>{this.props.navigation.navigate('ProtocolPage')}}>
                        <Icon name="paint-roller" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </View>
        )
    };
    //渲染走马灯
    _renderCarousel=()=> {
        return(
            <Carousel
                style={{height: 200}}
                control={
                    <Carousel.Control
                    style={{alignItems: 'flex-end'}}
                    dot={<Text style={{backgroundColor: 'rgba(0, 0, 0, 0)', color: 'rgb(248,248,255)', padding: 4}}>◇</Text>}
                    activeDot={<Text style={{backgroundColor: 'rgba(0, 0, 0, 0)', color: 'rgb(248,248,255)', padding: 4}}>◆</Text>}
                />}>
                <Image style={{width:width, height: 200}} resizeMode='cover' source={require('../res/images/dining.jpg')}/>
                <Image style={{width:width, height: 200}} resizeMode='cover' source={require('../res/images/room2.jpeg')} />
                <Image style={{width:width, height: 200}} resizeMode='cover' source={require('../res/images/room.jpeg')} />
            </Carousel>

        )
    };

    render() {

        const { errorMsg, username } = this.state;
        return (
            <View style={styles.container}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_home'}
                        selectedTitleStyle={{color:'#B0C4DE'}}
                        title="发现"
                        renderIcon={() => <Image style={styles.image} source={require('../res/images/ic_hindex.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#B0C4DE'}]} source={require('../res/images/ic_hindex.png')} />}
                        onPress={() => this.setState({ selectedTab: 'tb_home' })}>
                        <View style={{flex:1}}>
                        <View style={{flex:1}}>
                            <SearchBar
                                value={this.state.value1}
                                placeholder="输入小区名或地址"
                                //onSubmit={value1 => Alert.alert(value1)}
                                cancelText={'进入'}
                                onCancel={this.onChange}
                                onChange={this.onChange}
                            />
                            {this._renderCarousel()}

                            <MDropDown setValue1={this.setValue1} setValue2={this.setValue2} setValue3={this.setValue3} setValue4={this.setValue4}/>

                            <ScrollView >
                            <HouseCell
                                navigation={this.props.navigation}
                                value1={this.state.value1}
                                typee={this.state.typee==='不限'?'':this.state.typee}
                                door={this.state.door==='不限'?'':this.state.door}
                                decorate={this.state.decorate==='不限'?'':this.state.decorate}
                                sort={this.state.sort}
                            />
                                {/*<View style={{height:Platform.OS === 'ios' ? 0:200}}/>*/}
                            </ScrollView>
                        </View>
                            <ActionButton buttonColor='#B0C4DE'>
                                <ActionButton.Item buttonColor='#6495ED' title="添加房屋" onPress={()=>{this.props.navigation.navigate('ProtocolPage')}}>
                                    <Icon name="paint-roller" style={styles.actionButtonIcon} />
                                </ActionButton.Item>
                            </ActionButton>
                        </View>

                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_star'}
                        selectedTitleStyle={{color:'#B0C4DE'}}
                        title="收藏"
                        renderIcon={() => <Image style={styles.image} source={require('../res/images/ic_hstar.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#B0C4DE'}]} source={require('../res/images/ic_hstar.png')} />}
                        onPress={() => this.setState({ selectedTab: 'tb_star' })}>
                        <View styles={styles.page2}>
                            <NormalHeader title={'我的收藏'}/>
                            <ScrollView>
                            <CollectList/>
                            </ScrollView>
                        </View>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_profile'}
                        selectedTitleStyle={{color:'#B0C4DE'}}
                        title="我"
                        renderIcon={() => <Image style={styles.image} source={require('../res/images/ic_hprofile.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#B0C4DE'}]} source={require('../res/images/ic_hprofile.png')} />}
                        onPress={() => this.setState({ selectedTab: 'tb_profile' })}>
                        <View styles={styles.page4}>
                            <ScrollView><MinePage navigation={this.props.navigation}/></ScrollView>
                        </View>
                    </TabNavigator.Item>
                </TabNavigator>

            </View>
        );
    }
    componentDidMount() {
        this.getProfile();
    }

    getProfile = () => {
        requestWithToken({
            method: 'GET',
            url: '/TabPage'
        })
            .then(({ data }) => this.setState({ username: data.username }))
            .catch(err => {
                console.log(err);
                this.setState({ errorMsg: '获取用户信息出错！' });
            });
    };

}


/*
export default TabPage = createStackNavigator(
    {
        First: { screen: HDetail },

        Second: { screen: HDetail }
    });*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#F5FCFF',
    },
    page1:{
        flex:1,
        backgroundColor: '#AFEEEE',
        justifyContent: 'center',
        alignItems:'center'
    },
    page2:{
        flex:1,
        backgroundColor: '#AFEEEE',
    },
    page3:{
        flex:1,
        backgroundColor: 'blue',
    },
    page4:{
        flex:1,
        backgroundColor: '#AFEEEE',
    },
    image:{
        height: 24,
        width:24
    },
    text:{
        fontSize:26
    },
    button:{
        width:26,
        height:26,
        margin:5,
        padding:8
    },
    searchBar: {
        backgroundColor: '#B0C4DE',
        flexDirection: 'row',
        padding: 15,//zan
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerBody: {
        //marginTop:2,
        padding: 8,
        backgroundColor: '#6495ED',
        //marginBottom:10,
        flexDirection: 'row'
    },
    searchInput: {
        borderRadius: 15,
        paddingTop: 4,
        paddingBottom: 4,
        marginLeft: 4,
        marginRight: 4,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        paddingVertical: 0,//垂直内边距设置为0
    },
    fontClick:{
        color:'#E6E6FA',
        fontSize:15,
        fontFamily: 'hanyihuo',
    },
    headerClick:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#6495ED',
        flex:1
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    separator: {
        height: 1,
        backgroundColor: '#E8E8E8',
    },
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },

    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        //backgroundColor:'black'
    },
});
