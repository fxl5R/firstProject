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
    FlatList,
    ActivityIndicator,
    TouchableHighlight,
    YellowBox,
    ListView,
    Alert,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Kohana } from 'react-native-textinput-effects';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TabNavigator from 'react-native-tab-navigator';
import HouseDetail from '../component/HouseDetail';
import {HouseSchema} from '../component/HouseCell';
import HouseCell from '../component/HouseCell';


/*//初始化Realm
let realm = new Realm({schema: [HouseSchema]});*/
/*
const HouseSchema={
    name: 'House_Info',
    properties:
        {
            house_publisher: 'string',
            publish_time: 'date',
            lease_type: 'string',
            area_name: 'string',
            unit_build:'string',
            total_area:'string',
            door_model:'string',
            toward_direct:'string',
            house_floor:'string',
            house_decorate:'string',
            rent_fee:'string',
            pay_type:'string',
            house_pic:'string',
            house_description:'string',
            owner_tel:'string',
            certification:{type: 'int',default: 0,optional: true}
        }};
*/

const Realm=require('realm');
//自定义搜索栏
class SearchBar extends Component {
    render() {
        return (
            <View style={styles.searchBar}>
                <View style={styles.searchInput}>
                    <Kohana
                        style={[styles.textInput]}
                        label={'输入小区名或地址'}
                        iconClass={MaterialsIcon}
                        iconName={'search'}
                        iconColor={'#B0C4DE'}
                        iconSize={18}
                        labelStyle={{color:'#B0C4DE'}}
                        inputPadding={10}
                        useNativeDriver
                        onChangeText={(searchString)=>this.setState({searchString})}
                    />
                </View>
            </View>
        );
    }
}

//设置尾部
/*let renderFooter = () => {
    if (!this.state.loading) return null;
    return (
        <View
            style={{
                paddingVertical: 20,
                borderTopWidth: 1,
                borderColor: "#CED0CE"
            }}>
            <ActivityIndicator animating size="large" />
        </View>
    );
};*/

const modelSchema=[HouseSchema];
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
        };
        this._renderHeader = this._renderHeader.bind(this);
        this._renderItem = this._renderItem.bind(this);
        this._renderSeparator=this._renderSeparator.bind(this);
    }

    _selectHouse(isHouseData:Object) {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'HouseDetail',
                component: HouseDetail,
                params: {house:isHouseData}
            });
        }
    };
    //设置第一栏
    _renderHeader = () => {
        return (
            <View>
                <View style={[styles.headerBody,{flexDirection:'row'}]}>
                    <TouchableHighlight style={styles.headerClick}
                                        onPress={()=>{this.props.navigation.navigate('MsgBox')}}>
                        <View>
                            <Icon name="city" size={50} color="#E6E6FA" light />
                            <Text style={styles.fontClick}>添加房屋</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.headerClick}
                                        onPress={()=>{this.props.navigation.navigate('MapLocation')}}>
                        <View>
                            <Icon name="map-marked-alt" size={50} color="#E6E6FA" light/>
                            <Text style={styles.fontClick}>地图找房</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
            )
    };
    _renderItem=({item:isHouseData}) => {
        return (
            <TouchableHighlight
                id={isHouseData.house_id}
                onPress={this._selectHouse(isHouseData.house_id)}>
                <View>
                    <HouseCell/>
                </View>
            </TouchableHighlight>
        );
    };
        /*<TouchableHighlight onPress={() => this._selectHouse(_isHouseData)} >
        <HouseCell/>
        </TouchableHighlight>}*/
    _renderSeparator = () => {
        return <View style={{height:1,backgroundColor:'gray'}}/>;
    };

    render() {
        /*let A=realm.objects('House_Info');
        let houseData=Object.values(A);*/
        let mydata = new Realm({schema:modelSchema}).objects('House_Info');
        let result=mydata.filtered("certification == $0", null)
            .sorted("door_model", true);
        let isHouseData=JSON.stringify(result);
        console.log('testtttt success'+Array.from(isHouseData).toString());
        //let isHouseData=Array.from(result).toString();
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
                            <SearchBar/>
                            <FlatList
                                //data={isHouseData} 报错待解决
                                ListHeaderComponent={this._renderHeader()}
                                renderItem={this._renderItem}
                                ItemSeparatorComponent={this._renderSeparator()}
                                extraData={this.state}
                                keyExtractor={(item) => item.id}
                            />
                            <ScrollView>
                            <HouseCell/>
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
                        <View styles={styles.page2}><Text style={styles.text}>收藏22222</Text></View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_msg'}
                        selectedTitleStyle={{color:'#B0C4DE'}}
                        title="消息"
                        renderIcon={() => <Image style={styles.image} source={require('../res/images/ic_hmsg1.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#B0C4DE'}]} source={require('../res/images/ic_hmsg1.png')} />}
                        badgeText="1"
                        onPress={() => this.setState({ selectedTab: 'tb_msg' })}>
                        <View styles={styles.page3}>
                            <Text style={styles.text}>消息33333</Text>
                            <Text style={styles.text}
                                  onPress={()=>{
                                      this.props.navigation.navigate('MsgBox');
                                      /*alert('test success');*/
                                  }}>
                                TTTestBBBack
                            </Text>
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
                            <Text style={styles.text}
                                  onPress={()=>{
                                      this.props.navigation.navigate('LandLordPage');
                                      /*alert('test success');*/
                                  }}>我4444444</Text>
                        </View>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
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
        padding: 8,
        backgroundColor: '#6495ED',
        marginBottom: 20,
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
