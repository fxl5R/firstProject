
import React, { Component } from 'react';
import {
    StyleSheet,
    Platform,
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    YellowBox,
    ListView,
    ScrollView,
    Dimensions
} from 'react-native';

let Realm = require('realm');

let realm ;

import { createStackNavigator } from 'react-navigation';
import BackHeader from "../component/BackHeader";

/*const MainNavigator = createStackNavigator({
    Profile: {screen: ProfileScreen},
});*/
class AddHousePage extends Component{

    static navigationOptions =
        {
            title: 'MainActivity',
            header:null
        };

    GoToSecondActivity = () =>
    {
        this.props.navigation.navigate('Second');

    };

    constructor(){

        super();

        this.state = {
            House_Publisher : '',    //发布人
            Publish_Time : '',     //发布时间
            Lease_Type: '',         //出租类型：整租/合租
            Area_Name : '',          //出租类型：整租/合租
            Unit_Build: '',          //楼栋（单元）
            Total_Area: '',          //总面积
            Door_Model:'',           //户型（室房厅厕）
            Toward_Direct:'',        //朝向
            House_Floor:'',          //楼层
            House_Decorate:'',       //装修（毛坯/简单/中等/精装）
            Rent_Fee:'',             //租金
            Pay_Type:'',             //付款类型（一付一/押一付三/半年付/年付）
            House_Pic:'',            //图片描述
            Support_Set:'',          //配套设施
            House_Description:'',    //房屋描述
            Owner_Tel:'',            //房主联系电话
            Certification:''         //是否已认证
        };

        realm = new Realm({
            schema: [{name: 'House_Info',
                properties:
                    {
                        house_publisher: 'string',
                        publish_time: 'date',
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
                    }}]
        });
    }

    add_House=()=>{

        realm.write(() => {
            let ID = realm.objects('House_Info').length + 1;

            realm.create('House_Info', {
                house_id: ID,
                house_publisher: this.state.House_Publisher,
                publish_time: new Date(),
                lease_type : this.state.Lease_Type,
                area_name: this.state.Area_Name,
                unit_build: this.state.Unit_Build,
                total_area: this.state.Total_Area,
                door_model: this.state.Door_Model,
                toward_direct: this.state.Toward_Direct,
                house_floor: this.state.House_Floor,
                house_decorate: this.state.House_Decorate,
                rent_fee: this.state.Rent_Fee,
                pay_type: this.state.Pay_Type,
                house_pic: this.state.House_Pic,
                house_description: this.state.House_Description,
                owner_tel: this.state.Owner_Tel,
                certification: null
            });
        });
        Alert.alert("成功添加房屋信息");
        this.props.navigation.navigate('PublishResult');
        //realm.close();
    };

