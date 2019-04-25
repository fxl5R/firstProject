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
    ListView,
    Platform,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import realm from "../util/realm";
export default class CommentTable extends Component {

    /**
     * 根据relate_id跳转交易详情
     **/
    GoToDetail(uid,detail_id) {
        if(uid===-1){
            this.props.navigation.navigate('HouseInfoDetail',{
                house_id: detail_id});
        }else {
            this.props.navigation.navigate('UserDetail',{
                user_id: detail_id});
        }

    };
    /**
     * 根据user_id跳转用户详情
     **/
    GoToUserDetail(user_id) {
        this.props.navigation.navigate('UserDetail',{
            user_id: user_id});
    };

    render() {
        let comments=realm.objects('Comments');
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        console.log('TradeTable'+JSON.stringify(comments));

        return (
            <View style = {styles.MainContainer }>
                <ScrollView style={{flex:1}}>
                    <ListView
                        enableEmptySections = {true}
                        dataSource={ds.cloneWithRows(comments)}
                        renderRow={(rowData) =>
                            <View>
                                <TouchableOpacity onPress={this.GoToTradeDetail.bind(this,rowData.relate_id)}>
                                    <View style={styles.cardcontainer}>
                                        <View style={styles.briefInfoContainer}>
                                            <Text style={{marginVertical: 5,fontSize:15,color:'black'}}>
                                                编号：{rowData.id};
                                            </Text>
                                            <TouchableOpacity onPress={this.GoToUserDetail.bind(this,rowData.from_uid)}>
                                                <Text style={{marginVertical: 5,fontSize:15,color:'black'}}>
                                                评论人：{rowData.from_uid}；
                                                </Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={this.GoToDetail.bind(this,rowData.to_uid,rowData.to_uid===-1?rowData.to_hid:rowData.to_uid)}>
                                                <Text style={{marginVertical: 5,fontSize:15,color:'black'}}>
                                                    评论对象：{rowData.to_uid===-1?'房屋：'+rowData.to_hid:'用户：'+rowData.to_uid}；
                                                </Text>
                                            </TouchableOpacity>
                                            <Text style={{marginVertical: 5,fontSize:15,color:'black'}}>
                                                评论内容：{rowData.content}
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
