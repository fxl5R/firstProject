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
    TouchableOpacity,     //返回按钮可单击,
    Navigator,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import HouseCell from '../component/HouseCell';
import HouseDetail from '../component/HouseDetail';

//自定义搜索栏
class SearchBar extends Component {
    render() {
        return (
            <View style={styles.searchBar}>
                <Text style={{color:'#FFF', fontSize:20}}>搜索</Text>
                <View style={styles.searchInput}>
                    <Image source={require('../res/images/ic_search.png')} style={{width:15,height:15,marginRight:8}}/>
                    <Text style={{color:'#ADD8E6',fontSize:13}}>输入小区名或地址</Text>
                </View>
            </View>
        );
    }
}
//设置第一栏
let _listHeader = function () {
    return (
        <View style={styles.headerBody}>
            <Image style={{width:52,height:50}} source={require('../res/images/ic_department.png')}/>
            <View style={{paddingLeft:20}}>
                <Text style={[{fontSize:16},{color:'#778899'}]}>添加房屋</Text>
            </View>
        </View>
    )
};
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
        //let DataSource= new ListView.DtaataSource({rowHasChanged: (r1, r2)=>r1 !== r2});
        this.state={
            selectedTab:'tb_home',
            refreshing: false,
            //listSource:DataSource.cloneWithRows(this._genRows({}))
        };
        //this._renderRow = this._renderRow.bind(this);//bind onPress()
    }
    componentDidMount() {
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
    };
    _selectHouse(house:Object) {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'HouseDetail',
                component: HouseDetail,
                params: {house: house}
            });
        }
    }
    _renderRow(houseData) {
        return (<HouseCell onSelect={() => this._selectHouse(houseData)} houseData={houseData}/>);
    }

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
                        badgeText="1"
                        onPress={() => this.setState({ selectedTab: 'tb_home' })}>
                        <View styles={styles.page1}>
                            <View style={styles.container}>
                                <SearchBar />
                                    <FlatList
                                        renderRow={this._renderRow}
                                        data={myHouseJSON}
                                        renderItem={({ item }) => (
                                            <View style={{ flex: 1, flexDirection: "column" }}>
                                                <Text style={styles.text}>{item[0]}</Text>
                                                <Text style={styles.text}>{item[1]}</Text>
                                                <Text style={styles.text}>{item[2]}</Text>
                                                <Text style={styles.text}>{item[3]}</Text>
                                            </View>
                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                        /*renderFooter={renderFooter}*/
                                        renderHeader={_listHeader}
                                    />
                            </View>
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
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerBody: {
        padding: 20,
        backgroundColor: '#B0C4DE',
        marginBottom: 15,
        flexDirection: 'row'
    },
    searchInput: {
        borderRadius: 15,
        backgroundColor: '#F5F5F5',
        paddingTop: 7,
        paddingBottom: 7,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    },
});
