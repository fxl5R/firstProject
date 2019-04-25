
import React, {Component} from 'react';
import {Alert, Dimensions, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View,ScrollView} from 'react-native';
import realm from '../util/realm';
import {toastShort} from "../util/ToastUtil";
import {TextareaItem} from "@ant-design/react-native";

const {height, width} = Dimensions.get('window');

export default class HouseInfoDetail extends Component {

    constructor(props){
        super(props);
        this.state={
            House_Location:'',
            Lease_Type:'',
            Area_Name:'',
            Unit_Build:'',
            Total_Area:'',
            Door_Model:'',
            Toward_Direct:'',
            House_Floor:'',
            House_Decorate:'',
            Rent_Fee:'',
            Fee_Period:'',
            Default_Fine:'',
            Rent_Limit:'',
            House_Description:'',
            Owner_Tel:''
        }
    }
    /**
     * 根据user_id跳转用户详情
     **/
    GoToUserDetail(user_id) {
        this.props.navigation.navigate('UserDetail',{
            user_id: user_id});
    };
    delete_House= () => {
        const {navigation}=this.props;
        const house_id=navigation.getParam('house_id','NO_House');
        Alert.alert(
            '提示',
            '删除后信息无法找回',
            [
                {text:'取消',onPress:(()=>{}),style:'cancel'},
                {text:'确定',onPress: (()=>{
                        realm.write(() => {
                            let thehouse = realm.objects('House_Info').filtered('house_id==$0',house_id)[0];
                            realm.delete(thehouse);
                            toastShort('删除成功');
                        });
                        this.props.navigation.navigate('HouseInfoTable');
                    })}]
        );
    };
    edit_House = () => {
        const {navigation}=this.props;
        const house_id=navigation.getParam('house_id','NO_House');
        realm.write(() => {
            let thisHouse=realm.objects('House_Info').filtered('house_id==$0',house_id)[0];
            realm.create('House_Info',
                {
                    house_id: house_id,
                    publisher_id:thisHouse.publisher_id,
                    house_publisher: thisHouse.house_publisher,
                    publish_time: thisHouse.publish_time,
                    lease_type: this.state.Lease_Type?this.state.Lease_Type:thisHouse.lease_type,
                    area_name: this.state.Area_Name?this.state.Area_Name:thisHouse.area_name,
                    unit_build: this.state.Unit_Build?this.state.Unit_Build:thisHouse.unit_build,
                    total_area: this.state.Total_Area?this.state.Total_Area:thisHouse.total_area,
                    door_model: this.state.Door_Model?this.state.Door_Model:thisHouse.door_model,
                    toward_direct: this.state.Toward_Direct?this.state.Toward_Direct:thisHouse.toward_direct,
                    house_floor: this.state.House_Floor?this.state.House_Floor:thisHouse.house_floor,
                    house_decorate: this.state.House_Decorate?this.state.House_Decorate:thisHouse.house_decorate,
                    rent_fee: this.state.Rent_Fee?this.state.Rent_Fee:thisHouse.rent_fee,
                    fee_period:this.state.Fee_Period?this.state.Fee_Period:thisHouse.fee_period,
                    default_fine:this.state.Default_Fine?this.state.Default_Fine:thisHouse.default_fine,
                    rent_limit:this.state.Rent_Limit?this.state.Rent_Limit:thisHouse.rent_limit,
                    pay_type: this.state.Pay_Type?this.state.Pay_Type:thisHouse.pay_type,
                    house_pic: thisHouse.house_pic,
                    house_pic2:thisHouse.house_pic2,
                    house_pic3:thisHouse.house_pic3,
                    house_pic4:thisHouse.house_pic4,
                    house_pic5:thisHouse.house_pic5,
                    house_pic6:thisHouse.house_pic6,
                    support_set: thisHouse.support_set,
                    house_description: this.state.House_Description?this.state.House_Description:thisHouse.house_description,
                    house_location: this.state.House_Location?this.state.House_Location:thisHouse.house_location,
                    owner_tel: this.state.Owner_Tel?this.state.Owner_Tel:thisHouse.owner_tel,
                    certification: null
                },true);//此处合起数据项写入数据库部分内容
        });
        toastShort('修改成功');
    };

