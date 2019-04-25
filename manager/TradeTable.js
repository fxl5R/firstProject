/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    Alert,
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
import {ActionSheet} from "teaset";
export default class TradeTable extends Component {

    /**
     * 根据relate_id跳转交易详情
     **/
    GoToTradeDetail(relate_id) {
        this.props.navigation.navigate('TradeDetail',{
            relate_id: relate_id});
    };

    showaction(modal,relate_id) {
        let items = [
            {title: '删除此交易内容？', onPress:()=>{
                    Alert.alert(
                        '提示',
                        '删除后信息无法找回',
                        [
                            {text:'取消',onPress:(()=>{}),style:'cancel'},
                            {text:'确定',onPress: (()=>{
                                    realm.write(() => {
                                        let thetrade = realm.objects('Rent_Relate').filtered('relate_id==$0',relate_id);
                                        realm.delete(thetrade);
                                    });
                                    this.props.navigation.navigate('TradeTable');
                                })}]
                    );
                }
            }

        ];
        let cancelItem = {title: '取消'};
        ActionSheet.show(items, cancelItem, {modal});
    }

    render() {
        const {navigation}=this.props;
        const house_id=navigation.getParam('house_id','No-House');
        let trades=realm.objects('Rent_Relate').filtered('rented_id==$0',house_id);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        console.log('TradeTable'+JSON.stringify(trades));
            return (
                <View style = {styles.MainContainer }>
                    <ScrollView style={{flex:1}}>
                        <ListView
                            enableEmptySections = {true}
                            dataSource={ds.cloneWithRows(trades)}
                            renderRow={(rowData) =>
                                <View>
                                    <TouchableOpacity onPress={() =>this.showaction(true,rowData.rented_id)}>
                                        <View style={styles.cardcontainer}>
                                                <View style={styles.briefInfoContainer}>
                                                    <Text style={{marginVertical: 5,fontSize:15,color:'black'}}>
                                                        编号：{rowData.relate_id};状态：{rowData.isRenting==='1'?'正在出租':'正在申请'}；
                                                        交易：{rowData.isFinish===1?'已结束':'未完成'}
                                                    </Text>
                                                    <Text style={{marginVertical: 5,fontSize:15,color:'black'}}>
                                                        申请人ID：{rowData.roomer_id}；房屋ID：{rowData.rented_id}；房主ID：{rowData.owner_id}
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
