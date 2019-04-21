/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    Image,
    ListView, Platform, RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import realm from '../../util/realm.js';
import BackHeader from '../../component/BackHeader';

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class HouseManager extends Component {

    constructor(props){
        super(props);
        this.state={
            isRefreshing: false,
        };
        this.GoToHouseDetail=this.GoToHouseDetail.bind(this);
    }

/*
    componentDidMount() {

        // Get a result containing all projects
        const houses = realm
            .objects("House_Info")
            .filtered("publisher_id == $0", this.props.user.identity)
            .sorted("publish_time", true);

        // When the list of houses changes, React won't know about it because the Result object itself will not change.
        houses.addListener(() => {
            // Bump a data version counter that we'll pass to components that should update when the projects change.
            this.setState({ dataVersion: this.state.dataVersion + 1 });
        });

        // Create a subscription and add a listener
        // Remember to remove the listener when component unmounts
        this.subscription = houses.subscribe();
        this.subscription.addListener(this.onSubscriptionChange);

        // Update the state with the houses
        this.setState({ houses });
    }*/



    /**
     * 根据house_id跳转房源详情
     **/
    GoToHouseDetail(house_id) {
        this.props.navigation.navigate('HouseDetail',{
            itemId: house_id,
            isEdit:1
        });
    };

    /*listView 分割线*/
/*    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: .5,
                    width: "100%",
                    backgroundColor: "#000",}}
            />
        );
    };*/
    _onRefresh() {
        if(!this.props){ alert('没有更多数据啦！')}
        if(this.props){
            this.setState(
                {dataSource:this.state.dataSource}
            )
        }
    }

    render() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');//从个人中心获取用户的ID
        let mydata = realm.objects('House_Info');
        let ismyHouseData=mydata.filtered("publisher_id==$0", itemId)
            .sorted("publish_time", true);

        return (
            <ScrollView>
                <View style={styles.container}>
                    <BackHeader navigation={this.props.navigation} title={'房屋管理'}/>
                    {/*<HouseCell navigation={this.props.navigation}/>*/}
                    <View style = {styles.MainContainer }>
                        <ListView
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                    tintColor="#ff0000"
                                    title="加载中..."
                                    titleColor="#00ff00"
                                    colors={['#ff0000', '#00ff00', '#0000ff']}
                                    progressBackgroundColor="#ffffff"
                                />}
                            enableEmptySections = {true}
                            dataSource={ds.cloneWithRows(ismyHouseData)}
                            /*renderSeparator={this.ListViewItemSeparator}*/
                            renderRow={(rowData) =>
                                <View style={{flex:1, flexDirection: 'column',borderWidth: 1 ,borderColor:'#f1f1f1',}}>
                                    <TouchableOpacity onPress={
                                        this.GoToHouseDetail.bind(this,rowData.house_id)}>
                                        <View style={{backgroundColor: '#FFF'}}>
                                            <View style={{padding: 10, flexDirection: 'row'}}>
                                                <Image style={styles.thumb} source={rowData.house_pic?
                                                    {uri:rowData.house_pic}:require('../../res/images/detailbg.jpg')}/>
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
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer :{
        flex:1,
        //justifyContent: 'center',
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
        margin: 0,
        backgroundColor: '#F5FCFF'
    },
    textContainer: {
        flex: 1
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#48BBEC'
    },
    title: {
        fontSize: 20,
        color: '#656565'
    },
    thumb: {
        width: 80,
        height: 80,
    },
    separator: {
        height: 1,
        backgroundColor: '#E8E8E8',
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
});
