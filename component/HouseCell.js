import React,{Component} from 'react';

import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    Text,
    ListView,
    TouchableOpacity,
    Platform,
    Button,
    Alert
} from 'react-native';
import HouseDetail from "./HouseDetail";
import realm from '../util/realm.js';

/*function contentQuery(searchStrings) {
    const contents = realm.objects('House_Info');
    if(searchStrings===null){
            isHouseData:mydata.filtered("certification == $0", null)
                .sorted("publish_time", true)}else{
                isHouseData:this.contentQuery(searchStrings)
            }
    const resultContents = contents.filtered(`text CONTAINS "${searchStrings}"`);
    const result = [];
    resultContents.forEach((element) => {
        result.push(element.linkingObjects('Person', 'cats')[0]); //1
    });
    return resultMessages;
}*/

export default class HouseCell extends Component {

    constructor(props) {
        super(props);
        //a:{this.props.value1}/////////////house_location CONTAINS %@ OR

        let mydata=realm.objects('House_Info').filtered("certification == $0", null).filtered("area_name CONTAINS[c] $0",this.props.value1)
            .sorted("publish_time", true);
        //let mydata=mydatas.filtered("area_name CONTAINS[c] $0",this.props.value1);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(mydata),
            /*isHouseData:mydata.filtered("certification == $0", null)
                .sorted("publish_time", false)*/
        };
        this.GoToHouseDetail=this.GoToHouseDetail.bind(this);
    }

    GoToHouseDetail(house_id) {
        console.log('house_idis'+house_id.toString());
        //Alert.alert(house_id.toString());
        console.log(this.props.navigation);
        console.log('eeeeeeeeeeeeeeeeeeeeee');
        this.props.navigation.navigate('HouseDetail',{
            itemId: house_id});

    };
    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: .5,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    };
    //渲染房屋展示卡片列表
    render() {

        return (
            <View style = {styles.MainContainer }>
                <Text>{this.props.value1}</Text>

            <ListView
                dataSource={this.state.dataSource}
                renderSeparator={this.ListViewItemSeparator}
                renderRow={(rowData) =>
                    <View style={{flex:1, flexDirection: 'column'}}>
                    {/*<TouchableOpacity onPress={this.GetClickedItem.bind(this, rowData.house_id)}>*/}
                    <TouchableOpacity onPress={this.GoToHouseDetail.bind(this,rowData.house_id)}>
                        <View style={{backgroundColor: '#FFF'}}>
                            <View style={{padding: 10, flexDirection: 'row'}}>
                                <Image style={styles.thumb} source={require('../res/images/house.png')}/>

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

        );
    }
}

// 样式
const styles = StyleSheet.create({
    MainContainer :{
        flex:1,
        //justifyContent: 'center',
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
        margin: 10,
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
        width: 64,
        height: 64,
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