    render() {
        const {navigation}=this.props;
        const house_id=navigation.getParam('house_id','NO_House');
        let theHouse=realm.objects('House_Info').filtered('house_id==$0',house_id)[0];
        return (<ScrollView style={{flex:1}}>
            <View style={styles.container}>

                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:5}}>房屋ID：</Text>
                    <TextInput
                        editable={false}
                        style={styles.TextInputStyle}
                        value={theHouse.nickName}
                        underlineColorAndroid="transparent"/>
                </View>
                    <TouchableOpacity onPress={this.GoToUserDetail.bind(this,theHouse.publisher_id)}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:5}}>发布人 ：</Text>
                    <TextInput
                        editable={false}
                        style={styles.TextInputStyle}
                        value={theHouse.publisher_id}
                        underlineColorAndroid="transparent"/>

                </View></TouchableOpacity>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:5}}>发布时间：</Text>
                    <TextInput
                        editable={false}
                        style={styles.TextInputStyle}
                        value={theHouse.publish_time}
                        underlineColorAndroid="transparent"/>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:5}}>地   址：</Text>
                    <TextInput
                        style={styles.TextInputStyle}
                        value={this.state.House_Location?this.state.House_Location:theHouse.house_location}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => {
                            this.setState({House_Location: text})
                        }}/>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:5}}>小区名 ：</Text>
                    <TextInput
                        style={styles.TextInputStyle}
                        value={this.state.Area_Name?this.state.Area_Name:theHouse.area_name}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => {
                            this.setState({Area_Name: text})
                        }}/>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:5}}>单   元：</Text>
                    <TextInput
                        style={styles.TextInputStyle}
                        value={this.state.Unit_Build?this.state.Unit_Build:theHouse.unit_build}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => {
                            this.setState({Unit_Build: text})
                        }}/>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:5}}>面   积：</Text>
                    <TextInput
                        style={styles.TextInputStyle}
                        value={this.state.Total_Area?this.state.Total_Area:theHouse.total_area}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => {
                            this.setState({Total_Area: text})
                        }}/>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:5}}>户   型：</Text>
                    <TextInput
                        style={styles.TextInputStyle}
                        value={this.state.Door_Model?this.state.Door_Model:theHouse.door_model}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => {
                            this.setState({Door_Model: text})
                        }}/>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:5}}>朝   向：</Text>
                    <TextInput
                        style={styles.TextInputStyle}
                        value={this.state.Toward_Direct?this.state.Toward_Direct:theHouse.toward_direct}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => {
                            this.setState({Toward_Direct: text})
                        }}/>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:5}}>楼   层：</Text>
                    <TextInput
                        style={styles.TextInputStyle}
                        value={this.state.House_Floor?this.state.House_Floor:theHouse.house_floor}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => {
                            this.setState({House_Floor: text})
                        }}/>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:5}}>装   修：</Text>
                    <TextInput
                        style={styles.TextInputStyle}
                        value={this.state.House_Decorate?this.state.House_Decorate:theHouse.house_decorate}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => {
                            this.setState({House_Decorate: text})
                        }}/>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:5}}>租   金：</Text>
                    <TextInput
                        style={styles.TextInputStyle}
                        value={this.state.Rent_Fee?this.state.Rent_Fee:theHouse.rent_fee}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => {
                            this.setState({Rent_Fee: text})
                        }}/>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:5}}>交租周期：</Text>
                    <TextInput
                        style={styles.TextInputStyle}
                        value={this.state.Fee_Period?this.state.Fee_Period:theHouse.fee_period}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => {
                            this.setState({Fee_Period: text})
                        }}/>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:5}}>违约金 ：</Text>
                    <TextInput
                        style={styles.TextInputStyle}
                        value={this.state.Default_Fine?this.state.Default_Fine:theHouse.default_fine}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => {
                            this.setState({Default_Fine: text})
                        }}/>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:5}}>最短租期：</Text>
                    <TextInput
                        style={styles.TextInputStyle}
                        value={this.state.Rent_Limit?this.state.Rent_Limit:theHouse.rent_limit}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => {
                            this.setState({Rent_Limit: text})
                        }}/>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:5}}>付款类型：</Text>
                    <TextInput
                        style={styles.TextInputStyle}
                        value={this.state.Pay_Type?this.state.Pay_Type:theHouse.pay_type}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => {
                            this.setState({Pay_Type: text})
                        }}/>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:30}}>房屋描述：</Text>
                    <TextareaItem
                        style={{
                            width: width * 0.7,borderWidth: 1, borderColor: '#C4D883'
                        }}
                        value={this.state.House_Description?this.state.House_Description:theHouse.house_description}
                        rows={6}
                        last={true}
                        placeholder="房屋描述"
                        count={150}
                        onChange={(text) => {
                            this.setState({House_Description: text})
                        }}
                    />
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:5}}>联系方式：</Text>
                    <TextInput
                        style={styles.TextInputStyle}
                        value={this.state.Owner_Tel?this.state.Owner_Tel:theHouse.owner_tel}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => {
                            this.setState({Owner_Tel: text})
                        }}/>
                </View>

                <TouchableOpacity onPress={this.edit_House} activeOpacity={0.7}
                                  style={[styles.button, {marginBottom: 10}]}>
                    <Text style={styles.TextStyle}> 修改并提交 </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.delete_House} activeOpacity={0.7}
                                  style={[styles.button, {marginBottom: 10}]}>
                    <Text style={styles.TextStyle}> 删除 </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate('TradeTable',{
                        house_id:house_id
                    })
                }} activeOpacity={0.7}
                                  style={[styles.button, {marginBottom: 10}]}>
                    <Text style={styles.TextStyle}> 查看交易记录 </Text>
                </TouchableOpacity>
                <View style={{height: Platform.OS === 'ios' ? 0 : 30,}}/>
            </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    button: {
        width: '40%',
        height: 40,
        padding: 10,
        backgroundColor: '#C4D883',
        borderRadius:7,
        margin: 2
    },
    TextStyle:{
        color:'#fff',
        textAlign:'center',
    },
    TextInputStyle:
        {
            borderWidth: 1,
            borderColor: '#C4D883',
            width: '55%',
            height: 35,
            marginBottom: 10,
            textAlign: 'center',
        },
});
