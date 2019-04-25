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

export default class CollectList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            //dataSource: ds.cloneWithRows(collects),
            //isRefreshing: false,
        };
        this.GoToHouseDetail=this.GoToHouseDetail.bind(this);
    }

    /**
     * 根据house_id跳转房源详情
     **/
    GoToHouseDetail(house_id) {
        this.props.navigation.navigate('HouseDetail',{
            itemId: house_id});
    };
    GoToGallery(house_id) {
        this.props.navigation.navigate('ImageBrowers',{
            itemId: house_id});
    };

    /**
     * 渲染房屋展示卡片列表
     **/
    render() {
        let user=realm.objects('User').filtered('online==$0',1)[0];//获取当前用户
        const user_id=user.id;
        let collects=realm.objects('Collections').filtered('collector_id==$0',user_id);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        console.log('collect-行数'+collects.length);
        console.log('collect-数据'+JSON.stringify(collects));
        if(collects.length<1){
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
                            enableEmptySections = {true}
                            //dataSource={this.state.dataSource}
                            dataSource={ds.cloneWithRows(collects)}
                            renderRow={(rowData) =>
                                <View>
                                    <TouchableOpacity onPress={this.GoToHouseDetail.bind(this,rowData.collect_id)}>
                                        <View style={styles.cardcontainer}>
                                            <View style={styles.leftContainer}>
                                                <View style={styles.briefInfoContainer}>
                                                    <Text style={{marginVertical: 5,fontSize:18,color:'black'}}>
                                                        {rowData.areaname}{rowData.leasetype}
                                                    </Text>
                                                    <View style={styles.timeInfo}>
                                                        <Text numberOfLines={2} style={styles.putoutTime}>{rowData.collect_time}收藏</Text>
                                                    </View>
                                                </View>
                                                <Text numberOfLines={2} style={styles.doorText}>{rowData.doormodel}</Text>
                                                <Text style={styles.feeText}>{rowData.rentfee}</Text>
                                            </View>
                                            <View style={styles.rightContainer}>
                                                <TouchableOpacity onPress={this.GoToGallery.bind(this,rowData.collect_id)}>
                                                    <Image style={styles.enterImage} source={require('../res/images/still_default1.png')} />
                                                    <View style={{justifyContent:'flex-end'}}>
                                                        <Text style={{color: '#5CACEE',fontSize: 12}}>查看图片</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <Text style={styles.areaText}>{rowData.totalarea}</Text>
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
    cardcontainer: {
        flexDirection: 'row',
        marginBottom: 10,
        marginHorizontal: 10,
        marginTop: 3,
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
    areaText: {
        color: 'orange',
        marginTop: 5,
        fontSize: 16
    },
});


