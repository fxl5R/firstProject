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
    ScrollView,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TabNavigator from 'react-native-tab-navigator';
import HouseCell from '../component/HouseCell';
import MinePage from './MinePage';
import {NormalHeader} from "../component/BackHeader";

import {MsgCard } from '../component/antComponent';
import MDropDown from '../component/ActionMenu/MDropDown';
import {SearchBar} from "@ant-design/react-native";
//import MyCarousel from "../component/MyCarousel";
import { requestWithToken } from '../util/request';


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
        this.clear = () => { this.setState({ value1: '' }); };
        this._renderHeader = this._renderHeader.bind(this);
    }

    //父组件接收子(MDropDown)组件的参数，并改变state
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

    //设置第一栏
    _renderHeader = () => {
        return (
            <View>
                <View style={[styles.headerBody,{flexDirection:'row'}]}>
                    <TouchableHighlight style={styles.headerClick}
                                        onPress={()=>{this.props.navigation.navigate('AddHousePage')}} >
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
                        <View styles={styles.page1}>
                            <SearchBar
                                value={this.state.value1}
                                placeholder="输入小区名或地址"
                                //onSubmit={value1 => Alert.alert(value1)}
                                cancelText={'进入'}
                                onCancel={this.clear}
                                onChange={this.onChange}
                            />
                            {this._renderHeader()}
                            <MDropDown setValue1={this.setValue1} setValue2={this.setValue2} setValue3={this.setValue3} setValue4={this.setValue4}/>
                            <ScrollView >
                            <HouseCell
                                navigation={this.props.navigation}
                                value1={this.state.value1}
                                typee={this.state.typee==='不限'?'':this.state.typee}
                                door={this.state.door==='不限'?'':this.state.door}
                                decorate={this.state.decorate==='不限'?'':this.state.decorate}
                                sort={this.state.sort} />

                                <View style={{height:Platform.OS === 'ios' ? 0:200}}/>
                            </ScrollView>
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

                        </View>
                    </TabNavigator.Item>
{/*                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_msg'}
                        selectedTitleStyle={{color:'#B0C4DE'}}
                        title="消息"
                        renderIcon={() => <Image style={styles.image} source={require('../res/images/ic_hmsg1.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#B0C4DE'}]} source={require('../res/images/ic_hmsg1.png')} />}
                        badgeText="1"
                        onPress={() => this.setState({ selectedTab: 'tb_msg' })}>
                        <View styles={styles.page3}>
                            <NormalHeader navigation={this.props.navigation} title={'消息栏'}/>
                            <View style={styles.container}> key token
                                <Text style={styles.text}>
                                    {errorMsg ? errorMsg : username + ', Welcome home!'}
                                </Text>
                                <Button
                                    onPress={this.getProfile}
                                >刷新</Button>
                            </View>
                            <MsgCard
                                msgtitle={'用户123'}
                                msgbrief={'消息梗概消息梗概'}
                                imgUri={'http://sowcar.com/t6/681/1552475145x986907160.png'}
                                extra={'一条消息'}
                                footerextracontent={'2019-2-22 16:40:34'}/>
                            <MsgCard
                                msgtitle={'用户123'}
                                msgbrief={'消息梗概消息梗概'}
                                imgUri={'http://sowcar.com/t6/681/1552475175x2890174339.png'}
                                extra={'一条消息'}
                                footerextracontent={'2019-2-22 16:40:34'}/>
                        </View>
                    </TabNavigator.Item>*/}
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
    separator: {
        height: 1,
        backgroundColor: '#E8E8E8',
    },
});
