
import React, { Component } from 'react';
import {StyleSheet, View, ScrollView, ListView, TouchableOpacity, Text, Platform} from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import realm from "../util/realm";


export default class HouseTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search:''
        }
    }
    /**
     * 根据house_id跳转房源详情
     **/
    GoToHouseDetail(house_id) {
        this.props.navigation.navigate('HouseInfoDetail',{
            house_id: house_id});
    };

    render() {
        let houses=realm.objects('House_Info');
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        console.log('UserTable'+JSON.stringify(houses));
        return (
            <View style = {styles.MainContainer }>
                <ScrollView style={{flex:1}}>
                    <ListView
                        enableEmptySections = {true}
                        dataSource={ds.cloneWithRows(houses)}
                        renderRow={(rowData) =>
                            <View>
                                <TouchableOpacity onPress={this.GoToHouseDetail.bind(this,rowData.house_id)}>
                                    <View style={styles.cardcontainer}>
                                        <View style={styles.briefInfoContainer}>
                                            <Text style={{marginVertical: 5,fontSize:15,color:'black'}}>
                                                ID：{rowData.house_id};地址：{rowData.house_location}；小区：{rowData.area_name}
                                            </Text>
                                            <Text style={{marginVertical: 5,fontSize:15,color:'black'}}>
                                                出租类型：{rowData.lease_type}；户型：{rowData.door_model}
                                            </Text>
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

const styles = StyleSheet.create({
    MainContainer :{
        flex:1,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
        margin: 0,
        backgroundColor: '#F5FCFF'
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
        justifyContent:'center'
        //elevation: 1
    },
    briefInfoContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
});
