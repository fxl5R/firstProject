
import React, { Component } from 'react';
import {StyleSheet, View, ScrollView, ListView, TouchableOpacity, Text, Platform} from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import realm from "../util/realm";


export default class UserTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search:''
        }
    }
    /**
     * 根据user_id跳转用户详情
     **/
    GoToUserDetail(user_id) {
        this.props.navigation.navigate('UserDetail',{
            user_id: user_id});
    };

    render() {
        let users=realm.objects('User');
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        console.log('UserTable'+JSON.stringify(users));
        return (
            <View style = {styles.MainContainer }>
                <ScrollView style={{flex:1}}>
                    <ListView
                        enableEmptySections = {true}
                        dataSource={ds.cloneWithRows(users)}
                        renderRow={(rowData) =>
                            <View>
                                <TouchableOpacity onPress={this.GoToUserDetail.bind(this,rowData.id)}>
                                    <View style={styles.cardcontainer}>
                                        <View style={styles.briefInfoContainer}>
                                            <Text style={{marginVertical: 5,fontSize:15,color:'black'}}>
                                                ID：{rowData.id};账号：{rowData.userName}；邮箱：{rowData.userEmail}
                                            </Text>
                                            <Text style={{marginVertical: 5,fontSize:15,color:'black'}}>
                                                地址：{rowData.userLocation}；电话：{rowData.userTel}
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