    render() {
        return (
            <View>
            <BackHeader navigation={this.props.navigation} {...this.props.BackHeader} title={'填写房屋信息'}/>
            <ScrollView keyboardShouldPersistTaps={'handled'}>

            <View style={[styles.MainContainer,{justifyContent:'center'}]}>

                <TextInput
                    placeholder="姓名"
                    style = { styles.TextInputStyle }
                    underlineColorAndroid = "transparent"
                    onChangeText = { ( text ) => { this.setState({ House_Publisher: text })} }/>
                <TextInput
                    placeholder="出租类型"
                    style = { styles.TextInputStyle }
                    underlineColorAndroid = "transparent"
                    onChangeText = { ( text ) => { this.setState({ Lease_Type: text })} }/>
                <TextInput
                    placeholder="小区名"
                    style = { styles.TextInputStyle }
                    underlineColorAndroid = "transparent"
                    onChangeText = { ( text ) => { this.setState({ Area_Name: text })} }/>
                <TextInput
                    placeholder="楼栋（单元）"
                    style = { styles.TextInputStyle }
                    underlineColorAndroid = "transparent"
                    onChangeText = { ( text ) => { this.setState({ Unit_Build: text })} }/>
                <TextInput
                    placeholder="总面积"
                    style = { styles.TextInputStyle }
                    underlineColorAndroid = "transparent"
                    onChangeText = { ( text ) => { this.setState({ Total_Area: text })} }/>
                <TextInput
                    placeholder="户型"
                    style = { styles.TextInputStyle }
                    underlineColorAndroid = "transparent"
                    onChangeText = { ( text ) => { this.setState({ Door_Model: text })} }/>
                <TextInput
                    placeholder="朝向"
                    style = { styles.TextInputStyle }
                    underlineColorAndroid = "transparent"
                    onChangeText = { ( text ) => { this.setState({ Toward_Direct: text })} }/>
                <TextInput
                    placeholder="楼层"
                    style = { styles.TextInputStyle }
                    underlineColorAndroid = "transparent"
                    onChangeText = { ( text ) => { this.setState({ House_Floor: text })} }/>
                <TextInput
                    placeholder="装修"
                    style = { styles.TextInputStyle }
                    underlineColorAndroid = "transparent"
                    onChangeText = { ( text ) => { this.setState({ House_Decorate: text })} }/>
                <TextInput
                    placeholder="租金"
                    style = { styles.TextInputStyle }
                    underlineColorAndroid = "transparent"
                    onChangeText = { ( text ) => { this.setState({ Rent_Fee: text })} }/>
                <TextInput
                    placeholder="付款类型"
                    style = { styles.TextInputStyle }
                    underlineColorAndroid = "transparent"
                    onChangeText = { ( text ) => { this.setState({ Pay_Type: text })} }/>
                <TextInput
                    placeholder="房屋图片"
                    style = { styles.TextInputStyle }
                    underlineColorAndroid = "transparent"
                    onChangeText = { ( text ) => { this.setState({ House_Pic: text })} }/>
                <TextInput
                    placeholder="房屋描述"
                    style = { styles.TextInputStyle }
                    underlineColorAndroid = "transparent"
                    onChangeText = { ( text ) => { this.setState({ House_Description: text })} }/>
                <TextInput
                    placeholder="联系方式"
                    style = { styles.TextInputStyle }
                    underlineColorAndroid = "transparent"
                    onChangeText = { ( text ) => { this.setState({ Owner_Tel: text })} }/>

                <TouchableOpacity onPress={this.add_House} activeOpacity={0.7} style={styles.button} >
                    <Text style={styles.TextStyle}> 提交出租信息 </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.GoToSecondActivity} activeOpacity={0.7} style={styles.button} >
                    <Text style={styles.TextStyle}> 查看所有房屋信息 </Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
            </View>

        );
    }
}

class HDetail extends Component
{
    static navigationOptions =
        {
            title: 'ShowDataActivity',
            header:null
        };

    constructor() {

        super();

        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: componentWillReceiveProps is deprecated',
        ]);

        let mydata = realm.objects('House_Info');

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: ds.cloneWithRows(mydata),
        };

    }

    GetClickedItem (area_name) {
        Alert.alert(area_name);
    }

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

    render()
    {
        return(
            <View style = { styles.MainContainer }>

                <ListView

                    dataSource={this.state.dataSource}

                    renderSeparator= {this.ListViewItemSeparator}

                    renderRow={(rowData) => <View style={{flex:1, flexDirection: 'column'}} >

                        <TouchableOpacity onPress={this.GetClickedItem.bind(this, rowData.area_name)} >
                            <Text style={styles.textViewContainer} >{'房主 = ' + rowData.house_publisher}</Text>
                            <Text style={styles.textViewContainer} >{'楼层 = ' + rowData.house_floor}</Text>
                            <Text style={styles.textViewContainer} >{'房屋描述 = ' + rowData.house_description}</Text>
                            <Text style={styles.textViewContainer} >{'小区名 = ' + rowData.area_name}</Text>

                        </TouchableOpacity>

                    </View> }

                />

            </View>
        );
    }
}

export default AddHousePage = createStackNavigator(
    {
        First: { screen: AddHousePage },

        Second: { screen: HDetail }
    });
const styles = StyleSheet.create({

    MainContainer :{
        alignItems:'center',
        flex:1,
        justifyContent: 'center',
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
        margin: 10
    },

    TextInputStyle:
        {
            borderWidth: 1,
            borderColor: '#6495ED',
            width: '80%',
            height: 40,
            borderRadius: 10,
            marginBottom: 10,
            textAlign: 'center',
        },

    button: {
        width: '80%',
        height: 40,
        padding: 10,
        backgroundColor: '#B0C4DE',
        borderRadius:7,
        marginTop: 12
    },

    TextStyle:{
        color:'#fff',
        textAlign:'center',
    },

    textViewContainer: {
        textAlignVertical:'center',
        padding:10,
        fontSize: 20,
        color: '#000',

    }

});