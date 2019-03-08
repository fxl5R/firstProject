/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,     //返回按钮可单击
    Navigator,
    FlatList,
    ActivityIndicator,
    TouchableHighlight
} from 'react-native';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Kohana } from 'react-native-textinput-effects';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TabNavigator from 'react-native-tab-navigator';
import HouseCell from '../component/HouseCell';
import HouseDetail from '../component/HouseDetail';


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
export default class TabPage extends Component<Props> {
    //构造函数
    constructor(props){
        super(props);
        this.state={
            selectedTab:'tb_home',
            refreshing: false,
            searchString:''
        };
        this._renderHeader = this._renderHeader.bind(this);
        this._renderRow = this._renderRow.bind(this);
        this._renderSeparator=this._renderSeparator.bind(this);
    }
/*    componentDidMount() {
        this.makeRemoteRequest();
    }
    makeRemoteRequest = () => {
        const { page, seed } = this.state;
        const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
        this.setState({ loading: true });
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: page === 1 ? res.results : [...this.state.data, ...res.results],
                    error: res.error || null,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    };*/
    _selectHouse(house:Object) {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'HouseDetail',
                component: HouseDetail,
                params: {house: house}
            });
        }
    };
    //设置第一栏
    _renderHeader = () => {
        //const fontFamily = Icon.getFontFamily(FontAwesome5_Regular);
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
    _renderRow(houseData) {
        return (<HouseCell onSelect={() => this._selectHouse(houseData)} houseData={houseData}/>);
    };
    _renderSeparator = () => {
        return <View style={{height:1,backgroundColor:'gray'}}/>;
    };

    /*    _leftButtonPress=()=>{
            const {navigation}=this.props;
            navigation.goBack();
        }*/
/*    onPress=()=>{
        const {onPress} =this.props;
        onPress();
    };*/

    render() {
        let myHouseJSON = [
            {
                "0": {
                    student_id: 1,
                    student_name: "Ashish",
                    student_class: "React",
                    student_subject: "React native"
                },
                "1": {
                    student_id: 2,
                    student_name: "Ashish1",
                    student_class: "React1",
                    student_subject: "React native1"
                },
                "2": {
                    student_id: 3,
                    student_name: "",
                    student_class: "",
                    student_subject: ""
                },
                "3": {
                    student_id: 4,
                    student_name: "",
                    student_class: "",
                    student_subject: ""
                }
            }
        ];
        return (
            <View style={styles.container}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_home'}
                        selectedTitleStyle={{color:'#2680F0'}}
                        title="发现"
                        renderIcon={() => <Image style={styles.image} source={require('../res/images/ic_hindex.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#2680F0'}]} source={require('../res/images/ic_hindex.png')} />}
                        /*badgeText="1"*/
                        onPress={() => this.setState({ selectedTab: 'tb_home' })}>
                        <View styles={styles.page1}>
                                <SearchBar />
                                    <FlatList
                                        ListHeaderComponent={this._renderHeader()}
                                        renderRow={this._renderRow}
                                        ItemSeparatorComponent={this._renderSeparator}
                                        data={myHouseJSON}
                                        renderItem={({ item }) => (
                                            <View style={{ flex: 1, flexDirection: "column" }}>
                                                <Text style={styles.text}>{item[0].student_subject}</Text>
                                                <Text style={styles.text}>{item[1].student_subject}</Text>
                                                <Text style={styles.text}>{item[2].student_subject}</Text>
                                                <Text style={styles.text}>{item[3].student_subject}</Text>
                                            </View>
                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                        /*renderFooter={renderFooter}*/
                                    />
                        </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_star'}
                        selectedTitleStyle={{color:'#2680F0'}}
                        title="收藏"
                        renderIcon={() => <Image style={styles.image} source={require('../res/images/ic_hstar.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#2680F0'}]} source={require('../res/images/ic_hstar.png')} />}
                        onPress={() => this.setState({ selectedTab: 'tb_star' })}>
                        <View styles={styles.page2}><Text style={styles.text}>收藏22222</Text></View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_msg'}
                        selectedTitleStyle={{color:'#2680F0'}}
                        title="消息"
                        renderIcon={() => <Image style={styles.image} source={require('../res/images/ic_hmsg1.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#2680F0'}]} source={require('../res/images/ic_hmsg1.png')} />}
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
                        selectedTitleStyle={{color:'#2680F0'}}
                        title="我"
                        renderIcon={() => <Image style={styles.image} source={require('../res/images/ic_hprofile.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#2680F0'}]} source={require('../res/images/ic_hprofile.png')} />}
                        onPress={() => this.setState({ selectedTab: 'tb_profile' })}>
                        <View styles={styles.page4}><Text style={styles.text}>我4444444</Text></View>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}

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
    }
});
