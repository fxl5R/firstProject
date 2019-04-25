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
export default class TradeTable extends Component {

    /**
     * 根据relate_id跳转交易详情
     **/
    GoToTradeDetail(relate_id) {
        this.props.navigation.navigate('TradeDetail',{
            relate_id: relate_id});
    };

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
                                    <TouchableOpacity onPress={this.GoToTradeDetail.bind(this,rowData.relate_id)}>
                                        <View style={styles.cardcontainer}>
                                                <View style={styles.briefInfoContainer}>
                                                    <Text style={{marginVertical: 5,fontSize:15,color:'black'}}>
                                                        编号：{rowData.relate_id};状态：{rowData.isRenting==='1'?'正在出租':'正在申请'}；
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
