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
    Alert,
    RefreshControl
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

let mydata=realm.objects('House_Info').filtered("certification == $0", null)
    .sorted("publish_time", true);
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class HouseCell extends Component {

    constructor(props) {
        super(props);

        console.log('testSearch!!!11111'+mydata);
        this.state = {
            dataSource: ds.cloneWithRows(mydata),
            isRefreshing: false,
            searchString:props.value1,
            typee:'',
            door:'',
            decorate:'',
            sort:'',
        };
        this.GoToHouseDetail=this.GoToHouseDetail.bind(this);
    }


  /**  将父组件传来的props转为子(本)组件的state
  *    进行关键字查询
  **/
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);

        this.setState({
            searchString: nextProps.value1,
            typee: nextProps.typee > this.props.typee,
            door: nextProps.door > this.props.door,
            decorate: nextProps.decorate > this.props.decorate,

            dataSource:ds.cloneWithRows(mydata.filtered("area_name CONTAINS[c] $0 OR house_location CONTAINS[c] $0",this.props.value1)//过滤‘由TabPage的SearchBar传递来的searchstring关键字’
                .filtered("lease_type CONTAINS[c] $0",this.props.typee)
                .filtered("door_model CONTAINS[c] $0",this.props.door)
                .filtered("house_decorate CONTAINS[c] $0",this.props.decorate))
        });

        console.log('testSearch!!!2222'+this.state.dataSource);
    }
    _onRefresh() {
        if(!this.props){ alert('没有更多数据啦！')}
        if(this.props){
            this.setState(
                {dataSource:this.state.dataSource}
            )

        }
    }

    /**  根据从TabPage传递的DropDown参数
     *    进行关键字查询
     **/




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
        //if(this.props.typee){Alert.alert(this.props.typee)}else{Alert.alert('without typee value')};<Text>{this.props.typee}</Text>
        return (
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
            </View>

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


