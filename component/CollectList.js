import React,{Component} from 'react';

import {
    StyleSheet,
    Image,
    View,
    Text,
    ListView,
    TouchableOpacity,
    Platform,
    RefreshControl,
    ScrollView
} from 'react-native';
import HouseDetail from "./HouseDetail";
import realm from '../util/realm.js';
import DataMissing from "../pages/DataMissing";
//import {Collections} from "../util/realm";

let user=realm.objects('User').filtered('online==$0',1);//获取当前用户[0]
const user_id=user.id;

/*打印收藏者信息

let collectOwners = realm.objects('Collections').filtered('collect_id.@length > 0');
console.log('进行了收藏操作的人有：'+collectOwners);
for (let p of collectOwners) {
    console.log(`  ${p.collector_id}`);
}
for (let p of collectOwners) {
    console.log(`  ${p.name}`);
}
*/

let collects=realm.objects('Collections').filtered('collector_id==$0',user_id).houses;//[0]根据用户id关联collector_id获取收藏信息houses
//let collect=realm.objects('Collections').filtered('collector_id==$0',user_id)[0];//根据用户id关联collector_id获取收藏信息[0]


//const collect_id=collect.collect_id;
console.log('collect-收藏的人'+JSON.stringify(user)+'收藏人ID：'+user_id);
//console.log('collect-收藏列表中的房屋ID：'+collects.house_id);
console.log('collect-收藏列表中的房屋：'+JSON.stringify(collects));


/*let housedata=realm.objects('House_Info').filtered("house_id == $0", collects.house_id)
    .sorted("publish_time", true);
let houseList=Collections.houses;
let houses=houseList[1];
console.log('collect-被收藏的房屋信息'+JSON.stringify(housedata));*/
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class CollectList extends Component {

    constructor(props) {
        super(props);
        //console.log('collect-房屋详细信息：'+JSON.stringify(housedata));
        this.state = {
            //dataSource: ds.cloneWithRows(housedata),
            dataSource: ds.cloneWithRows(collects),
            isRefreshing: false,
        };
        this.GoToHouseDetail=this.GoToHouseDetail.bind(this);
    }

    _onRefresh() {
        if(!this.props){ alert('没有更多数据啦！')}
        if(this.props){
            this.setState(
                {dataSource:this.state.dataSource}
            )
        }
    }

    /**
     * 根据house_id跳转房源详情
     **/
    GoToHouseDetail(house_id) {
        this.props.navigation.navigate('HouseDetail',{
            itemId: house_id});
    };

    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: .5,
                    width: "100%",
                    backgroundColor: "#000",}}
            />
        );
    };

    /**
     * 渲染房屋展示卡片列表
     **/
    render() {
        if(this.state.dataSource._cachedRowCount===0){
            console.log('collect-行数'+ListView._cachedRowCount);
            return(
                <View style={{justifyContent:'center'}}>
                    <DataMissing />
                </View>
            );
        }else {
            return (
                <View style = {styles.MainContainer }>
                    <ScrollView style={{flex:1}}>
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
                            dataSource={this.state.dataSource}
                            renderSeparator={this.ListViewItemSeparator}
                            renderRow={(rowData) =>
                                <View style={{flex:1, flexDirection: 'column'}}>
                                    <TouchableOpacity onPress={this.GoToHouseDetail.bind(this,rowData.house_id)}>
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
                        />

                    </ScrollView>

                </View>

            );
        }
    }

}


const styles = StyleSheet.create({
    MainContainer :{
        flex:1,
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
        borderColor: '#B0C4DE',
        //backgroundColor:'#B0C4DE'
    },
});


