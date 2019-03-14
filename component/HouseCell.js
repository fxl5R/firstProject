import React,{Component} from 'react';

import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    Text,
    ListView,
    TouchableOpacity,
    Platform, Button
} from 'react-native';
import HouseDetail from "./HouseDetail";
import realm from '../util/realm.js';

/*export const HouseSchema={
    name: 'House_Info',
    properties:
        {
            //house_id:'int',
            house_publisher: 'string',
            publish_time: 'string',
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
        }};*/

export default class HouseCell extends Component {
    constructor(props) {
        super(props);
        //let mydata =new Realm({schema: [HouseSchema]}).objects('House_Info');
        let mydata=realm.objects('House_Info');
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(mydata),
            isHouseData:mydata.filtered("certification == $0", null)
                .sorted("door_model", true)
        };
        //this.props.navigation.navigate.bind(this);
        this.GoToHouseDetail=this.GoToHouseDetail.bind(this);
    }

    /*GetClickedItem(house_publisher){
        //Alert.alert(house_publisher);
        //Alert.alert(constructor.isPrototypeOf(dataSource).toString());this.props.navigator.push
       this.props.navigation.navigate('HouseDetail',{
            house_publisher: 'Jaacckkkk',
    });
    }*/
/*    GetClickedItem(){
        this.props.navigation.navigate('Details', {
            itemId: 886,
            otherParam: 'anything you want here',
            });}*/
    GoToHouseDetail() {
        console.log(this.props.navigation);
        console.log('eeeeeeeeeeeeeeeeeeeeee');
        this.props.navigation && this.props.navigation.navigate('HouseDetail');

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
    render() {
        //const { navigate } = this.props.navigation;  //occur TypeError:undefined is not an object
        return (
            <View style = {styles.MainContainer }>
            <ListView
                dataSource={this.state.dataSource}
                renderSeparator={this.ListViewItemSeparator}
                renderRow={(rowData) =>
                    <View style={{flex:1, flexDirection: 'column'}}>
                    {/*<TouchableOpacity onPress={this.GetClickedItem.bind(this, rowData.house_publisher)}>*/}
                    <TouchableOpacity onPress={this.GoToHouseDetail}>
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

/*const RootStack = createStackNavigator(
    {
        HouseCell: { screen: HouseCell },

        HouseDetail: { screen: HouseDetail }
    },
    {
        initialRouteName: 'HouseCell',
    });

const HouseInfo = createAppContainer(RootStack);
export default HouseInfo;*/
/*
export default class HouseInfo extends React.Component {
    render() {
        return <AppContainer/>;
    }
}

export default HouseCell = createStackNavigator(
    {
        HouseCell: { screen: HouseCell },
        HouseDetail: { screen: HouseDetail }

    });

*/


// 样式
const styles = StyleSheet.create({
    MainContainer :{
        flex:1,
        //justifyContent: 'center',
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
        margin: 10
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
//module.exports = HouseCell;
//module.exports = HouseSchema;
//export default HouseCell;

